from flask import Flask, request, jsonify
from flask_cors import CORS
from ProjectClass import ProjectClass
from UserClass import UserClass
import MongoDB
import cipher

app = Flask(__name__)
CORS(app)

##### GLOBAL VARIABLES #####
usersClassList = []
userOnlineList = []
userNameList =  {}

projectsClassList = []
projectIDList = {}
##### ROUTING #####

n_Cipher = 3
d_Cipher = 1
    
#Routing For Login
@app.route('/login', methods=['POST'])
def login():
    
    username = request.json.get('username')
    userid = request.json.get('userid')
    password = request.json.get('password')
    
    if None is not MongoDB.findUser(userid):
        attemptUser = MongoDB.findUser(userid)
        if password == UserClass.getPassword(attemptUser):
            return jsonify({"message": "Login successful", "status": "success"})
        else:
            return jsonify({"message": "Incorrect Password. Please Try Again.", "status": "fail"}), 401
    else:
        return jsonify({"message": "Account with that Username cannot be found", "status": "fail"}), 402
        
  

#Routing For Logout    
@app.route('/logout', methods=['POST'])
def logout():
    username = request.json.get('username')
    if username in userOnlineList:
        userOnlineList.remove(username)
        return jsonify({"message": "Logout successful", "status": "success"})
    else:
        return jsonify({"message": "Somehow User Not Online", "status": "fail"}), 403
    

    
#Routing for Create New Account
special_characters = "!@#$%^&*()-+?_=,<>/:"
@app.route('/createaccount', methods=['POST'])
def createaccount():
    username = request.json.get('enterUsername')
    userid = request.json.get('enterUserid')
    passwordFirst = request.json.get('enterPassword')
    passwordSecond = request.json.get('reEnterPassword')
    print(username, userid, passwordFirst, passwordSecond)
    if any(c in special_characters for c in username):
        return jsonify({"otherMessage": "Username contains illegal character(s). Try Again.", "status": "fail"}),404
    elif any(c in special_characters for c in userid):
        return jsonify({"otherMessage": "UserID contains illegal character(s). Try Again.", "status": "fail"}),405
    elif any(c in special_characters for c in passwordFirst):
        return jsonify({"otherMessage": "Password contains illegal character(s). Try Again.", "status": "fail"}),406
    elif any(c in special_characters for c in passwordSecond):
        return jsonify({"otherMessage": "Password contains illegal character(s). Try Again.", "status": "fail"}),407
    elif passwordFirst != passwordSecond:
        return jsonify({"otherMessage": "Password do not match. Try Again.", "status": "fail"}),408
    elif None is not MongoDB.findUser(userid):
        return jsonify({"otherMessage": "UserID already in use. Please try a different userID.", "status": "fail"}),409
    elif ( (len(username) == 0) or (len(userid) == 0) or ( len(passwordFirst) == 0) or (len(passwordSecond) == 0)):
        return jsonify({"otherMessage": "Account creation fields cannot be blank. Try again.", "status": "fail"}),410
    else:
        emptyProjects = []
        currentClass = UserClass(username, userid, passwordFirst, emptyProjects)
        usersClassList.append(currentClass)
        MongoDB.uploadNewUser(currentClass)
        return jsonify({"otherMessage": "Created New Account Successfully", "status": "success"})


@app.route('/home/getProject', methods =['POST'])
def getProjectData():
    projectId = request.json.get('projectId')
    currentProject = MongoDB.findProject('projectID')
    
    projectName = currentProject.getProjectName()
    description = currentProject.getProjectDescription()
    projectUsers = currentProject.getUserList()
    totalCapacity1 = currentProject.getCapacity1()
    totalCapacity2 = currentProject.getCapacity2()
    capacityAvailable1 = currentProject.getAvailability1()
    capacityAvailable2 = currentProject.getAvailability2()
    
    data = {"Name":projectName,"Description":description,
                   "ProjectID":projectId,"Users":projectUsers,"Total Capacity 1":totalCapacity1,
                   "Capacity Available 1":capacityAvailable1, "Total Capacity 2":totalCapacity2,
                   "Capacity Available 2":capacityAvailable2}
    return jsonify(data)

#Routing For Join Existing Project
@app.route('/home/joinProject', methods=['POST'])
def joinExistingProject():
    user = request.json.get('userid')
    projectID = request.json.get('findProjectid')
    
    if MongoDB.findProject(projectID) is None:
        return jsonify({"message": "Project does not exist. Please try again", "status": "fail"}), 411
    project = MongoDB.findProject(projectID)
<<<<<<< HEAD
    #print(project.getUserList())
=======
>>>>>>> 10282dc6cc45777a4f48b74dd05ea1530dd7fc47
    if user in (project.getUserList()):
        return jsonify({"message": "Successfully Re-Joined Project.","projectName": project.getProjectName(),
                         "projectID": project.getProjectID(), "projectDescription": project.getProjectDescription(),
                           "capacity1": project.getCapacity1(), "capacity2":project.getCapacity2(),
                             "availability1": project.getAvailability1(), "availability2": project.getAvailability2(),
                               "userList": project.getUserList(),   "status": "success"})
    else:
        dic = dict(project.getDictionary())
        dic[user] = [0,0]
        MongoDB.updateProjectDictionary(project, dic)
        MongoDB.joinProject(MongoDB.findUser(user), project)
        return jsonify({"message": "Successfully Joined Project.","projectName": project.getProjectName(),
                         "projectID": project.getProjectID(), "projectDescription": project.getProjectDescription(),
                           "capacity1": project.getCapacity1(), "capacity2":project.getCapacity2(),
                             "availability1": project.getAvailability1(), "availability2": project.getAvailability2(),
                               "userList": project.getUserList(),  "status": "success"})

numberCharacters = "0123456789"
#Routing For Create New Project
@app.route('/home/createProject', methods=['POST'])
def createNewProject():
    projectName = request.json.get('projectName')
    projectID = request.json.get('projectId')
    projectDescription = request.json.get('projectDescription')
    hwSet1 = request.json.get('hwSet1')
    hwSet2 = request.json.get('hwSet2')
    creatingUser = request.json.get('userid')
    currentUser = MongoDB.findUser(creatingUser)
    projectDictionary = {creatingUser: [0, 0]}
<<<<<<< HEAD
    
    if (MongoDB.findProject(projectID) is not None):
         return jsonify({"message": "ProjectID already in use", "status": "fail"}), 415
    elif ( (len(projectName) == 0) or (len(projectID) == 0)  or (len(projectDescription) == 0) ):
        return jsonify({"message": "Project Creation Fields cannot be blank. Please try again.", "status": "fail"}), 412
    elif any(c in special_characters for c in projectName):
        return jsonify({"message": "Project Field(s) contains illegal character. Please try again.", "status": "fail"}), 413
    elif any(c in special_characters for c in projectID):
        return jsonify({"message": "Project Field(s) contains illegal character. Please try again.", "status": "fail"}), 418
    elif any(c in special_characters for c in projectDescription):
        return jsonify({"message": "Project Field(s) contains illegal character. Please try again.", "status": "fail"}), 419
    elif ((len(hwSet1) == 0)  or (len(hwSet2) == 0)) :
         return jsonify({"message": "Hardware Set capacities must be numbers. Please try again.", "status": "fail"}), 414
    elif ((int(hwSet1) <= 0)  or (int(hwSet2) <= 0)) :
         return jsonify({"message": "Hardware Set capacities must be positive.", "status": "fail"}), 417
    else:
        project = ProjectClass(projectName, projectID, projectDescription, [], str(hwSet1), str(hwSet2), str(hwSet1), str(hwSet2), projectDictionary)
        MongoDB.uploadNewProject(project)
        MongoDB.joinProject(currentUser, project)
        return jsonify({"message": "Created New Project Successfully", "projectName": project.getProjectName(),
                         "projectID": project.getProjectID(), "projectDescription": project.getProjectDescription(),
                           "capacity1": project.getCapacity1(), "capacity2":project.getCapacity2(),
                             "availability1": project.getAvailability1(), "availability2": project.getAvailability2(),
                               "userList": project.getUserList(),  "status": "success"})
    
#Routing For Project Refresh
@app.route('/home/ProjectRefresh', methods = ['POST'])
def refreshProject():
    projectId = request.json.get('findProjectid')
    user = request.json.get('userid')
    project = MongoDB.findProject(projectId)
    return jsonify({"message": "Successfully Refreshed Project", "projectName": project.getProjectName(),
                         "projectID": project.getProjectID(), "projectDescription": project.getProjectDescription(),
                           "capacity1": project.getCapacity1(), "capacity2":project.getCapacity2(),
                             "availability1": project.getAvailability1(), "availability2": project.getAvailability2(),
                               "userList": project.getUserList(),  "status": "success"})
    
#Routing For HWSet1 Check In
@app.route('/home/checkinhwset1', methods = ['POST'])
def checkInHWSet1():
    amount = request.json.get('inputHardwareNumberOne')
    userid = request.json.get('userid')
    projectID = request.json.get('displayProjectId')
    project = MongoDB.findProject(projectID)
    spot = dict(project.getDictionary())
    place = spot[userid]
    number = place[0]
    

    if (int(amount) > int(number)):
        return jsonify({"message": "You cannot check in more than you checked out.", "status": "fail"}), 420
    elif (int(amount) <= 0):
        return jsonify({"message": "Number must be positive.", "status": "fail"}), 421
    elif (int(amount) <= int(number)):
        project.checkInHardware(amount, 0, userid) # 0 means HWSet1
        MongoDB.updateProjectDictionary(project, project.getDictionary())
        MongoDB.updateProjectAvailability1(project, project.getAvailability1())
        return jsonify({"message": "Successfully checked units into HWSet1", "availability": project.getAvailability1(), "status": "success"})
    else:
        return jsonify({"message": "Some other error has occurred", "status": "fail"}), 424

    
@app.route('/home/checkouthwset1', methods = ['POST'])
def checkOutHWSet1():
    amount = request.json.get('inputHardwareNumberOne')
    userid = request.json.get('userid')
    projectID = request.json.get('displayProjectId')
    
    project = (MongoDB.findProject(projectID))
    hardware_log = dict(project.getDictionary())
    log_info = hardware_log[userid]
    
    
    
=======
    
    if (MongoDB.findProject(projectID) is not None):
         return jsonify({"message": "ProjectID already in use", "status": "fail"}), 415
    elif ( (len(projectName) == 0) or (len(projectID) == 0)  or (len(projectDescription) == 0) ):
        return jsonify({"message": "Project Creation Fields cannot be blank. Please try again.", "status": "fail"}), 412
    elif any(c in special_characters for c in projectName):
        return jsonify({"message": "Project Field(s) contains illegal character. Please try again.", "status": "fail"}), 413
    elif any(c in special_characters for c in projectID):
        return jsonify({"message": "Project Field(s) contains illegal character. Please try again.", "status": "fail"}), 418
    elif any(c in special_characters for c in projectDescription):
        return jsonify({"message": "Project Field(s) contains illegal character. Please try again.", "status": "fail"}), 419
    elif ((len(hwSet1) == 0)  or (len(hwSet2) == 0)) :
         return jsonify({"message": "Hardware Set capacities must be numbers. Please try again.", "status": "fail"}), 414
    elif ((int(hwSet1) <= 0)  or (int(hwSet2) <= 0)) :
         return jsonify({"message": "Hardware Set capacities must be positive.", "status": "fail"}), 417
    else:
        project = ProjectClass(projectName, projectID, projectDescription, [], str(hwSet1), str(hwSet2), str(hwSet1), str(hwSet2), projectDictionary)
        MongoDB.uploadNewProject(project)
        MongoDB.joinProject(currentUser, project)
        return jsonify({"message": "Created New Project Successfully", "projectName": project.getProjectName(),
                         "projectID": project.getProjectID(), "projectDescription": project.getProjectDescription(),
                           "capacity1": project.getCapacity1(), "capacity2":project.getCapacity2(),
                             "availability1": project.getAvailability1(), "availability2": project.getAvailability2(),
                               "userList": project.getUserList(),  "status": "success"})
    
#Routing For Project Refresh
@app.route('/home/ProjectRefresh', methods = ['POST'])
def refreshProject():
    projectId = request.json.get('findProjectid')
    user = request.json.get('userid')
    project = MongoDB.findProject(projectId)
    return jsonify({"message": "Successfully Refreshed Project", "projectName": project.getProjectName(),
                         "projectID": project.getProjectID(), "projectDescription": project.getProjectDescription(),
                           "capacity1": project.getCapacity1(), "capacity2":project.getCapacity2(),
                             "availability1": project.getAvailability1(), "availability2": project.getAvailability2(),
                               "userList": project.getUserList(),  "status": "success"})
    
#Routing For HWSet1 Check In
@app.route('/home/checkinhwset1', methods = ['POST'])
def checkInHWSet1():
    amount = request.json.get('inputHardwareNumberOne')
    userid = request.json.get('userid')
    projectID = request.json.get('displayProjectId')
    project = MongoDB.findProject(projectID)
    spot = dict(project.getDictionary())
    place = spot[userid]
    number = place[0]
    

    if (int(amount) > int(number)):
        return jsonify({"message": "You cannot check in more than you checked out.", "status": "fail"}), 420
    elif (int(amount) <= 0):
        return jsonify({"message": "Number must be positive.", "status": "fail"}), 421
    elif (int(amount) <= int(number)):
        project.checkInHardware(amount, 0, userid) # 0 means HWSet1
        MongoDB.updateProjectDictionary(project, project.getDictionary())
        MongoDB.updateProjectAvailability1(project, project.getAvailability1())
        return jsonify({"message": "Successfully checked units into HWSet1", "availability": project.getAvailability1(), "status": "success"})
    else:
        return jsonify({"message": "Some other error has occurred", "status": "fail"}), 424

    
@app.route('/home/checkouthwset1', methods = ['POST'])
def checkOutHWSet1():
    amount = request.json.get('inputHardwareNumberOne')
    userid = request.json.get('userid')
    projectID = request.json.get('displayProjectId')
    
    project = (MongoDB.findProject(projectID))
    hardware_log = dict(project.getDictionary())
    log_info = hardware_log[userid]
    
    
    
>>>>>>> 10282dc6cc45777a4f48b74dd05ea1530dd7fc47
    
    if ( int(amount) > int(project.getAvailability1()) ):
        return jsonify({"message": "Cannot check out more than what is available. Perhaps refresh project.", "status": "fail"}), 422
    elif (int(amount) <= 0):
        return jsonify({"message": "Number must be positive.", "status": "fail"}), 423
    elif (int(amount) <= int(project.getAvailability1())):
        project.checkOutHardware(amount, 0, userid)
        MongoDB.updateProjectDictionary(project, project.getDictionary())
        MongoDB.updateProjectAvailability1(project, project.getAvailability1())
        return jsonify({"message": "Successfully checked units out of HWSet1", "availability": project.getAvailability1(), "status": "success"})
    else:
        return jsonify({"message": "Some other error has occurred", "status": "fail"}), 424
    
#Routing For HWSet2 Check In
@app.route('/home/checkinhwset2', methods = ['POST'])
def checkInHWSet2():
    amount = request.json.get('inputHardwareNumberTwo')
    userid = request.json.get('userid')
    projectID = request.json.get('displayProjectId')
    project = MongoDB.findProject(projectID)
    spot = dict(project.getDictionary())
    place = spot[userid]
    number = place[1]
    
<<<<<<< HEAD
    if(amount == ""):
      amount = 0
=======

>>>>>>> 10282dc6cc45777a4f48b74dd05ea1530dd7fc47
    if (int(amount) > int(number)):
        return jsonify({"message": "You cannot check in more than you checked out.", "status": "fail"}), 420
    elif (int(amount) <= 0):
        return jsonify({"message": "Number must be positive.", "status": "fail"}), 421
    elif (int(amount) <= int(number)):
        project.checkInHardware(amount, 1, userid) # 0 means HWSet1
        MongoDB.updateProjectDictionary(project, project.getDictionary())
<<<<<<< HEAD
        MongoDB.updateProjectAvailability2(project, project.getAvailability2())
=======
        MongoDB.updateProjectAvailability1(project, project.getAvailability2())
>>>>>>> 10282dc6cc45777a4f48b74dd05ea1530dd7fc47
        return jsonify({"message": "Successfully checked units into HWSet2", "availability": project.getAvailability2(), "status": "success"})
    else:
        return jsonify({"message": "Some other error has occurred", "status": "fail"}), 424

    
@app.route('/home/checkouthwset2', methods = ['POST'])
def checkOutHWSet2():
    amount = request.json.get('inputHardwareNumberTwo')
    userid = request.json.get('userid')
    projectID = request.json.get('displayProjectId')
    
    project = (MongoDB.findProject(projectID))
    hardware_log = dict(project.getDictionary())
    log_info = hardware_log[userid]
    
    
<<<<<<< HEAD
    if(amount == ""):
      amount = 0
=======
    
    
>>>>>>> 10282dc6cc45777a4f48b74dd05ea1530dd7fc47
    if (int(amount) > int(project.getAvailability2())):
        return jsonify({"message": "Cannot check out more than what is available. Perhaps refresh project.", "status": "fail"}), 422
    elif (int(amount) <= 0):
        return jsonify({"message": "Number must be positive.", "status": "fail"}), 423
    elif (int(amount) <= int(project.getAvailability2())):
        project.checkOutHardware(amount, 1, userid)
        MongoDB.updateProjectDictionary(project, project.getDictionary())
        MongoDB.updateProjectAvailability2(project, project.getAvailability2())
<<<<<<< HEAD
        return jsonify({"message": "Successfully checked units out of HWSet2", "availability": project.getAvailability2(), "status": "success"})
    else:
        return jsonify({"message": "Some other error has occurred", "status": "fail"}), 424

@app.route('/home/getProjectIDs', methods = ['POST'])        
def getProjectIDs():
  userID = request.json.get('userid')
  user = MongoDB.findUser(userID)
  projectIDs = user.getProjects()
  return projectIDs
=======
        return jsonify({"message": "Successfully checked units out of HWSet1", "availability": project.getAvailability2(), "status": "success"})
    else:
        return jsonify({"message": "Some other error has occurred", "status": "fail"}), 424
        
>>>>>>> 10282dc6cc45777a4f48b74dd05ea1530dd7fc47
##### SERVER START #####
if __name__ == '__main__':
    #initialize stuff in here
    
    

    app.run(debug=True)