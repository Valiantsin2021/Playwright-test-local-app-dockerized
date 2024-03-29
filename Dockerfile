FROM mcr.microsoft.com/playwright:v1.42.1-jammy
RUN apt-get purge -y --auto-remove python3.8
RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive \
    apt-get -y install default-jre-headless && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
RUN apt-get update && \
    apt-get -y install zip
WORKDIR /app
RUN npx playwright install chrome
CMD ["npm", "t"]