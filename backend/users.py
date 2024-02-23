
class Users:

    def __init__(self):
        self.name = ""
        self.userID = None
        self.__password = ""
    
    def set_name(self, name):
        self.name = name

    def set_password(self, password):
        self.__password = password

    def get_name(self):
        return self.name
    
    def generateIDs(self):
        pass
    
    def get_userID(self):
        return self.userID