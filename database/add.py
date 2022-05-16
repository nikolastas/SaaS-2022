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
username =data[0]
password = data[1]
database = data[2]
# connect to database with username and password using mysql connector
cnx = mysql.connector.connect(user=username, password=password, database=database)
# create cursor
cursor = cnx.cursor()
# SELECT ALL SUBSCRIPTIONS 
query = ("SELECT * FROM subscriptions")
cursor.execute(query)
# fetch all rows
rows = cursor.fetchall()
# print all rows
for row in rows:
    print(row)
# close cursor
cursor.close()
# test database connection
print('Connected to database')
