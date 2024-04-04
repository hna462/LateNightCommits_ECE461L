class Project:
    def __init__(self, name:str="", description:str="", projectID:int=None, usersList:list=[],
                 hardwareSets:list=["HWSet1", "HWSet2"], totalCapacity:list=[100, 100], capacityAvailable:list=[100, 100]):
        self.name = name
        self.description = description
        self.__projectID = projectID
        self.__usersList = usersList
        self.__hardwareSets = hardwareSets
        self.__totalCapacity = totalCapacity
        self.__capacityAvailable = capacityAvailable
    
    def set_name(self, name:str):
        self.name = name
    
    def set_description(self, description:str):
        self.description = description
    
    def set_projectID(self, projectID:int):
        #for i in range(len(self.__IDs)):
        #    if ID == self.__IDs[i]:
        #        return 0  # 0 means error
        self.__projectID = projectID
        #return 1
        
    def set_users(self, usersList:list):
        self.__usersList = usersList
        
    def set_hardwareSets(self, hardwareSets:list):
        self.__hardwareSets = hardwareSets
        
    def set_totalCapacity(self, totalCapacity:int):
        self.__totalCapacity = totalCapacity
    
    def set_capacityAvailable(self, capacityAvailable:int):
        self.__capacityAvailable = capacityAvailable

    def add_User(self, newUserID:int): #returns a 1 if successful or a 0 otherwise
        for userID in self.__usersList:
            if(newUserID == userID):
                return 0 #the user is already in the project
        self.__usersList.append(newUserID)
        return 1 #the user has been successfully added

    def get_name(self):
        return self.name
    
    def get_description(self):
        return self.description
    
    def get_projectID(self):
        #for i in range(len(self.__IDs)):
        #    if ID == self.__IDs[i]:
        #        return 0  # 0 means error
        return self.__projectID
        #return 1
        
    def get_users(self):
        # Encrypt the password before storing it
        return self.__usersList
        
    def get_hardwareSets(self):
        return self.__hardwareSets
        
    def get_totalCapacity(self):
        return self.__totalCapacity
    
    def get_capacityAvailable(self):
        return self.__capacityAvailable
    
    # Potentially add a method to verify the password if needed
