from datetime import datetime
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
        # special case if d is None !
        data = "("
        for i in d:
            if (i == None):
                data += "NULL,"
            else:
                data = data + "'" + str(i) + "',"
        data = data[:-1]
        data = data + ")"
        # make the query
        
        
        query = ("INSERT INTO "+ database+" VALUES "+data+"")
        # print(query)
        # execute query
        cursor.execute(query.format(str(query)))
        # fetch all rows
        rows = cursor.fetchall()
    cnx.commit()
    
    return


# read csv file
def read_csv_countries(filename):
    data = pd.read_csv(filename, sep=";")
    list_of_data = []
    counties_added = {}
    for index, row in data.iterrows():
        if(row["AreaTypeCode"] == "CTY" and row["MapCode"] not in counties_added):
            list_of_data.append((row["AreaTypeCode"], row["AreaName"], row["MapCode"]))
            counties_added[row["MapCode"]] = True
    return list_of_data



def read_csv_no_FF(filename):
    data = pd.read_csv(filename, sep="\t")
    list_data = []
    for index, row in data.iterrows():
        if(row["AreaTypeCode"] == "CTY" ):
            # all the row with not datetime in it
            # replace'nan' with -
            row = row.replace(numpy.nan, None)
            selected_data_from_row = dict(row)
            del selected_data_from_row["AreaCode"]
            del selected_data_from_row["AreaTypeCode"]
            del selected_data_from_row["AreaName"]
            del selected_data_from_row["MapCode"]
            selected_data_from_row["MapCode"] = row["MapCode"]
            list_data.append(tuple(selected_data_from_row.values()))
    return list_data



def read_csv_data_FF(filename):
    data = pd.read_csv(filename, sep="\t")
    list_data = []
    for index, row in data.iterrows():
        if(row["InAreaTypeCode"] == "CTY"  and row["OutAreaTypeCode"] == "CTY"):
            # all the row with not datetime in it
            # replace'nan' with None
            row = row.replace(numpy.nan, None)
            selected_data_from_row = dict(row)
            for s in ["In", "Out"]:
                del selected_data_from_row[s+"AreaCode"]
                del selected_data_from_row[s+"AreaTypeCode"]
                del selected_data_from_row[s+"AreaName"]
                del selected_data_from_row[s+"MapCode"]
                selected_data_from_row[s+"MapCode"] = row[s+"MapCode"]
            list_data.append(tuple(selected_data_from_row.values()))
    return list_data
######## ------------------- adding proceess---------------------------- #############

# --------------------- add countries -----------------
print("trying to add countries")
try:
    list_of_data = read_csv_countries("./data/countries/countries_data.csv") 
    add_data(list_of_data, "area")
    print("countries added")
except:
    print("error with countries")

# get all counties
print("Getting all countries")
try:
    countries = check_countries()
    print("Counties: Done!")
except:
    print("something went wrong with countries")

# --------------------users-----------------
print("try to add users!")
try:
    # panagiotopoulos
    add_data(("117516749689603537471", '2020-10-10', '2022-12-30', "VALID"), "subscriptions") 
    # alexandris
    add_data(("104881660807990284320", '2020-10-10', '2022-12-30', "VALID"), "subscriptions")
    # tasiopoulos
    add_data(("104059457961494644509", '2020-01-01', '2022-12-30', "VALID"), "subscriptions")
    # tsiakataras
    add_data(("102898846638332952747", '2020-01-01', '2022-12-30', "VALID"), "subscriptions")
    print("User Data finished")
except:
    print("error with user data")


# ---------------------- aggregation and actual total load -----------------
print("try to add aggregation and actual total load")
try:
    d = read_csv_no_FF("./data/aggrgenerationpertype/2022_01_01_01_AggregatedGenerationPerType16.1.BC.csv")
    add_data(d, "aggrgenerationpertype")

    e = read_csv_no_FF("./data/actualtotalload/2022_01_01_01_ActualTotalLoad6.1.A.csv")
    add_data(e, "actualtotalload")

    print("Aggregation and Actual Total Load finished")
except:
    print("error with aggregation and actual total load")


    

# ------------------- physical flow -----------------
print("try to add physical flow")
try:
    f = read_csv_data_FF("./data/physicalflows/2022_01_01_01_PhysicalFlows12.1.G.csv")
    add_data(f, "physicalflows")
    print("Physical Flow finished")
except:
    print("error with physical flow")


 # close connection
cnx.close()