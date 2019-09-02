const userDatabase = require('../db/userDB')

module.exports = {
    addUser : (userObj)=>{
        return userDatabase.userData.push(userObj)
    },
    searchUser : (userObj)=>{
        if(userDatabase.userData.length > 0){
            userDatabase.userData.find(ele=>{
                if(ele.userID === userObj.userID){
                    return true;
                } else {
                    return false;
                }
            })
        } else {
            return false
        }
    },
    deleteUser : ()=>{

    },
    updateUser : ()=>{
        
    }
}