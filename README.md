# Complete deployment pipeline of Todo App with using Playwright <a href="https://playwright.dev/" target="blank"><img align="center" src="https://playwright.dev/img/playwright-logo.svg" alt="WebdriverIO" height="40" width="40" /></a> 

[![Deployment pipeline](https://github.com/Valiantsin2021/Playwright-test-local-app-dockerized/actions/workflows/simple_deployment_pipeline.yml/badge.svg)](https://github.com/Valiantsin2021/Playwright-test-local-app-dockerized/actions/workflows/simple_deployment_pipeline.yml) [![Test example application](https://github.com/Valiantsin2021/Playwright-test-local-app-dockerized/actions/workflows/healthcheck.yml/badge.svg)](https://github.com/Valiantsin2021/Playwright-test-local-app-dockerized/actions/workflows/healthcheck.yml) [![Test local app in a docker container (Playwright)](https://github.com/Valiantsin2021/Playwright-test-local-app-dockerized/actions/workflows/dockerized_tests.yml/badge.svg)](https://github.com/Valiantsin2021/Playwright-test-local-app-dockerized/actions/workflows/dockerized_tests.yml)
## Author

- [@Valiantsin2021](https://www.github.com/Valiantsin2021) [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## Repository Overview

This repository provides an example of the complete deployment pipeline of the "Todo App". Includes:

### 1. Static code checks, linting and formatting

### 2. API and UI tests of the application with the Playwright

### 3. Performance test with Loghthouse

### 4. Github actions workflows for the build and test in a Docker container, deployment pipeline to Render.io and Health check pipeline



## Setup

1. Clone this repository or unzip the downloaded file.
2. Install dependencies with `npm install`.
3. Run tests using the following commands:
   - `docker build -t <desired image name> .`
   - `docker run -it --rm --name <desired container name> -v ./allure-report:/app/allure-report -p 3000:3000 <docker image name from previous step> npm test`
   - `docker run -it --rm --name direct -v ${pwd}:/app -w /app -p 3000:3000 mcr.microsoft.com/playwright:v1.36.1-jammy npm t`
   - `npm run test` to run the test file.
   - `npm run posttest` to create an Allure report.
   - `npm run reset` to reset the database of the app


## 🔗 Links

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://valiantsin2021.github.io/Portfolio/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/valiantsin-lutchanka/)

## Small print

Author of the TodoMVC app used for testing: Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt; &copy; 2022
