# MyPet
Online pet shop 


This is a petshop application, developped using MERN stack, that helps pets' buyers and sellers reach each other and it facilitates the communication between them. The online shop also provides the ability to buy and sell any kind of pets' accessories and food.

To run the app locally:
1-clone the repo. 
2-then you will need to create a .env file, to write any sensitive data about your e-mail, password, database connection string or keys to you APIs.  
3-npm install. 
4-npm start both server and client. 


To run the app remotely via Docker:
1-clone the repo. 
2-then you will need to create a .env file, to write any sensitive data about your e-mail, password, database connection string or keys to you APIs.  
3-build 2 docker images named "newserv"(server) and "newcli"(client) using the following docker command "docker image build -t <image name> <Path> 
(for the first image the path will be . and for the second image it will be ./client).  
4-After that, type the following command in the terminal "docker-compose up" and you will be able to use the application on the web.
