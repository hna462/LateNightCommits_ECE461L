from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from urllib.parse import quote_plus
import certifi
import user
import project


password = quote_plus('2Dumb2Live!')
uri = "mongodb+srv://admin:" + password +"@cluster0.od1dgod.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

ca = certifi.where() #certificate 
# Set the Stable API version when creating a new client
client = MongoClient(uri, tlsCAFile = ca)

cipherN = 3
cipherD = 1

def getDatabase(database):
    return client[database]

def getCollection(database, collection): #This will create a collection if it does not exist
    return client[database][collection]

def uploadNewData(database, collection, data):
    client[database][collection].insert_one(data)

def getItem(database, collection, field, data): #gets the first instance of an item in a with specifc data in a field
    query = {field: data}
    return client[database][collection].find_one(query)

def uploadNewUser(newUser: user.User): #uploads a User into the database
    username = newUser.get_name()
    password = newUser.get_password()
    userID = newUser.get_userID()
    projectList = newUser.get_projectList()
    userJson = {"Username":username,"Password":password,"Projects":projectList,"UserID":{"$numberInt":userID}}
    uploadNewData("Data", "Users", userJson)
    

def uploadNewProject(newProject: project.Project): #uploads a Project into the database
    projectName = newProject.get_name()
    projectID = newProject.get_projectID()
    description = newProject.get_description()
    hardware = newProject.get_hardwareSets()
    totalCapacity = newProject.get_totalCapacity()
    capacityAvailable = newProject.get_capacityAvailable()
    projectUsers = newProject.get_users()
    projectJson = {"Name":projectName,"Description":description,
                   "ProjectID":{"$numberInt":projectID},"Users":projectUsers,"Hardware Sets":hardware,"Total Capacity":totalCapacity,
                   "Capacity Available":capacityAvailable}
    
    uploadNewData("Data", "Projects", projectJson)

def findUser(userID): #returns the user data with the ID
    return getItem("Data", "Users", "UserID", userID)
    
    
def findProject(projectID): #returns the project data with the ID
    return getItem("Data","Projects","ProjectID", projectID)

users = [777]
testProject = project.Project("Project 7", "Basic Description", 7, users)

# Send a ping to confirm a successful connection
try:
    uploadNewProject(testProject)
except Exception as e:
    print(e)