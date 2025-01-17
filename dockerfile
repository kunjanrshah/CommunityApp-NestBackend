# Stage 1: Build
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --silent

# Copy the entire application code
COPY . .

# Build the NestJS application
RUN npm run build

# Stage 2: Run
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only the built app and package files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm install --only=production --silent

# Expose the application's port
EXPOSE 3000

# Set the command to run the application
CMD ["node", "dist/main"]
