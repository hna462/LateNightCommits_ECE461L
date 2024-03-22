# users.py
# Assuming you have the encrypt function from cipher.py
from cipher import encrypt

class Users:

    def __init__(self):
        self.name = ""
        self.userID = None
        self.__password = ""
        self.__projectList = []
        self.__IDs = []
    
    def set_name(self, name):
        self.name = name
    
    def set_userID(self, ID):
        for i in range(len(self.__IDs)):
            if ID == self.__IDs[i]:
                return 0  # 0 means error
        self.userID = ID
        return 1

    def set_password(self, password, N, D):
        # Encrypt the password before storing it
        self.__password = encrypt(password, N, D)

    def get_name(self):
        return self.name

    def get_userID(self):
        return self.userID
    
    def get_projectList(self):
        return self.__projectList
    
    # Potentially add a method to verify the password if needed
