# Use Node to build the app
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY app/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project
COPY app .

# Build the project
RUN npm run build

# -------------------------------------------------

# Use Nginx to serve the built files
FROM nginx:alpine

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 1234
EXPOSE 1234

# Change Nginx config to use port 1234
RUN sed -i 's/80/1234/g' /etc/nginx/conf.d/default.conf

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
