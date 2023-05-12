# test-todomvc-using-playwright-docker

### You can use either Dockerfile_playwright_official_java file to build the common image or build minified image with Dockerfile_minified_ub_node file 
To setup:
1.  ```npm i```
2.  ```docker build -t <desired image name> .```
3.  ```docker run -it --rm --name <desired container name> -v ${pwd}/allure-report:/app/allure-report -p 3000:3000 <docker image name from previous step> npm test```
### run without the image build
4.  ```docker run -it --rm --name direct -v ${pwd}:/app -w /app -p 3000:3000 mcr.microsoft.com/playwright:v1.32.3-focal npm t```
## Small print

Author of the TodoMVC app used for testing: Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt; &copy; 2022