# user.py
# Assuming you have the encrypt function from cipher.py
from cipher import encrypt

class User:

    def __init__(self, name:str="", userID:int=None, password:str="", projectList:list=[]):
        self.name = name
        self.userID = userID
        self.__password = password
        self.__projectList = projectList
        self.__IDs = []
    
    def set_name(self, name:str):
        self.name = name
    
    def set_userID(self, ID:int):
        #for i in range(len(self.__IDs)):
        #    if ID == self.__IDs[i]:
        #        return 0  # 0 means error
        self.userID = ID
        #return 1

    def set_password(self, password:str, N:int, D:int):
        # Encrypt the password before storing it
        self.__password = encrypt(password, N, D)
        
    def set_projects(self, projects:list):
        self.__projectList = projects
        
    def join_project(self, newProjectID:int): #returns 1 if project was joined successfully, 0 if unsucessfull
        for projectID in self.__projectList:
            if(newProjectID == projectID):
                return 0 #the user is already in the project
        self.__projectList.append(newProjectID)
        return 1 #the project was added successfully
            
        

    def get_name(self):
        return self.name

    def get_userID(self):
        return self.userID
    
    def get_projectList(self):
        return self.__projectList
    
    def get_password(self):
        return self.__password
    
    # Potentially add a method to verify the password if needed
