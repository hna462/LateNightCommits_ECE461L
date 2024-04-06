class ProjectClass:
    def __init__(self, projectName, projectID, description, joinedList, capacity1, capacity2, availability1, availability2, ):
        
        

        self.__projectID = projectID
        self.__projectName = projectName
        
        self.__userList = []
        if (joinedList != []):
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


    def checkOutHardware(self, qty, hwSet):
        if (hwSet == 1):
            if qty > self.getAvailability1():
                return False
            else:
                self.setAvailability1(self.getAvailability1() - qty)
                return True
        elif (hwSet == 2):
            if qty > self.getAvailability2():
                return False
            else:
                self.setAvailability2((self.getAvailability2() - qty))
                return True


    def checkInHardware(self, qty, hwSet):
        if (hwSet == 1):
            cap = self.getCapacity1()
            if cap >= (self.getAvailability1() + qty):
                return False
            else:
                self.setAvailability1(self.getAvailability1() + qty)
                return True
            
        elif (hwSet == 2):
            cap = self.getCapacity2()
            if cap >= (self.getAvailability1() + qty):
                return False
            else:
                self.setAvailability2(self.getAvailability2() + qty)
                return True

