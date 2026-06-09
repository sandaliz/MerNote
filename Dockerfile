# ---- Build Frontend ----
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend

# Copy frontend package files
COPY frontend/package*.json ./
RUN npm install

# Copy frontend source and build
COPY frontend/ ./
RUN npm run build

# ---- Build Backend ----
FROM node:20-alpine AS backend-build
WORKDIR /app/backend

# Copy backend package files
COPY backend/package*.json ./
RUN npm install --omit=dev

# Copy backend source
COPY backend/src ./src

# ---- Production Image ----
FROM node:20-alpine

WORKDIR /app

# Copy backend node_modules and source
COPY --from=backend-build /app/backend/node_modules ./backend/node_modules
COPY --from=backend-build /app/backend/src ./backend/src
COPY --from=backend-build /app/backend/package.json ./backend/package.json

# Copy built frontend dist from frontend build stage
COPY --from=frontend-build /app/frontend/dist ./frontend/dist

EXPOSE 5001

# Run as non-root user for security
USER node

CMD ["node", "backend/src/server.js"]