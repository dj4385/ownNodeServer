const userDatabase = require('../db/userDB')

module.exports = {
    addUser : (userObj)=>{
        return userDatabase.userData.push(userObj)
    },
    searchUser : (userObj)=>{
        let isDataFound = 0
        if(userDatabase.userData.length > 0){
            userDatabase.userData.find(ele=>{
                if(ele.userID === userObj.userID){
                    isDataFound = 1;
                } else {
                    isDataFound = 0;
                }
            })
            if(isDataFound === 0){
                return false
            } else {
                return true
            }
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