# Use the official Node.js 20 Alpine image as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if it exists)
COPY package.json .

# Install production dependencies only
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Expose port 3000
EXPOSE 3000

# Set the command to run the application
CMD ["node", "server.js"]
