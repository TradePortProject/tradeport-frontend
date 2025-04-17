# Use the official Node.js image with a specific version
FROM node:20-alpine

# Install curl and other necessary packages
RUN apk update && apk add --no-cache curl python3 make g++ bash

# Set the working directory inside the container
WORKDIR /app

# Copy only the package.json and package-lock.json to the container to leverage Docker caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 3001

# Command to run the app in development mode with hot-reloading
CMD ["npm", "run", "dev"]
