# Use an official Node.js runtime as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and yarn.lock files to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

# Build TypeScript files
RUN yarn build

# Expose the port that your application will run on
EXPOSE 3000

# Command to run the application
CMD ["node", "index.js"]
