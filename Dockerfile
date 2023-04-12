FROM node:18-alpine

ADD package.json /tmp/package.json

RUN rm -rf dist

# Install dependancies with yarn
RUN cd /tmp && yarn

# Copy all files to the /src directory
ADD ./ /src

# Remove the node_modules folder in /src and copy the new node_modules folder to /src
RUN rm -rf /src/node_modules && cp -a /tmp/node_modules /src/

# Define working directory
WORKDIR /src

# Run the build script
RUN yarn run build

# Install pm2 globally
RUN yarn global add pm2

# Expose port 4000 where the qapplication will run
EXPOSE 4000

# Start the application with pm2
CMD ["pm2-runtime", "process.json"]