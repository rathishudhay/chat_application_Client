# Base of the image to use
FROM node:15  
# Specify the working directory
WORKDIR /app            
# Copy package.json to current working directory
COPY package.json .     
# Run the "npm install" command  
ARG NODE_ENV 
RUN if [ "$NODE_ENV" = "development" ]; \
  then npm install; \
  else npm install --only=production; \
  fi  

# Copy content from current directory to working directory
COPY . ./               
# Environment variables
ENV PORT 3000
# Just for documentation purpose
EXPOSE $PORT             
# Run "npm run dev" command
CMD ["node","server.js"] 