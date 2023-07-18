# First we are using a temporal container to install node_modules and have them cached (LAYER1)
FROM node:18-alpine AS installer
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# We send the node_modules from the first temporal container to the second temporal container to do the build
FROM node:18-alpine AS builder 
WORKDIR /app
COPY . .
COPY --from=installer /app ./
RUN npm run build


# Now we get the built .next/standalone to provide the final docker image
FROM node:18-alpine
WORKDIR /app

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder  /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
