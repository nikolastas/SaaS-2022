import numpy 
import mysql.connector
import pandas as pd
# read file 
def read_file(filename):
    # open file
    file = open(filename, 'r')
    # read file
    data = file.read()
    # close file
    file.close()
    # return data
    return data

data = read_file('./database/credentials.txt').split()
# get data from file

username =data[0]
password = data[1]
database = data[2]

# connect to database with username and password using mysql connector
cnx = ""
try:
    cnx = mysql.connector.connect(user=username, password=password, database=database)
except:
    print("error with credentials")
    exit()
print("Database connected")



def add_data(data, database):
    # create cursor
    cursor = cnx.cursor()
    # if data is list make a for loop
    if (type(data) == tuple):
        query = ("INSERT INTO "+ database+" VALUES "+str(data) )
        cursor.execute(query)
        # fetch all rows
        rows = cursor.fetchall()
        cursor.close()
        # insert data in database
        cnx.commit()
        # close connection
        cnx.close()
        return 
    for d in data:
        # make the data query 
        query = ("INSERT INTO "+ database+" VALUES "+str(d )+"")
        print(query)
        cursor.execute(query)
        # fetch all rows
        rows = cursor.fetchall()
    cnx.commit()
    cnx.close()
    return
try:
    add_data(("117516749689603537471", '2020-10-10', '2022-12-30', "VALID"), "subscriptions")
    add_data(("104881660807990284320", '2020-10-10', '2022-12-30', "VALID"), "subscriptions")
except:
    print("error with user data")
print("User Data finished")

# read csv file
def read_csv(filename):
    data = pd.read_csv(filename, sep=";")
    print(data.head())
    list_of_data = []
    for index, row in data.iterrows():
        list_of_data.append(row["AreaTypeCode"], row["AreaName"], row["MapCode"])
        return list_of_data
list_of_data = read_csv("./data/countries/countries_data.csv") 
add_data(list_of_data, "area")