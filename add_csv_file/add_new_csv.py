# child proccess for keeping only the new files from 2 csv's
# argumenets used are:
# argv[1]: foldername
# argv[2]: filename1 (the bigger file or the most recent one)
# argv[3]: filename2
# argv[4]: output file name (must end with .csv)


import pandas as pd
import numpy as np
import sys

csv1 = pd.read_csv("./data/"+sys.argv[1]+"/"+sys.argv[2], sep="\t")
csv2 = pd.read_csv("./data/"+sys.argv[1]+"/"+sys.argv[3], sep="\t")


csv3 = csv1.merge(csv2, how = 'outer' ,indicator=True).loc[lambda x : x['_merge']=='left_only']

csv3.to_csv(sys.argv[4], sep='\t')    

