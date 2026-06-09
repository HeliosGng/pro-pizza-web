# --- Stage 1: Build the React Application ---
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install all dependencies (including devDependencies required for high-speed compiling)
RUN npm install

# Copy application source code and configurations
COPY . .

# Compile the application for production (results in /app/dist)
RUN npm run build

# --- Stage 2: Production Runner ---
FROM node:20-alpine AS runner

WORKDIR /app

# Setup production environments
ENV NODE_ENV=production
ENV PORT=8080

# Copy dependency manifests
COPY package*.json ./

# Install ONLY runtime production dependencies (bypasses heavy compiler/dev tools)
RUN npm install --omit=dev

# Copy compiled static assets from builder stage
COPY --from=builder /app/dist ./dist

# Copy the secure Express production server configuration
COPY server.js ./

# Set the standard container port (this will match Google Cloud Run mapping dynamically)
EXPOSE 8080

# Start the optimized server
CMD ["node", "server.js"]
