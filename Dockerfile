# Node.js versi LTS
FROM node:18

# Set working directory
WORKDIR /app

# Salin file package.json dan package-lock.json jika ada
COPY package*.json ./

# Install dependensi
RUN npm install

# Salin seluruh source code
COPY . .

# Expose port default
EXPOSE 8080

# Jalankan aplikasi
CMD [ "node", "server.js" ]