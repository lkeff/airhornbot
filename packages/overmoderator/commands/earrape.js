'use strict';

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { tackyEmbed, bedazzle } = require('../tackyTheme');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('earrape')
    .setDescription('🔊 Simulate maximum volume earrape (purely textual!! ears safe!! probably!!)'),

  async execute(interaction) {
    const volumeBars = '█'.repeat(20);
    const warningRow = '⚠️ '.repeat(6);

    const opts = tackyEmbed({
      title: '🔊🔊🔊 MAXIMUM VOLUME ACHIEVED 🔊🔊🔊',
      description: [
        `${warningRow}`,
        '**W A R N I N G** — VOLUME LEVELS EXCEEDING SAFE THRESHOLDS',
        `${warningRow}`,
        '',
        '```',
        `VOLUME: [${volumeBars}] 9999999/10`,
        'STATUS: MAXIMUM CAPACITY EXCEEDED',
        'EARS:   █████████████████████ OBLITERATED',
        '```',
      ].join('\n'),
      fields: [
        {
          name: bedazzle('DAMAGE REPORT'),
          value: [
            '🩺 Eardrums: **VAPORIZED**',
            '🧠 Rational thought: **GONE**',
            '😤 Chad energy: **INFINITE**',
            '🦜 Party parrots deployed: **10,000**',
          ].join('\n'),
          inline: false,
        },
        {
          name: bedazzle('LEGAL DISCLAIMER'),
          value: '_Tacky Bot 3000 is not liable for any real hearing damage._\n_Please use headphones responsibly. Or don\'t. We\'re a bot, not cops._',
          inline: false,
        },
      ],
    });

    const embed = new EmbedBuilder()
      .setColor(opts.color)
      .setTitle(opts.title)
      .setDescription(opts.description)
      .addFields(...opts.fields)
      .setFooter(opts.footer)
      .setThumbnail(opts.thumbnail.url)
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
