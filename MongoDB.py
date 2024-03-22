from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from urllib.parse import quote_plus
import certifi

password = quote_plus('2Dumb2Live!')
uri = "mongodb+srv://admin:" + password +"@cluster0.od1dgod.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

ca = certifi.where() #certificate 
# Set the Stable API version when creating a new client
client = MongoClient(uri, tlsCAFile = ca)

def getDatabase(database):
    return client[database]

def getCollection(database, collection): #This will create a collection if it does not exist
    return client[database][collection]

def uploadNewData(database, collection, data):
    client[database][collection].insert_one(data)

def getItem(database, collection, field, data): #gets the first instance of an item in a with specifc data in a field
    query = {field: data}
    return client[database][collection].find_one(query)

def uploadNewUser(userData):
    uploadNewData("Data", "Users", userData)

def uploadNewProject(projectData):
    uploadNewData("Data", "Projects", projectData)

def findUser(userID): #returns the user data with the ID
    return getItem("Data", "Users", "UserID", userID)
    
    
def findProject(projectID): #returns the project data with the ID
    return getItem("Data","Projects","ProjectID", projectID)
        


# Send a ping to confirm a successful connection
try:
    testProject = findUser(0)
    print(testProject)
except Exception as e:
    print(e)