# ✨💎 TACKY BOT 3000 💎✨

> The most garish, neon-colored, airhorn-blasting Discord bot you never asked for — but absolutely deserve.

---

## Commands

| Command | Description |
|---|---|
| `/airhorn` | 📯 BLAST THE AIRHORN!! Deafens the server (textually, we promise) |
| `/tacky` | 💅 Summon a random piece of neon-colored Tacky Wisdom™ |
| `/partymode` | 🎉 Activate PARTY MODE!! Deploy party parrots!! |
| `/roast [@user]` | 🔥 Receive (or dish out) an over-the-top dramatic roast |
| `/earrape` | 🔊 Simulate MAXIMUM VOLUME — ears are textually obliterated |

---

## Setup

```bash
cd packages/overmoderator
npm install
```

Create a `.env` file at the repo root:

```env
DISCORD_TOKEN=your_bot_token_here
DISCORD_CLIENT_ID=your_application_client_id
DISCORD_GUILD_ID=your_test_server_id   # optional: for instant registration
```

Then run:

```bash
npm start
```

---

## Configuration

Edit `UserSettings.js` at the repo root to customize colors, cooldowns, and feature flags.

Key settings:
- `defaultColor` — default embed color (default: `0xFF00FF` hot pink)
- `features` — enable/disable individual commands
- `tackyModeEnabled` — toggle neon overlay on AI responses (Discord-AIBot integration)

---

## Architecture

```
packages/overmoderator/
├── index.js          # Bot entry point, slash command registration
├── tackyTheme.js     # Shared colors, emojis, embed builder
├── package.json
└── commands/
    ├── airhorn.js
    ├── tacky.js
    ├── partymode.js
    ├── roast.js
    └── earrape.js

UserSettings.js       # Default user configuration
```

---

## License

MIT — do whatever you want, just keep it tacky.
