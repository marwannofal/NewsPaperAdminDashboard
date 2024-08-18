# Use an official Node.js image as the base image
FROM node:20 as build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files first
COPY package*.json ./

# Install the Angular CLI globally
RUN npm install -g @angular/cli

# Install dependencies without running post-install scripts
RUN npm ci --ignore-scripts

# Copy the rest of the application code to the working directory
COPY . .

# Build the Angular application
RUN ng build --configuration production
