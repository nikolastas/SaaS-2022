# **Semester Project for SaaS course @ NTUA, 8th Semester 2021-2022**

This project was conducted for the course of SaaS at the 2021-2022 Spring semester of the ECE School, NTUA

**Goals of the project**

The goal of the project was to develop an cloud-based application using the microservice architecture. The apps hosts data about the energy consumption of countries in Europe and presents them in a way users can interact with them.
In order to acces the app, users must have a google acount a pick their desired subscription plan

## **Website that hosts the application** 

## Website: [Energy Live 2022](https://master.d1eqcvae5rwrd.amplifyapp.com/) 



**Technical Details**

| Asset                       | Technologies Used |
|-----------------------------| ----------- |
| backend                     | NodeJS |
| frontend                    | CSS, javascript, react, Highcharts |
| database                    | MySQL |
| Authentication              | Google Auth |
| Microservice communication  |Confluent Kafka|
| Cloud Services              |Amazon AWS, Google Run|


**This project was a collaborate effort of a team of 5 members. Those members are:**

| Name|
| ----- |
| Georgios Tsiakataras|
| Georgios Alexandris|
| Orestis Zaras|
| Ioannhs Panagiotopoulos|
| Nikolaos Tasiopoulos|

---
**Microservices** <br>
Each microservice is implemented in its own folder as shown in the github hierarchy. Inside each microservice folder there is one README that explains what this microservice does.

**Cloud implementation** <br>
In order to use the cloud services, we used the free trials provided by them and so, the resourses and the time that they are 'online' is limited.

## General Idea:

**Input** <br>
Makes a API request to an FTP server hosted by aws in order to get the latest csv file. After a successfull request the microservice adds only the difference of the csv data, between the current and the previos file (if the previous file does not exists it adds the whole file) to its database. Sends to kafka : 
``` 
DATA READY: ${latest (date + hours) of csv file name - 1 hour} 
```
example if file has name :
```
2022_01_01_00_AggregatedGenerationPerType16.1.BC.csv
```
it sends :
``` 
DATA READY: 2021-12-31 23 
```
After each file it truncates its database.

**Modify**<br>
Receives the data ready message through kafka. It parses the date and checks if is the first day of the month. If it is, it truncades the whole database.
After that , it take the data from the input database and check if the datetime collumn is greater than the datetime it received from kafka .
If is greater only a insert is nessecery , if is less than the datetime we basicly have to update this data to our database. After that it sends a 
```
KAFKA READY 
```
to the data fetch microservice.

**Data Fetch** <br>
Fetching data with a kafka message from modify and serving them in frontend in a form equest. 

**Front End Test API calls** <br>
In order to test our application we had to build an API where the user could press a button to make a GET request and add start the input proccess.
We added a specified button to the frontend page for that reason.
Also we added a reset button to reset the database data with 1 click.
### WARNING : API calls only accept 1 request per 15 seconds.

