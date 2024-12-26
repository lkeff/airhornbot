import os
import discord
from discord.ext import commands
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
TOKEN = os.getenv('1060428310930280519')
BOT_PREFIX = os.getenv('The Antiloper', '!')

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
