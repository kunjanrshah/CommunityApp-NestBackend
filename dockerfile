# Use the official Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy the entire application source code
COPY . .

# Build the application (if applicable, for TypeScript projects)
RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main"]
