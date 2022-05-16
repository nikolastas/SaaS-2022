import numpy 
import mysql.connector

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

data = read_file('credentials.txt').split()
# get data from file

username =data[0]
password = data[1]
database = data[2]

# connect to database with username and password using mysql connector
try:
    cnx = mysql.connector.connect(user=username, password=password, database=database)
except:
    print("error with credentials")
print("Database connected")

# create cursor
cursor = cnx.cursor()

def add_data(data, database):
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
        query = ("INSERT INTO"+ database+" VALUES "+str(d) )
        cursor.execute(query)
        # fetch all rows
        rows = cursor.fetchall()
    cnx.commit()
    cnx.close()
    return

add_data(("nikos3", '2020-10-10', '2022-12-30', "VALID"), "subscriptions")
