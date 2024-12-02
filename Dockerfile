# Use Node.js LTS as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire frontend project
COPY . .

# Expose the frontend port
EXPOSE 3000

# Start the frontend
CMD ["npm", "start"]