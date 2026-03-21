'use strict';

/**
 * ✨💎 TACKY BOT 3000 — User Settings 💎✨
 * Default configuration. Override via environment variables.
 */
module.exports = {
  // Appearance defaults
  defaultColor: 0xFF00FF,         // Hot pink — the tackiest color
  footerText:   '✨💎 TACKY BOT 3000 💎✨ | ur welcome',
  thumbnailUrl: 'https://media.tenor.com/gHDLFOqmGhgAAAAC/party-parrot-parrot.gif',

  // Behavior defaults
  roastCooldownMs:   5_000,       // 5 seconds between roasts per user
  airhornCooldownMs: 3_000,       // 3 seconds between airhorns
  partyModeLines:    5,           // Number of party lines sent in partymode

  // Feature flags
  features: {
    airhorn:   true,
    tacky:     true,
    partyMode: true,
    roast:     true,
    earrape:   true,
  },

  // Tacky mode overlay for AI responses (used by Discord-AIBot integration)
  tackyModeEnabled: false,
  tackyModeCatchphrases: [
    '🎺 *— powered by TACKY BOT 3000!!*',
    '💅 *— serving looks AND information!!*',
    '🥳 *— this response brought to you by pure chaos!!*',
    '🦜 *— party parrot approves this message!!*',
    '🌈 *— neon colors included at no extra charge!!*',
  ],
};
