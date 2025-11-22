FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Remove .next if it exists to ensure clean build
RUN rm -rf .next

EXPOSE 4000

ENV HOSTNAME="0.0.0.0"
ENV WATCHPACK_POLLING=true

CMD ["npm", "run", "dev"]
