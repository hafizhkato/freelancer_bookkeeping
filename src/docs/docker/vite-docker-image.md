



![Compression Output](https://d3vc6iedgmxs4m.cloudfront.net/contact-API.jpg)
## 1. Project Overview

This document describe and explain process to build a docker image for node.js application. Since we are using React-Vite, it falls under node.js application

---

## 2. Dockerfile Structure

**Stage 1: Build Stage**

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
```
 **Purpose**: This stage handles all build-time dependencies and compiles the application.

 **Components**:

**Base Image**: `node:20-alpine` (Node.js 20 on Alpine Linux for minimal size)

**Working Directory**: /app (all commands run in this directory)

**Dependency Installation**:

+ Copies package.json and package-lock.json

+ Runs npm install to install dependencies

**Application Build**:

- Copies all source files

**Runs npm run build** (typically creates production assets in dist/ folder)
---
**Stage 2: Production Stage**

```dockerfile
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

```
 **Purpose**: This stage creates the final production image with only necessary runtime components.

 **Components**:

**Base Image**: nginx:alpine (nginx web server on Alpine Linux)

**Cleanup**: Removes default nginx content

**Asset Deployment**:

- Copies built assets from the builder stage (/app/dist)

- Places them in nginx's default serving directory

**Optional Configuration**: Commented line shows how to add custom nginx config

**Port Configuration**: Exposes port 80 (HTTP)

**Runtime Command**: Starts nginx in foreground mode

## 3. Github Workflows



