'use strict';

/**
 * Tests for the Bluetooth utility module.
 * Shells calls are mocked so these run without Bluetooth hardware.
 */

const cp = require('child_process');

const {
  isValidAddress,
  getStatus,
  listDevices,
  connectDevice,
  disconnectDevice
} = require('../src/bluetooth');

// Helper: make exec call the callback with (null, stdout, '')
function mockExec(stdout) {
  jest.spyOn(cp, 'exec').mockImplementation((_cmd, _opts, cb) => {
    if (typeof _opts === 'function') cb = _opts;
    cb(null, stdout, '');
  });
}

function mockExecError(message) {
  jest.spyOn(cp, 'exec').mockImplementation((_cmd, _opts, cb) => {
    if (typeof _opts === 'function') cb = _opts;
    cb(new Error(message), '', message);
  });
}

beforeEach(() => {
  jest.restoreAllMocks();
});

// ── isValidAddress ────────────────────────────────────────────────────────────

describe('isValidAddress', () => {
  const isLinux = process.platform !== 'win32';

  if (isLinux) {
    test('accepts valid MAC address', () => {
      expect(isValidAddress('AA:BB:CC:DD:EE:FF')).toBe(true);
      expect(isValidAddress('00:1A:7D:DA:71:13')).toBe(true);
    });

    test('rejects invalid MAC addresses', () => {
      expect(isValidAddress('not-a-mac')).toBe(false);
      expect(isValidAddress('AA:BB:CC:DD:EE')).toBe(false);
      expect(isValidAddress('AA:BB:CC:DD:EE:GG')).toBe(false);
      expect(isValidAddress('')).toBe(false);
      expect(isValidAddress(null)).toBe(false);
      expect(isValidAddress(42)).toBe(false);
    });

    test('rejects command injection attempts', () => {
      expect(isValidAddress('AA:BB:CC:DD:EE:FF; rm -rf /')).toBe(false);
      expect(isValidAddress('$(whoami)')).toBe(false);
      expect(isValidAddress('`id`')).toBe(false);
    });
  }

  test('rejects empty and null inputs', () => {
    expect(isValidAddress('')).toBe(false);
    expect(isValidAddress(null)).toBe(false);
    expect(isValidAddress(undefined)).toBe(false);
    expect(isValidAddress(123)).toBe(false);
  });

  test('rejects excessively long strings', () => {
    expect(isValidAddress('A'.repeat(201))).toBe(false);
  });
});

// ── getStatus ─────────────────────────────────────────────────────────────────

describe('getStatus', () => {
  test('returns powered:true when controller is on (Linux mock)', async () => {
    const btctlOutput = `Controller AA:BB:CC:DD:EE:FF (public)
\tName: TestController
\tPowered: yes
\tDiscoverable: yes
\tPairable: yes`;
    mockExec(btctlOutput);

    const status = await getStatus();
    expect(status).toHaveProperty('powered');
    expect(status).toHaveProperty('discoverable');
    expect(status).toHaveProperty('pairable');
  });

  test('returns powered:false on exec error', async () => {
    mockExecError('bluetoothctl not found');
    const status = await getStatus();
    expect(status.powered).toBe(false);
    expect(status).toHaveProperty('error');
  });

  test('returns object with required shape even on failure', async () => {
    mockExecError('no bluetooth');
    const status = await getStatus();
    expect(typeof status.powered).toBe('boolean');
    expect(typeof status.discoverable).toBe('boolean');
    expect(typeof status.pairable).toBe('boolean');
  });
});

// ── listDevices ───────────────────────────────────────────────────────────────

describe('listDevices', () => {
  test('returns empty array when no devices output', async () => {
    mockExec('');
    const devices = await listDevices();
    expect(Array.isArray(devices)).toBe(true);
    expect(devices.length).toBe(0);
  });

  test('returns empty array on exec error', async () => {
    mockExecError('command not found');
    const devices = await listDevices();
    expect(Array.isArray(devices)).toBe(true);
    expect(devices.length).toBe(0);
  });

  test('parses Linux bluetoothctl device lines', async () => {
    jest.spyOn(cp, 'exec')
      .mockImplementationOnce((_cmd, _opts, cb) => {
        if (typeof _opts === 'function') cb = _opts;
        cb(null, 'Device AA:BB:CC:DD:EE:FF MyHeadphones\nDevice 11:22:33:44:55:66 Speaker', '');
      })
      // first `bluetoothctl info` call
      .mockImplementationOnce((_cmd, _opts, cb) => {
        if (typeof _opts === 'function') cb = _opts;
        cb(null, 'Connected: yes', '');
      })
      // second `bluetoothctl info` call
      .mockImplementationOnce((_cmd, _opts, cb) => {
        if (typeof _opts === 'function') cb = _opts;
        cb(null, 'Connected: no', '');
      });

    const devices = await listDevices();
    if (process.platform !== 'win32') {
      expect(devices.length).toBe(2);
      expect(devices[0].address).toBe('AA:BB:CC:DD:EE:FF');
      expect(devices[0].name).toBe('MyHeadphones');
      expect(devices[0].connected).toBe(true);
      expect(devices[1].connected).toBe(false);
    }
  });
});

// ── connectDevice ─────────────────────────────────────────────────────────────

describe('connectDevice', () => {
  test('returns error for invalid address', async () => {
    const result = await connectDevice('not-valid!!');
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/[Ii]nvalid/);
  });

  test('returns error for empty address', async () => {
    const result = await connectDevice('');
    expect(result.success).toBe(false);
  });

  test('returns success on successful exec (Linux mock)', async () => {
    if (process.platform !== 'win32') {
      mockExec('Connection successful');
      const result = await connectDevice('AA:BB:CC:DD:EE:FF');
      expect(result.success).toBe(true);
    }
  });

  test('returns success:false when exec fails', async () => {
    if (process.platform !== 'win32') {
      mockExecError('Not available');
      const result = await connectDevice('AA:BB:CC:DD:EE:FF');
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    }
  });
});

// ── disconnectDevice ──────────────────────────────────────────────────────────

describe('disconnectDevice', () => {
  test('returns error for invalid address', async () => {
    const result = await disconnectDevice(';bad-input');
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/[Ii]nvalid/);
  });

  test('returns success on successful exec (Linux mock)', async () => {
    if (process.platform !== 'win32') {
      mockExec('Disconnected');
      const result = await disconnectDevice('AA:BB:CC:DD:EE:FF');
      expect(result.success).toBe(true);
    }
  });

  test('returns success:false when exec fails', async () => {
    if (process.platform !== 'win32') {
      mockExecError('Device not found');
      const result = await disconnectDevice('AA:BB:CC:DD:EE:FF');
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    }
  });
});
