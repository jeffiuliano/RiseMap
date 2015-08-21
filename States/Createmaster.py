states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA", 
          "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", 
          "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", 
          "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", 
          "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]


masterf = open('mastertemplate.csv','w')

for x in states:
	masterf.write(x+'\n'+"\
Right to prompt analysis of rape kit\n\
Right to result of rape kit\n\
Right to retention of rape kit until statute of limitations expires\n\
Right to 100% government-subsidized rape kit\n\
Right to shower at hospital post-examination\n\
Right to be notified in writing of nearest rape crisis center\n\
Right to receive written statement of rights at time of report\n\
Right to be informed about available protection by law enforcement\n\
Right to copy of the police report\n\
Right to be informed about final disposition of case\n\
Right to be informed when convicted perpetrator is released from jail\n\
Retention of all rights regardless of whether assault is reported to police\n\
Right to courtroom cleared during testimony\n\
Right to submit a victim impact statement or report to the court before sentencing\n\
Prohibition of polygraph testing of survivor\n\
Right not to have results from rape kit used in drug-related prosecution against survivor\n\
Right to a sexual assault counselor\n\
Right to a sexual assault counselor held to minimum training standards\n\
Right to automatically summoned counselor before medical examination or law enforcement interview\n\
Right to maintain confidentiality and privilege for sexual assault counselor\n\
Right to have sexual assault counselor present during medical examination\n\
Right to have sexual assault counselor present during law enforcement interview\n")

#	for i in range(22):
#		masterf.write('\n')

# for x in states:
# 	f = open(x+".csv",'w')
# 	f.write(ex)
# 	f.close()

