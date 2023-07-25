# Use an official Node.js runtime as a base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the frontend application
RUN npm run build

# Install serve to run the production build
RUN npm install -g serve

# Expose the port that the frontend server will listen on (if needed)
EXPOSE 3002

# Command to start the frontend server using serve
CMD ["serve", "-s", "build", "-l", "3002"]