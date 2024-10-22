
# Use the official Node.js image as the base image
FROM node:20.9.0

# Set the working directory in the container
WORKDIR /app

# Copy the application files into the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install
COPY . .

EXPOSE 3001
# Define the entry point for the container
CMD ["node", "server"]