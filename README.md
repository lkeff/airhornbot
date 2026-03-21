# airhornbot

A Discord bot for playing airhorn sounds.

## Setup

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in your Discord bot token
3. Run `npm install`
4. Run `npm start`

## Configuration

| Variable | Required | Description |
|---|---|---|
| `DISCORD_TOKEN` | Yes | Discord bot token from the [Developer Portal](https://discord.com/developers/applications) |
| `BOT_PREFIX` | No | Command prefix (default: `!`) |

## Development

```bash
# Run tests
npm test

# Lint code
npm run lint

# Auto-fix lint issues
npm run lint:fix
```

## Security

- Never commit your `.env` file or any file containing tokens or secrets
- Rotate your Discord bot token immediately if it is ever exposed in version control
