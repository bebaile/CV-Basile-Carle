# my-cv, a project developed by Basile Carle

## Aim of this project

the aim of this small project is to demonstrate, around something that everyone is familiar with, all the competences i have developed as part of my first 6 month training as a Web and web mobile developer. The rationale for building this project can be found in my research for a position as a junior developer and the objective of passing the web and mobile web developer certificate (titre professionnel in French). If the most obvious feature is to present my CV to a recruiter, it is also aimed at enabling me to better track the relationship with the prospect (the recruiter) and to prompt him to contact me, make an appointment throughout the features developed in this application. To do that, the recruiter will have a personnal environment with an history of all the interactions he will have had with the owner of the CV. As for the owner of the CV himself, he will have an admin board to manage all the interactions with the users. Although it apparently replicate fully fonctionnal and well established tools, the interest of this applied exercise is to make it an ideal support for further discussion with the recruiter, while enticing him to experience i was capable of developing.

This project is developed with React on the frontend and Node/Express/mySQL on the back. This project is therefore a fullstack project

## install and configuration

1. create the database with database.sql run script file
2. Configure .env files
   > In the backend :
   - PRIVATE_KEY : key used to generate JWT token for authentication
   - DB_user and DB_PASSWORD : self-explanatory
   - ADMIN_EMAIL : the bydefault email used to identify messages sent to the admin (vs the message that the admin is sending to a user
3. npm run setup (at the root of the project)
4. npm run dev

In order to access the admin page, a user has to be created on /login page and then a value of "admin" must be manually added to the user in the db

> ex : UPDATE user SET type = "admin" WHERE email = "xxx" dans mysql

5. Once logged , the admin is automatically redirected on admin page where availabilities need to be created so that the appointment and message feature can be used

## available features

1. browsing the CV
2. display a QRCode to browse the CV on a mobile device
3. making an appointment
4. creation and authentication of a user
5. For the admin, possibility to configure typical availabilities and manage users (modification + suppress users)

## features in dev

1. more ways to share the CV
2. possibility to leave advice
3. development of a non admin user environment to manage passed interactions, make advices and delete its own account
4. for the admin, development of a dashboard to track statistics
