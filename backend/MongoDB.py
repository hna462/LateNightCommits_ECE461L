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

def updateData(database,collection, filter, update):
    client[database][collection].update_one(filter, update)

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
    userJson = {"Username":username,"Password":password,"Projects":projectList,"UserID":userID}
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
                   "ProjectID":projectID,"Users":projectUsers,"Hardware Sets":hardware,"Total Capacity":totalCapacity,
                   "Capacity Available":capacityAvailable}
    
    uploadNewData("Data", "Projects", projectJson)


def updateUserProjects(updatedUser: user.User):
    filter = {"UserID": updatedUser.get_userID()}
    updateInput = {"$set":{
        "Projects": updatedUser.get_projectList()
    }}
    updateData("Data", "Users", filter, updateInput)

def updateProjectUsers(updatedProject: project.Project):
    return False

def findUser(userID:int): #returns the user with the ID as a User class. Returns None if there is no such project
    userDict = getItem("Data", "Users", "UserID", userID)
    if(userDict != None):
        username = userDict["Username"]
        password = userDict["Password"]
        projects = userDict["Projects"]
        userID = userDict["UserID"]
        
        foundUser = user.User(username, userID, password, projects)
        return foundUser
    else:
        return None
       
def findProject(projectID:int): #returns the project data with the ID as a Project class. Returns None if there is no such project
    projectDict = getItem("Data", "Projects", "ProjectID", projectID)
    if(projectDict != None):
        
        username = projectDict["Username"]
        description = projectDict["Description"]
        projectID = projectDict["ProjectID"]
        projectUsers = projectDict["Users"]
        hardware = projectDict["Hardware Sets"]
        totalCapacity = projectDict["Total Capacity"]
        capacityAvailable = projectDict["capacityAvailable"]
        
        foundProject = project.Project(username, description, projectID, projectUsers, hardware, totalCapacity, capacityAvailable)
        return foundProject
    else:
        return None   

def userIDIsFree(userID: int):
    return (getItem("Data", "Users", "UserID", userID) == None)
    
def createNewUserAttempt(newUser: user.User): #attempts to make a new user with the given parameters. Returns 1 if successful 0 if the projectID is already used
    newID =  newUser.get_userID
    if(userIDIsFree(newID)):
        uploadNewUser(newUser)
        return 1
    else:
        return 0

def projectIDIsFree(projectID: int):
    return (getItem("Data", "Users", "ProjectID", projectID) == None)
    
def createNewProjectAttempt(newProject: project.Project): #attempts to make a new project with the given parameters. Returns 1 if successful 0 if the projectID is already used
    newID = newProject.get_projectID
    if(projectIDIsFree(newID)):
        uploadNewProject(newProject)
        return 1
    else:
        return 0

def joinProject(joiningUser: user.User, projectJoined: project.Project):
    userSuccess = joiningUser.join_project(projectJoined.get_projectID)
    projectSuccess = projectJoined.add_user(joiningUser.get_userID)
    if(userSuccess == 1 and projectSuccess == 1):
        
        return 1
    return 0

# Send a ping to confirm a successful connection
try:
    mysteryUser = findUser(777)
    mysteryUser.set_projects = [2, 3]
    updateUserProjects(mysteryUser)
    didUpdate = findUser(777)
    print(didUpdate.get_projectList())
except Exception as e:
    print(e)