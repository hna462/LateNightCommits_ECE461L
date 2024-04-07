class ProjectClass:
    def __init__(self, projectName, projectID, description, joinedList, capacity1, capacity2, availability1, availability2, projectDictionary):
        
        self.__projectDictionary = projectDictionary
        
        self.__projectID = projectID
        self.__projectName = projectName
        
        self.__userList = ['']
        if (joinedList != ['']):
            self.__userList = joinedList
        
        
        if (availability1 != capacity1):
            self.__availability1 = availability1
        else:
            self.__availability1 = capacity1

        if (availability2 != capacity2):
            self.__availability2 = availability2
        else:
            self.__availability2 = capacity2



        self.__capacity1 = capacity1
        self.__capacity2 = capacity2
        
        if len(description) == 0:
            self.__description = ["Enter Description Here"]
        else:
            self.__description = description

    def getDictionary(self):
        return self.__projectDictionary
    
    def editDictionary(self, userid, hwset, qty):
        self.__projectDictionary[userid][hwset] = qty
        

    def getProjectID (self):
        return self.__projectID
    
    def getProjectName (self):
        return self.__projectName
    
    def getProjectDescription(self):
        return self.__description
    
    def updateProjectDescription(self, newDescription):
        self.__description = newDescription
        return
    
    def getUserList(self):
        return self.__userList
    
    def addUserToUserList(self, userid):
        self.__userList.append(userid)
        return
    
    def removeUserFromUserList(self, userid):
        self.__userList.remove(userid)
        return

    def getCapacity1(self):
        return self.__capacity1
    
    def getCapacity2(self):
        return self.__capacity2
    
    def getAvailability1(self):
        return self.__availability1
    
    def getAvailability2(self):
        return self.__availability2
    

    def setAvailability1(self, qty):
        self.__availability1 = qty
        return

    def setAvailability2(self, qty):
        self.__availability2 = qty
        return


    def checkOutHardware(self, qty, hwSet, user):
        if (hwSet == 0):
            self.setAvailability1(str( int(self.getAvailability1())  - int(qty) ))
            currentAmount = dict(self.getDictionary())[user][hwSet]
            
            self.editDictionary(user, hwSet, (int(currentAmount) + int(qty)))
            return
                
        elif (hwSet == 1):
            
            self.setAvailability2((int(self.getAvailability2()) - int(qty)))
            currentAmount = dict(self.getDictionary())[user][hwSet]
            self.editDictionary(user, hwSet, (int(currentAmount) + int(qty)))
            return
                
        else:
            return None
            


    def checkInHardware(self, qty, hwSet, user):
        if (hwSet == 0):
            self.setAvailability1(str(int(self.getAvailability1()) + int(qty)))
            currentAmount = dict(self.getDictionary())[user][hwSet]
            self.editDictionary(user, hwSet, (int(currentAmount) - int(qty)))
            return
            
            
        elif (hwSet == 1):
            self.setAvailability2(str ( int( (self.getAvailability2())  + int( qty )) ) )
            currentAmount = dict(self.getDictionary())[user][hwSet]
            self.editDictionary(user, hwSet, (int(currentAmount) - int(qty)))
            return
            
        else:
            return None
        
    

