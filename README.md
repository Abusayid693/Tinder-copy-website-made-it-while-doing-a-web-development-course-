# SOS-Application
# NPM packages
    1.Mongoose
    2.ejs
    3.body-parser
    4.node-fetch
    5.express

SOS Web Application using Node.js, Express.js, MongoDB and Ejs Templating.

Demo Video:https://youtu.be/6XUx7J8PZtE


# STEPS - To run the project in your local host. 
        1. npm install  Mongoose,ejs,body-parser,node-fetch,express.
	2. Create database in Mongo atlas and replace the the key from server(mongoose connect). 
	3. Create google Map API key and replace it in Police.ejs file.
	4. Create NOTIVIZE api for notifications and replace it in server.
	5. Create Position stack API key (reverse geocoding) & replace it in server.
	6. node / nodemon server.js
	  

2.Deshboards
   
   Victims deshboard-local host:3000/
       
  ![Victims deshboard](https://github.com/Abusayid693/SOS-Application/blob/main/Screenshot%202021-03-07%20at%205.15.37%20PM.png)
      
   Police Deshboard
    
  ![Police Deshboard](https://github.com/Abusayid693/SOS-Application/blob/main/Screenshot%202021-03-07%20at%205.02.07%20PM.png)
      


3. Once SOS button is clicked it will detect victim's location and show in police server (better run victim and police server from different places). 

4. once victim start moving it will trace victim's path and distance victim moved(inrespect to initial position).
   ![](https://github.com/Abusayid693/SOS-Application/blob/main/Screenshot%202021-03-07%20at%205.20.08%20PM.png).
 
   ![](https://github.com/Abusayid693/SOS-Application/blob/main/ezgif.com-optimize.gif)
