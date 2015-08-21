states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA", 
          "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", 
          "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", 
          "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", 
          "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]

sts = []


jsf = open('../js/rightsjs.js','w')


masterf = open('master.csv','r')
mast = masterf.read()
arrytemp = mast.splitlines()
arry = [i.split(',') for i in arrytemp]


#actually reading master
for i, el in enumerate(arry):
	if el[0] in states:
		yn = []
		law = []
		link = []
		
		for j in range(1,23):
			x= arry[i+j]
			yn.append(x[1])
			link.append(x[2])
			law.append(x[3])
		for i, x in enumerate(yn):
			yn[i] = "\'"+x+"\'"
		for i, x in enumerate(law):
			law[i] = "\'"+x+"\'"
		for i, x in enumerate(link):
			link[i] = "\'"+x+"\'"
		sts.append([el[0],yn,law,link])


from random import randint

# for testing purposes!!!
def ryn():
	z = randint(0,1)
	if z==1:
		return "\'y\'"
	else:
		return "\'n\'"


for s in states[1:]:
	yns = []
	for i in range(22):
		yns.append(ryn())
	sts.append([s,yns,[],[]])


# js file writing
jsf.write("function fillrights(){")
for s in sts:
	jsf.write("states."+s[0]+".yn = ["+', '.join(s[1])+"];\n")
	jsf.write("states."+s[0]+".law = ["+', '.join(s[2])+"];\n")
	jsf.write("states."+s[0]+".link = ["+', '.join(s[3])+"];\n")



jsf.write("}")

jsf.close()
masterf.close()