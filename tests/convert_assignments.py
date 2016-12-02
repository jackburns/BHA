#!/usr/bin/python
import csv, geocoder, string, datetime

fname = "./table_assignment.csv"
oname = "./test_assignments.csv"
outfile = []

outfile.append("name,posted_by,volunteers,language,start_date,time,type,notes,admin_notes,duration,street,city,state,zip,phone")
with open(fname) as csvfile:
    reader = csv.DictReader(csvfile)
    last_year = 2010
    for i, row in enumerate(reader):
        # only go a year back
        if row["Date_Provided"]:
            dateof =  datetime.datetime.strptime(row["Date_Provided"], "%m/%d/%y %H:%M:%S")
            last_year = dateof.year
            if dateof.year < 2016: continue
        else:
            if last_year < 2016: continue

        # start building our data

        # name
        newline = row["Client_First"]+" "+row["Client_Last"]+","
        newline += row["Client_First"]+" "+row["Client_Last"]+"," # Posted By
        newline += row["Volunteer_Email"]+","       # volunteers
        newline += row["Language_Required"]+","     # language
        newline += row["Date_Provided"]+","         # start_date
        newline += row["Time"]+","                  # time
        newline += "0,"                             # type
        newline += ","                              # notes

        # parse notes
        notes = "ID: "+row["Client_ID"]
        notes += " - "+row["Reason_Requested"]
        notes += " - "+row["Other1"]
        notes += " - "+row["Other2"]
        notes += " - "+row["Other3"]
        notes += " - "+row["Notes"]
        newline += notes.replace(","," ")+","       # admin_notes

        # duration defaulting
        dur = int(row["duration"]) if row["duration"] else 60
        if dur > 2:
            dur = str(dur / 60.0)
        newline += dur+","              # duration

        newline = "".join(filter(lambda x: x in string.printable, newline))
        # TODO Split address up
        address = geocoder.google(row['Client_Address'] + row["Client_Address2"])
        xstr = lambda s: s or ""
        street_full = str((xstr(address.housenumber) + xstr(address.street)).replace(","," "))
        city = xstr(address.city)
        newline += street_full+","              # Street 
        newline += city+","                 # City
        newline += xstr(address.state)+","      # State
        newline += xstr(address.postal)+","     # Zip
        newline += row["Client_Phone"]          # Phone
        outfile.append(newline)
    
ofile = open(oname, "w")
for line in outfile:
    ofile.write(line+"\n")
ofile.flush()
ofile.close()
