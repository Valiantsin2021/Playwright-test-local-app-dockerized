FROM mcr.microsoft.com/playwright:v1.49.1-jammy
RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive \
    apt-get -y install default-jre-headless && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
RUN apt-get update && \
    apt-get -y install zip
RUN npx playwright install chrome
CMD ["npx", "playwright", "test"]