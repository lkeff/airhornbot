'use strict';

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { tackyEmbed, bedazzle, randomEmoji } = require('../tackyTheme');

const ROASTS = [
  'You\'re the human equivalent of a "Terms & Conditions" nobody reads.',
  'Your fashion sense called. It got lost trying to find itself.',
  'You bring unparalleled enthusiasm to absolutely mediocre results.',
  'You\'re like a software update — nobody asked for you and you show up at the worst time.',
  'The WiFi password is longer than your attention span.',
  'You\'re proof that even error 404 can have a personality.',
  'I\'ve seen better decisions made in a Magic 8-Ball.',
  'You have the energy of a dying phone battery on 1%.',
  'You\'re the loading screen nobody wants to see.',
  'Even autocorrect gave up on you.',
  'You\'re like Comic Sans — technically functional but everyone cringes.',
  'Your vibe is "browser with 47 tabs open and none of them are useful."',
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('roast')
    .setDescription('🔥 Receive an absolutely DRAMATIC over-the-top roast!! You asked for this!!')
    .addUserOption(option =>
      option
        .setName('target')
        .setDescription('Who to roast? (leave blank to roast yourself!!)')
        .setRequired(false)
    ),

  async execute(interaction) {
    const target = interaction.options.getUser('target') ?? interaction.user;
    const roast  = ROASTS[Math.floor(Math.random() * ROASTS.length)];
    const isSelf = target.id === interaction.user.id;

    const opts = tackyEmbed({
      title: `🔥🌶️ ROAST INITIATED 🌶️🔥`,
      description: [
        `**${target.username}**, brace yourself:`,
        '',
        `> 🔥 *"${roast}"*`,
        '',
        isSelf
          ? `${randomEmoji()} You roasted YOURSELF!! That's a bold move!! We respect it!!`
          : `${randomEmoji()} Requested by **${interaction.user.username}** — absolutely no mercy shown!!`,
      ].join('\n'),
      fields: [
        {
          name: bedazzle('BURN LEVEL'),
          value: '```\n[##########] THIRD DEGREE — CALL A DOCTOR\n```',
          inline: false,
        },
        {
          name: bedazzle('RECOVERY TIME'),
          value: '⌛ Estimated recovery: **3-5 business decades**',
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
