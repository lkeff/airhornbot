'use strict';

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { tackyEmbed, EMOJIS, bedazzle } = require('../tackyTheme');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('airhorn')
    .setDescription('🎺 BLAST THE AIRHORN!! Deafen everyone in the most tacky way possible!!'),

  async execute(interaction) {
    const blasts = ['📯📯📯 PAAAAAARP!!!', '🔊🔊🔊 BWAAAAAAMP!!!', '🎺 HOOOOOONK!!!'];
    const blast  = blasts[Math.floor(Math.random() * blasts.length)];

    const opts = tackyEmbed({
      title: blast,
      description:
        'THE AIRHORN HAS BEEN ACTIVATED!!! YOUR EARS ARE FOREVER RUINED!!! ' +
        'THANK YOU FOR USING TACKY BOT 3000!!!',
      fields: [
        {
          name: bedazzle('VOLUME LEVEL'),
          value: '```\n[##########] 11/10 — OVER 9000\n```',
          inline: false,
        },
        {
          name: bedazzle('DAMAGE REPORT'),
          value: '🩺 Eardrums: **OBLITERATED**\n🧠 Brain cells: **GONE**\n😤 Vibes: **IMMACULATE**',
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
