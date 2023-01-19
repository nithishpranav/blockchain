import csv
import time
with open('PdM_telemetry.csv', 'r') as f:
    reader = csv.reader(f)
    for row in reader:
        print(row)
        print(row[0])
        #print(row[1])
        print(row[2])
        print(row[3])
        print(row[4])
        print(row[5])
        
        time.sleep(1)
        