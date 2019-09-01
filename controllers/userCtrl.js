const userDatabase = require('../db/userDB')

module.exports = {
    addUser : (userObj)=>{
        return userDatabase.userData.push(userObj)
    },
    searchUser : (userObj)=>{
        userDatabase.userData.find(ele=>{
            if(ele.userID === userObj.userID){
                return ele;
            } else {
                return null;
            }
        })
    },
    deleteUser : ()=>{

    },
    updateUser : ()=>{
        
    }
}