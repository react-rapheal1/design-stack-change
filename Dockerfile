# Stage 1: Build the application
FROM node:22 AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

RUN npm install

# Copy application files
COPY . .

# Build the application
RUN npm run build

# Stage 2: Final runtime image
FROM node:22-alpine AS runtime

# Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copy built application from build stage
COPY --from=build --chown=appuser:appgroup /app/.next/static ./.next/static

COPY --from=build --chown=appuser:appgroup /app/.next/standalone ./

COPY --from=build --chown=appuser:appgroup /app/public ./public

# Add permissions after copying
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Set the port environment variable
ENV PORT=40298

# Expose port
EXPOSE 40298

CMD ["node", "server.js"]
