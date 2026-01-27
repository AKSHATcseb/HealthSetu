FROM node:18

WORKDIR /app

# Copy backend package files
COPY BACKEND/package*.json ./

RUN npm install

# Copy backend source
COPY BACKEND/ .

EXPOSE 8080

CMD ["npm", "start"]
