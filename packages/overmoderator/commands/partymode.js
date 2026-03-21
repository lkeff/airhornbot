'use strict';

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { tackyEmbed, bedazzle, randomEmoji } = require('../tackyTheme');

const PARTY_ANIMALS = ['🦜', '🐸', '🦆', '🐧', '🦊', '🐻', '🦁', '🐯', '🐼', '🦋'];
const PARTY_LINES = [
  '🥳🥳🥳 EVERYBODY DANCE NOW 🥳🥳🥳',
  '🎉 THE PARTY DON\'T STOP TILL THE BOT DROPS 🎉',
  '🎊 WE PARTYING LIKE IT\'S 1999 AND ALSO 2999 🎊',
  '🪩 DISCO INFERNO ON THE DISCORD SERVER 🪩',
  '🌈 THE ONLY VIBE IS PARTY VIBE 🌈',
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('partymode')
    .setDescription('🎉 ACTIVATE PARTY MODE!!! Flood the chat with maximum party energy!!!'),

  async execute(interaction) {
    const partyLine = PARTY_LINES[Math.floor(Math.random() * PARTY_LINES.length)];

    // Build a string of rotating party animals
    const animalLine = Array.from({ length: 10 }, () =>
      PARTY_ANIMALS[Math.floor(Math.random() * PARTY_ANIMALS.length)]
    ).join('');

    const parrotRow = '🦜🦜🦜🦜🦜🦜🦜🦜🦜🦜';

    const opts = tackyEmbed({
      title: '🎉🎊🥳 PARTY MODE ACTIVATED 🥳🎊🎉',
      description: `${partyLine}\n\n${parrotRow}\n${animalLine}\n${parrotRow}`,
      fields: [
        {
          name: bedazzle('PARTY CHECKLIST'),
          value: [
            '✅ Airhorn? **LOADED**',
            '✅ Disco ball? **SPINNING**',
            '✅ Glitter cannon? **PRIMED**',
            '✅ Party parrots? **DEPLOYED**',
            '✅ Volume? **MAXIMUM**',
            '✅ Chill? **THERE IS NO CHILL**',
          ].join('\n'),
          inline: false,
        },
        {
          name: bedazzle('CURRENT BPM'),
          value: '```\n420 BPM — BEYOND HUMAN COMPREHENSION\n```',
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
