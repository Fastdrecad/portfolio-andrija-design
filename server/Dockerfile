# Use Node.js LTS version for production
FROM node:18-alpine

WORKDIR /app

# Copy package.json and install only production dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the server files
COPY . .

RUN npm run build

EXPOSE 3000

# Start the server in production mode
CMD ["npm","run", "start"]
