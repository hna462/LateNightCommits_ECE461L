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
        return jsonify({"message": "Account with that Username cannot be found", "status": "fail"}), 401
        
    """
    if username in userNameList and userNameList[username] == password:
        userOnlineList.append(username)
        return jsonify({"message": "Login successful", "status": "success"})
    elif username in userOnlineList:
        return jsonify({"message": "User Already Online", "status": "fail"}), 409
    else:
        return jsonify({"message": "Invalid credentials", "status": "fail"}), 401
    """

#Routing For Logout    
@app.route('/logout', methods=['POST'])
def logout():
    username = request.json.get('username')
    if username in userOnlineList:
        userOnlineList.remove(username)
        return jsonify({"message": "Logout successful", "status": "success"}),3
    else:
        return jsonify({"message": "Somehow User Not Online", "status": "fail"}), 410
    

    
#Routing for Create New Account
special_characters = "!@#$%^&*()-+?_=,<>/"
@app.route('/createaccount', methods=['POST'])
def createaccount():
    username = request.json.get('enterUsername')
    userid = request.json.get('enterUserid')
    passwordFirst = request.json.get('enterPassword')
    passwordSecond = request.json.get('reEnterPassword')

    if any(c in special_characters for c in username or passwordFirst or passwordSecond):
        return jsonify({"otherMessage": "Username or password contains illegal characters. Try Again.", "status": "fail"}),402
    elif passwordFirst != passwordSecond:
        return jsonify({"otherMessage": "Password do not match. Try Again.", "status": "fail"}),403
    elif None is not MongoDB.findUser(userid):
        return jsonify({"otherMessage": "UserID already in use. Please try a different userID.", "status": "fail"}),404
    else:
        emptyProjects = []
        usersClassList.append(UserClass(username, userid, passwordFirst, emptyProjects))
        
        MongoDB.uploadNewUser(UserClass(username, userid, passwordFirst, emptyProjects))
        return jsonify({"otherMessage": "Created New Account Successfully", "status": "success"})
    
#Routing For Join Existing Project
@app.route('/home/joinProject', methods=['POST'])
def joinExistingProject():
    user = request.json.get('user')
    projectID = request.json.get('projectid')

#Routing For Create New Project
@app.route('/home/createProject', methods=['POST'])
def createNewProject():
    projectName = request.json.get('projectName')
    projectID = request.json.get('projectid')

        
##### SERVER START #####
if __name__ == '__main__':
    #initialize stuff in here
    
    

    app.run(debug=True)