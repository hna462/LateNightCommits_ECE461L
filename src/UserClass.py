class UserClass:
    def __init__ (self, username, userid, password, projects):
        self.__username = username
        self.__userid = userid
        self.__password = password
        self.__projectList = []
        if (projects != []):
            self.__projectList = projects
        
        
    def getUsername(self):
        return self.__username
    
    def getUserid(self):
        return self.__userid
    
    def getPassword(self):
        return self.__password
    
    def addProjectToUserProjectList(self, projectID):
        self.__projectList.append(projectID)

    def removeProjectFromUserProjectList(self, projectID):
        self.__projectList.remove(projectID)

    def getProjects(self):
        return self.__projectList
    
    def setProjects(self, newProjectList):
        self.__projectList = newProjectList

    
    
