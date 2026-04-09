'use strict';

/**
 * UserSettings — persists per-user configuration for airhornbot.
 */
class UserSettings {
  constructor(userId, overrides = {}) {
    this.userId = userId;

    /** Bluetooth preferences */
    this.bluetooth = {
      enabled: true,
      preferredDevice: null,   // MAC address of preferred BT audio device
      autoConnect: false,       // auto-connect on bot voice join
      audioSink: null,          // preferred PulseAudio/PipeWire sink name
      timeout: 10000,           // connection timeout in ms
      ...((overrides.bluetooth) || {})
    };
  }

  /**
   * Return a plain object suitable for JSON serialisation.
   * @returns {object}
   */
  toJSON() {
    return {
      userId: this.userId,
      bluetooth: { ...this.bluetooth }
    };
  }

  /**
   * Restore a UserSettings instance from a plain object.
   * @param {object} data
   * @returns {UserSettings}
   */
  static fromJSON(data = {}) {
    return new UserSettings(data.userId, data);
  }
}

module.exports = UserSettings;
