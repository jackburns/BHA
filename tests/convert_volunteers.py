#!/usr/bin/python3
import csv

fname = "./table_volunteer.csv"
oname = "./test_volunteers.csv"
outfile = []
outfile.append("First Name,Family Name,Middle Name,Sex,Notes,Active?,training,Observation1,Observation2,Address,Phone,Email")
with open(fname) as csvfile:
	reader = csv.DictReader(csvfile)
	for i, row in enumerate(reader):
		if "@" not in row["email"]:
			print("skip!")
			continue
		newline = row["first_name"]+","
		newline += row["last_name"]+","
		newline += row["middle_name"]+","
		newline += row["sex"]+","
		newline += ","
		newline += row["Active"]+","
		newline += row["training"]+","
		newline += row["Observation1"]+","
		newline += row["Observation2"]+","
		newline += ","
		newline += row["phone"]+","
		newline += row["email"]
		outfile.append(newline)
	
ofile = open(oname, "w")
for line in outfile:
	ofile.write(line+"\n")
ofile.flush()
ofile.close()
