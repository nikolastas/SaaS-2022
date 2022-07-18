# Database code & sql

Here we explain the basics on our database sytem.
This is a mysql database.
This was required to the early stages of the project! 
You can see the actual SQL code of the microservices in each microservice.

# Required 


1. [MySQL 8.0.29 server](https://dev.mysql.com/downloads/mysql/) and j connector.
2. (optional) datagrid jet brains
3. A user with these credetials :
* Username: ```root```
* password: ```root```
4. A database named: ```saas``` .

# Generate database
A SQL file with all the code for the database.
You can run it through your GUI/console and see all database scheemas need it!


# Drop database

To drop the basic scheema you have to run the ``` drop database.sql ``` file .

# Initialize database
This file contains a code about database initilization.
It does the following things:
1. adds with secure code the first users of the APP
2. adds the contries 
3. add the first day of January 2022 of the actual total load, aggregation generration per type and the physical flows .

In order for the python script to work you need to create a ```./saas2022-24/data``` folder.
with the 2022_01_01_01_*.csv files of each type.
