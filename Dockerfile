# Stage 1: Build the Angular application (slim Node.js environment)
FROM node:alpine AS builder

WORKDIR /app

# Copy Angular project files
COPY . .

# Install dependencies
RUN npm install

# Build Angular application for production (replace with `ng build` for development)
RUN npm run build --prod

# Stage 2: Serve the application (lightweight Nginx image)
FROM nginx:alpine

# Copy compiled Angular application files
COPY --from=builder /app/dist/your-app-name /usr/share/nginx/html

# Replace "your-app-name" with the actual name of your Angular application folder in the dist directory

# Configure Nginx default server block
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
