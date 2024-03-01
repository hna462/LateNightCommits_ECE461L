#projectname
#projectid
    #eventual check for used id
#description
#capacity (and thus availability)
#change project name
#change project description
#change projectid

class userProject:
    def __init__(self, inputProjectName, inputProjectID, inputProjectDescription, inputProjectCapacity):
        
        self.__projectName = inputProjectName

        if (inputProjectDescription != ""):
             self.__projectDescription = inputProjectDescription
        else:
            self.__projectDescription = "put the project description here"

        #function here to check if projectID has been used in database
        # ???should the setProjectID be its own function, like not initialized???
        self.__projectID = inputProjectID
        
        if (inputProjectCapacity != 0):
            self.__projectCapacity = inputProjectCapacity
        else:
            self.__projectCapacity = 0
        
        self.__joinedProjectUsers = [] #initially blank, list of userIDs of users joined project
        self.__requestedToJoinUsers = [] #initially blank, list of userIDs of users that requested to join project

    def changeProjectName(self, inName):
        self.__projectName = inName

    def changeProjectDescription(self, newProjectDesc):
        self.__projectDescription = newProjectDesc

    def updateCapacity(self, newCapacity):
        self.__projectCapacity = newCapacity

    def addUser(self, userName):
        self.__joinedProjectUsers.append(userName)
        self.__requestedToJoinUsers.remove(userName)

    def declineUser(self, userName):
        self.__requestedToJoinUsers.remove(userName)

    def changeProjectID(self, newProjectID):
        #if statement to check if newProjectID has been used in database list
        #if used return ERROR CODE
        #if not used, return
        return 0
    
    def requestToJoinProject(self, userName):
        if(userName not in self.__requestedToJoinUsers):
            self.__requestedToJoinUsers.append(userName)

    
    

            

        
        

    