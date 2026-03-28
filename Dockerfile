# Multi-stage build for airhornbot - Production Optimized
FROM node:20-alpine AS builder

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++ ffmpeg

# Copy package files from the overmoderator package
COPY packages/overmoderator/package*.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy source code
COPY packages/overmoderator/ .

# ─────────────────────────────────────────
# Production stage - minimal image
# ─────────────────────────────────────────
FROM node:20-alpine

WORKDIR /app

LABEL maintainer="bot-team" \
      version="1.0" \
      description="Airhornbot - Production"

# Install runtime dependencies
RUN apk add --no-cache ffmpeg opus ca-certificates

# Create non-root user for security
RUN addgroup botuser && adduser -D -G botuser botuser

# Copy package files
COPY --from=builder /app/package*.json ./

# Copy production dependencies
COPY --from=builder /app/node_modules ./node_modules

# Copy source code with correct ownership
COPY --chown=botuser:botuser packages/overmoderator/ .

# Set environment
ENV NODE_ENV=production \
    LOG_LEVEL=info

# Don't copy .env into image (use runtime secrets/config)

# Switch to non-root user
USER botuser

CMD ["node", "index.js"]
