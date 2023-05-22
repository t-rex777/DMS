# Step 1: Specify the base image
FROM node:18.15.0

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy project files
COPY . .

# Step 4: Install project dependencies
RUN npm install -g pnpm
RUN pnpm install

# Step 5: Expose the necessary ports
EXPOSE 6173

# Step 6: Specify the startup command
CMD ["pnpm", "start"]




FROM nginx:stable as production-stage

COPY --from=build-stage /app/build/ /var/www/

RUN rm /etc/nginx/conf.d/default.conf

COPY ./nginx.conf /etc/nginx/conf.d/default.conf