from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

import UserClass
import ProjectClass
import certifi

uri = "mongodb+srv://admin:2Dumb2Live%21@cluster0.od1dgod.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
ca = certifi.where() #certificate 
    # Set the Stable API version when creating a new client
client = MongoClient(uri, tlsCAFile = ca)


# Set the Stable API version when creating a new client

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

def uploadNewUser(newUser: UserClass.UserClass): #uploads a User into the database
    username = newUser.getUsername()
    password = newUser.getPassword()
    userID = newUser.getUserid()
    projectList = newUser.getProjects()
    userJson = {"Username":username,"Password":password,"Projects":projectList,"UserID":userID}
    uploadNewData("Data", "Users", userJson)
    

def uploadNewProject(newProject: ProjectClass.ProjectClass): #uploads a Project into the database
    projectName = newProject.getProjectName()
    projectID = newProject.getProjectID()
    description = newProject.getProjectDescription()
    projectUsers = newProject.getUserList()
    projectName = newProject.getProjectName()
    totalCapacity1 = newProject.getCapacity1()
    capacityAvailable1 = newProject.getAvailability1()

    totalCapacity2 = newProject.getCapacity2()
    capacityAvailable2 = newProject.getAvailability2()
    
    projectJson = {"Name":projectName,"Description":description,
                   "ProjectID":projectID,"Users":projectUsers,"Total Capacity 1":totalCapacity1,
                   "Capacity Available 1":capacityAvailable1, "Total Capacity 2":totalCapacity2,
                   "Capacity Available 2":capacityAvailable2,}
    
    uploadNewData("Data", "Projects", projectJson)


def updateUserProjects(updatedUser: UserClass.UserClass):
    filter = {"UserID": updatedUser.getUserid()}
    updateInput = {"$set":{
        "Users": updatedUser.getProjects()
    }}
    updateData("Data", "Users", filter, updateInput)

def updateProjectUsers(updatedProject: ProjectClass.ProjectClass):
    filter = {"ProjectID": updatedProject.get()}
    updateInput = {"$set":{
        "Projects": updatedProject.getUserList()
    }}
    updateData("Data", "Users", filter, updateInput)


def findUser(userID:str): #returns the str. Returns None if there is no such project
    userDict = getItem("Data", "Users", "UserID", userID)
    if(userDict != None):
        username = userDict["Username"]
        password = userDict["Password"]
        projects = userDict["Projects"]
        userID = userDict["UserID"]
        
        foundUser = UserClass.UserClass(username, userID, password, projects)
        return foundUser
    else:
        return None
       
def findProject(projectID:str): #returns the project data with the ID as a Project class. Returns None if there is no such project
    projectDict = getItem("Data", "Projects", "ProjectID", projectID)
    if(projectDict != None):
        
        username = projectDict["Username"]
        description = projectDict["Description"]
        projectID = projectDict["ProjectID"]
        projectUsers = projectDict["Users"]
        totalCapacity1 = projectDict["Total Capacity 1"]
        capacityAvailable1 = projectDict["Capacity Available 1"]
        totalCapacity2 = projectDict["Total Capacity 2"]
        capacityAvailable2 = projectDict["Capacity Available 2"]
        
        foundProject = ProjectClass.ProjectClass(username, description, projectID, projectUsers, totalCapacity1, capacityAvailable1, totalCapacity2, capacityAvailable2)
        return foundProject
    else:
        return None   

def userIDIsFree(userID: int):
    return (getItem("Data", "Users", "UserID", userID) == None)
    
def createNewUserAttempt(newUser: UserClass.UserClass): #attempts to make a new user with the given parameters. Returns 1 if successful 0 if the projectID is already used
    newID =  newUser.getUserid
    if(userIDIsFree(newID)):
        uploadNewUser(newUser)
        return 1
    else:
        return 0
    
def projectIDIsFree(projectID: int):
    return (getItem("Data", "Users", "ProjectID", projectID) == None)
    
def createNewProjectAttempt(newProject: ProjectClass.ProjectClass): #attempts to make a new project with the given parameters. Returns 1 if successful 0 if the projectID is already used
    newID = newProject.getProjectID
    if(projectIDIsFree(newID)):
        uploadNewProject(newProject)
        return 1
    else:
        return 0

def joinProject(joiningUser: UserClass.UserClass, projectJoined: ProjectClass.ProjectClass):
    joiningUser.addProjectToUserProjectList(projectJoined.getProjectID)
    projectJoined.addUserToUserList(joiningUser.getUserid)
    updateUserProjects(joiningUser)
    updateProjectUsers(projectJoined)

def leaveProject(leavingUser: UserClass.UserClass, projectLeft: ProjectClass.ProjectClass):
    leavingUser.removeProjectFromUserProjectList(projectLeft.getProjectID)
    projectLeft.removeUserFromUserList(leavingUser.getUserid)
    updateUserProjects(leavingUser)
    updateProjectUsers(projectLeft) 
    

