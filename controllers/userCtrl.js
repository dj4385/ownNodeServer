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
    updateUser : (updateObjData)=>{
        if(userDatabase.userData.length > 0){
            userDatabase.userData.filter(ele=>{
                if(ele.userID === updateObjData.userID){
                    ele.password = updateObjData.password
                    ele.name = updateObjData.name
                    ele.address = updateObjData.address
                    ele.phoneNo = updateObjData.phoneNo
                    return 'Data updated'
                }
            })
        } else {
            return 'Database is empty'
        }
    }
}