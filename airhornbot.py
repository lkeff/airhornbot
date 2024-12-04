import os
import discord
from discord.ext import commands
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
TOKEN = os.getenv('DISCORD_TOKEN')
BOT_PREFIX = os.getenv('BOT_PREFIX', '!')

# Create a new bot instance
bot = commands.Bot(command_prefix=BOT_PREFIX)

# Event: When the bot is ready
@bot.event
async def on_ready():
    print(f'Logged in as {bot.user.name} ({bot.user.id})')
    print('------')

# Command: !airhorn
@bot.command()
async def airhorn(ctx):
    await ctx.send('📢 **AIRHORN SOUND**')

# Run the bot
bot.run(TOKEN)
