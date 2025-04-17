# Step 1: Build the React app
FROM node:18 AS builder

# Enable legacy OpenSSL provider
ENV NODE_OPTIONS=--openssl-legacy-provider

# Set working directory
WORKDIR /app

# Copy dependency files and install packages
COPY package*.json ./
RUN npm install

# Copy source code and build the app
COPY . .
RUN npm run build

# Step 2: Use Nginx to serve the built app
FROM nginx:alpine

# Copy build output to Nginx's default public folder
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80 and run nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
