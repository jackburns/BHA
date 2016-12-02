'''
Tests for SSL connection. 
<<<<<<< HEAD
On success, prints HTTP response information.
On failure, prints HTTP failure information.
Results are saved to test.log
'''
from urllib.request import urlopen
import sys
# replace url with whatever site it is currently being hosted on. Will update url.
secure_url = 'https://www.bostonhousing.org/en/Job-Postings/Volunteer-Interpreter-positions.aspx'
f = open('sslTest.log', 'w')
try:
	response = urlopen(secure_url)
	result = 'PASSED: \n' + str(response.info())
	f.write(result)
	print(result)
	f.close()
except IOError as e:
	if hasattr(e, 'code'):
		result = 'FAILED: \n http error ', e.code
		f.write(result)
		print(result)
	elif hasattr(e, 'reason'):
		result = 'FAILED: \n url error. Site unreachable. ' + str(e.reason)
		f.write(result)
		print(result)
	else:
		result = 'FAILED: ', e
		f.write(result)
		print(result)
	f.close()
