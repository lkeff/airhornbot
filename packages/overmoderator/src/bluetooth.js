'use strict';

/**
 * Bluetooth utility module for airhornbot.
 * Cross-platform device management via OS shell commands.
 * Linux: bluetoothctl + pactl  |  Windows: PowerShell + pnputil
 */

const IS_WINDOWS = process.platform === 'win32';

// Strict allowlists to prevent command injection
const MAC_RE = /^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/;
const WIN_INSTANCE_ID_RE = /^[\w\\{}\-&#@ ]+$/;

/**
 * Validate device address format.
 * @param {string} address
 * @returns {boolean}
 */
function isValidAddress(address) {
  if (typeof address !== 'string' || !address || address.length > 200) return false;
  return IS_WINDOWS ? WIN_INSTANCE_ID_RE.test(address) : MAC_RE.test(address);
}

/**
 * Execute a shell command and return stdout.
 * Uses require() inline so Jest mocks are picked up at call time.
 * @param {string} cmd
 * @param {number} [timeoutMs=10000]
 * @returns {Promise<string>}
 */
function runCmd(cmd, timeoutMs = 10000) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line global-require
    require('child_process').exec(cmd, { timeout: timeoutMs }, (err, stdout) => {
      if (err) return reject(err);
      resolve((stdout || '').trim());
    });
  });
}

/**
 * Get Bluetooth controller status.
 * @returns {Promise<{powered: boolean, discoverable: boolean, pairable: boolean, name?: string, address?: string, error?: string}>}
 */
async function getStatus() {
  try {
    if (IS_WINDOWS) {
      const out = await runCmd(
        "powershell -NoProfile -NonInteractive -Command \"Get-Service bthserv | Select-Object Name,Status | ConvertTo-Json -Compress\""
      );
      const svc = JSON.parse(out);
      return {
        powered: svc.Status === 'Running',
        discoverable: false,
        pairable: false,
        name: svc.Name
      };
    }
    const out = await runCmd('bluetoothctl show');
    return {
      powered: /Powered:\s*yes/i.test(out),
      discoverable: /Discoverable:\s*yes/i.test(out),
      pairable: /Pairable:\s*yes/i.test(out),
      name: (out.match(/Name:\s*(.+)/) || [])[1]?.trim(),
      address: (out.match(/Address:\s*([0-9A-Fa-f:]{17})/i) || [])[1]
    };
  } catch (err) {
    return { powered: false, discoverable: false, pairable: false, error: err.message };
  }
}

/**
 * List paired Bluetooth devices.
 * @returns {Promise<Array<{address: string, name: string, connected: boolean}>>}
 */
async function listDevices() {
  try {
    if (IS_WINDOWS) {
      const out = await runCmd(
        "powershell -NoProfile -NonInteractive -Command \"Get-PnpDevice -Class Bluetooth | Select-Object Status,FriendlyName,InstanceId | ConvertTo-Json -Compress\""
      );
      if (!out || out === 'null') return [];
      const raw = JSON.parse(out);
      const arr = Array.isArray(raw) ? raw : [raw];
      return arr.map(d => ({
        address: d.InstanceId || 'unknown',
        name: d.FriendlyName || 'Unknown Device',
        connected: d.Status === 'OK'
      }));
    }
    const out = await runCmd('bluetoothctl devices 2>/dev/null || echo ""');
    const devices = [];
    for (const line of out.split('\n')) {
      const m = line.match(/Device\s+([0-9A-Fa-f:]{17})\s+(.+)/);
      if (!m) continue;
      let connected = false;
      try {
        const info = await runCmd(`bluetoothctl info ${m[1]}`);
        connected = /Connected:\s*yes/i.test(info);
      } catch { /* non-fatal */ }
      devices.push({ address: m[1], name: m[2].trim(), connected });
    }
    return devices;
  } catch {
    return [];
  }
}

/**
 * Connect to a Bluetooth device.
 * @param {string} address  MAC (Linux) or InstanceId (Windows)
 * @returns {Promise<{success: boolean, error?: string}>}
 */
async function connectDevice(address) {
  if (!isValidAddress(address)) {
    return { success: false, error: 'Invalid device address' };
  }
  try {
    if (IS_WINDOWS) {
      await runCmd(`powershell -NoProfile -NonInteractive -Command "pnputil /enable-device '${address}'"`, 15000);
    } else {
      await runCmd(`bluetoothctl connect ${address}`, 15000);
    }
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Disconnect a Bluetooth device.
 * @param {string} address  MAC (Linux) or InstanceId (Windows)
 * @returns {Promise<{success: boolean, error?: string}>}
 */
async function disconnectDevice(address) {
  if (!isValidAddress(address)) {
    return { success: false, error: 'Invalid device address' };
  }
  try {
    if (IS_WINDOWS) {
      await runCmd(`powershell -NoProfile -NonInteractive -Command "pnputil /disable-device '${address}'"`, 15000);
    } else {
      await runCmd(`bluetoothctl disconnect ${address}`, 15000);
    }
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

module.exports = {
  isValidAddress,
  getStatus,
  listDevices,
  connectDevice,
  disconnectDevice
};
