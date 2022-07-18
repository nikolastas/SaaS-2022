# Energy Live 2022 Web App

[![built with React](https://img.shields.io/badge/built%20with-react-green)](https://reactjs.org/)
[![built with Highcharts](https://img.shields.io/badge/built%20with-highcharts-orange)](https://www.highcharts.com/)

This code section is about the implementation of a web app that connects with the microservices of [login_handling](https://github.com/ntua/saas2022-24/tree/master/login_handling)
and data_fetch (3 separate microservices) in order to provide information in the form of charts about the energy flows, total energy loads and
generated energy within the european Countries.

## Hosting

The web app is publicly hosted [here](https://master.d1eqcvae5rwrd.amplifyapp.com/). The hosting services are provited by
the amazon web services (AWS) amplify my app cloud hosting.

## Login service

The login section is constructed using Google SSO login services and with cross-checking the token given by the client
with Google in every section of the web app.

## Subscription services
The subscription plans are in a demo form, which means that there is not a payment service in the subscription renewal or in
the purchase of the new subscription. The current subscription plans is the following:
- 1 month
- 6 months
- 1 year

## User management services
The user subscription status and the user credentials are saved in a cloud database provided by Google Cloud Run 
services.

## Statistics services
The statistics services are constantly communicating with the data_fetch microservices and getting the appropriate data
from the database of this microservices in order to display it in 2 different forms.
In order for the user to access this data he must be logged in and provide the following
- The date from which the data start to display
- The type of the chart to display
- The specific parameters according each display type

Then the data is displayed in 2 forms:
- The first form is the actual values that is being fetched overtime
- The second form is the accumulated values that display se summary of all the previous values over time

The display is handled using the Highchart.js firmware.

## Fake API Calls
The header of the web app provides a dropdown list which include options that simulate the FTP API calls for the 
input microservice to catch and start the process of processing the data and in the end displaying in the frontend.
The supported calls is the following

| API CALL NAME       | FUNCTION                                                                |
|---------------------|-------------------------------------------------------------------------|
| API CALL ATL        | Gets a new csv for the Actual Total load input database                 |
| API CALL AGRT       | Gets a new csv for the Generated Total Load Per Type input database     |
| API CALL FF         | Gets a new csv for the Physical Flows input database                    |
| API CALL RESET ATL  | Removes the data from Actual Total load data input database             |
| API CALL RESET AGRT | Removes the data from Generated Total Load Per Type data input database |
| API CALL RESET FF   | Removes the data from Physical Flows data input database                |



