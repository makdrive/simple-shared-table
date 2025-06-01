# Stage 1: Build the React app
FROM node:18-alpine AS build

WORKDIR /usr/src/app/client

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve the static files with a lightweight server (e.g., Nginx)
FROM nginx:stable-alpine
COPY --from=build /usr/src/app/client/dist /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
