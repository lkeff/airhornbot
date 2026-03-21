'use strict';

/**
 * ✨💎 TACKY BOT 3000 💎✨
 * Shared theme constants and embed builder for maximum tackiness.
 */

const COLORS = {
  hotPink:    0xFF00FF,
  limeGreen:  0x00FF00,
  neonYellow: 0xFFFF00,
  ultraBlue:  0x0099FF,
  blazeOrange:0xFF6600,
};

const FOOTER_TEXT = '✨💎 TACKY BOT 3000 💎✨ | ur welcome';

const EMOJIS = ['🎺', '🔊', '💥', '🎉', '🥳', '🎊', '🌈', '🦜', '🪩', '💅', '🤩', '😤'];

const PARTY_PARROT_GIF = 'https://media.tenor.com/gHDLFOqmGhgAAAAC/party-parrot-parrot.gif';

/**
 * Pick a random neon color from the palette.
 */
function randomColor() {
  const values = Object.values(COLORS);
  return values[Math.floor(Math.random() * values.length)];
}

/**
 * Pick a random emoji from the pool.
 */
function randomEmoji() {
  return EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
}

/**
 * Sprinkle random emojis before and after a string.
 */
function bedazzle(text, count = 2) {
  const pre  = Array.from({ length: count }, randomEmoji).join('');
  const post = Array.from({ length: count }, randomEmoji).join('');
  return `${pre} ${text} ${post}`;
}

/**
 * Build a maximally tacky EmbedBuilder-compatible options object.
 * Pass these into `new EmbedBuilder().setTitle(...).setColor(...)` etc.
 */
function tackyEmbed({ title, description, fields = [], imageUrl } = {}) {
  return {
    color: randomColor(),
    title: title ? bedazzle(title.toUpperCase()) : bedazzle('TACKY BOT 3000'),
    description: description
      ? `**${description}**\n\n${randomEmoji()}${randomEmoji()}${randomEmoji()}`
      : undefined,
    fields,
    footer: { text: FOOTER_TEXT },
    thumbnail: { url: PARTY_PARROT_GIF },
    ...(imageUrl ? { image: { url: imageUrl } } : {}),
    timestamp: new Date().toISOString(),
  };
}

module.exports = {
  COLORS,
  FOOTER_TEXT,
  EMOJIS,
  PARTY_PARROT_GIF,
  randomColor,
  randomEmoji,
  bedazzle,
  tackyEmbed,
};
