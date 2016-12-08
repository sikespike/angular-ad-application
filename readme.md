Angular Gulp build for Angular Chocolate Cart App
=================================================
CLI commands:
npm start - primary run method
npm build - just does a fresh build
gulp test - run tests
gulp clean - clean deploy folder
gulp build - build the dist
gulp start - start the servers if you want to start the app use "npm start"
gulp start-server - starts the API server

To run the application:
it is a bit tricky because I designed with assumption there is an API server
so to start the app please open terminal in the same directory as the project

run:
npm install
npm startServer

this will install all the requirements and then start the API server

now in a new terminal at the same directory run:
npm start
this will do a clean build and start the webserver

Now when it loads the application should be available at
http://localhost:9001

Needs work:
Tests are broken but you can still read the file

