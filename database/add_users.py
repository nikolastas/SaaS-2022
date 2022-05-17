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

def check_countries():
    cursor = cnx.cursor()
    query = ("SELECT * FROM area")
    cursor.execute(query)
    # fetch all rows
    rows = cursor.fetchall()
    cursor.close()
    # insert data in database
    cnx.commit()
    # close connection
    return rows
countries = check_countries()

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
       
        return 
    for d in data:
        # make the data query 
    
        data = "("
        for i in d:
            if (i == None):
                data += "NULL,"
            else:
                data = data + "'" + str(i) + "',"
        data = data[:-1]
        data = data + ")"
        query = ("INSERT INTO "+ database+" VALUES "+data+"")
        print(query)
        cursor.execute(query.format(str(query)))
        # fetch all rows
        rows = cursor.fetchall()
    cnx.commit()
    
    return
try:
    add_data(("117516749689603537471", '2020-10-10', '2022-12-30', "VALID"), "subscriptions")
    add_data(("104881660807990284320", '2020-10-10', '2022-12-30', "VALID"), "subscriptions")
except:
    print("error with user data")
print("User Data finished")

# read csv file
def read_csv_countries(filename):
    data = pd.read_csv(filename, sep=";")
    list_of_data = []
    for index, row in data.iterrows():
        list_of_data.append((row["AreaTypeCode"], row["AreaName"], row["MapCode"]))
    return list_of_data
# list_of_data = read_csv_countries("./data/countries/countries_data.csv") 
# add_data(list_of_data, "area")


def read_csv_no_FF(filename):
    data = pd.read_csv(filename, sep="\t")
    print(data.head())
    list_data = []
    for index, row in data.iterrows():
        # all the row with not datetime in it
        country = tuple(row[["AreaTypeCode", "AreaName", "MapCode"]])
        if(country not in countries):
            add_data(country, "area")
            countries.append(country)
        # replace'nan' with -
        row = row.replace(numpy.nan, None)
        selected_data_from_row = dict(row)
        del selected_data_from_row["AreaCode"]
        del selected_data_from_row["AreaTypeCode"]
        del selected_data_from_row["AreaName"]
        del selected_data_from_row["MapCode"]
        selected_data_from_row["AreaName"] = row["AreaName"]
        list_data.append(tuple(selected_data_from_row.values()))
    return list_data

d = read_csv_no_FF("./data/aggrgenerationpertype/2022_01_01_01_AggregatedGenerationPerType16.1.BC.csv")
# add_data(d, "aggrgenerationpertype")

e = read_csv_no_FF("./data/actualtotalload/2022_01_01_01_ActualTotalLoad6.1.A.csv")
add_data(e, "actualtotalload")
 # close connection
cnx.close()