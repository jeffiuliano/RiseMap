states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA", 
          "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", 
          "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", 
          "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", 
          "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]


masterf = open('master.csv','r')
mast = masterf.read()
arrytemp = mast.splitlines()
arry = [i.split(',') for i in arrytemp]

for i, el in enumerate(arry):
	if el[0] in states:
		f = open(el[0]+'.csv','w')
		for j in range(1,23):
			for x in arry[i+j][1:]:
				f.write(x+',')
			f.write('\n')




# for x in states:
# 	f = open(x+".csv",'w')
# 	f.write(ex)
# 	f.close()

