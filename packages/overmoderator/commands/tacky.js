'use strict';

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { tackyEmbed, bedazzle, randomEmoji } = require('../tackyTheme');

const TACKY_QUOTES = [
  'LIVE LAUGH LOVE... BUT LOUDER!!!',
  'YOU MISS 100% OF THE AIRHORNS YOU DON\'T BLAST!!',
  'HUSTLE, GRIND, AIRHORN, REPEAT!!',
  'BE THE PARTY PARROT YOU WISH TO SEE IN THE WORLD!!',
  'GOOD VIBES ONLY!! (AND BY GOOD I MEAN EXTREMELY LOUD!!)',
  'EVERY DAY IS LEG DAY WHEN YOU JUMP TO CONCLUSIONS!!',
  'DIAMONDS ARE FOREVER BUT SO IS THIS EMBED\'S COLOR!!',
  'I DIDN\'T CHOOSE THE TACKY LIFE, THE TACKY LIFE CHOSE ME!!',
  'IN THIS HOUSE WE BLAST AIRHORNS AND EAT GLITTER FOR BREAKFAST!!',
  'WOW!! SUCH DISCORD!! VERY BOT!! MUCH TACKY!! SO WOW!!',
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('tacky')
    .setDescription('💅 Summon maximum tackiness!! Neon colors!! Caps lock!! Excessive emoji!!'),

  async execute(interaction) {
    const quote = TACKY_QUOTES[Math.floor(Math.random() * TACKY_QUOTES.length)];
    const sparkles = '✨'.repeat(5);

    const opts = tackyEmbed({
      title: `${sparkles} TACKY WISDOM ${sparkles}`,
      description: `"${quote}"`,
      fields: [
        {
          name: bedazzle('TACKINESS LEVEL'),
          value: '```\n[##########] MAXIMUM CAPACITY EXCEEDED\n```',
          inline: false,
        },
        {
          name: bedazzle('AESTHETIC'),
          value: [
            `${randomEmoji()} Neon everything`,
            `${randomEmoji()} Comic Sans vibes`,
            `${randomEmoji()} Frosted tips`,
            `${randomEmoji()} Bedazzled phone case`,
            `${randomEmoji()} Crocs with Jibbitz`,
          ].join('\n'),
          inline: true,
        },
        {
          name: bedazzle('CURRENT STATUS'),
          value: [
            `${randomEmoji()} Absolutely NO chill`,
            `${randomEmoji()} 110% capacity`,
            `${randomEmoji()} Serving LOOKS`,
          ].join('\n'),
          inline: true,
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
