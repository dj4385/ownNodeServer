const http = require('http'),
      fs = require('fs'),
      path = require('path'),
      url = require('url'),
      qString = require('querystring'),
      userCtrl = require('./controllers/userCtrl'),
      userDb = require('./db/userDB'),
      userSchema = require('./models/userSchema')

function serveStaticFile(req,res){
    if(req.url == '/'){
        serveFiles('/register.html', res)
    } else if(isStatic(req.url)){
        serveFiles(req.url,res)
    } else if(req.url === '/doRegister' && req.method == 'POST'){
        var data = ''
        req.on('data',chunk=>{
            data += chunk
        })        
        req.on('end',()=>{
            var regDataObj = qString.parse(data)
            // var registerUser = new userSchema(regDataObj.userID,regDataObj.password,regDataObj.name,regDataObj.address,regDataObj.phoneNo)
            var searchResult = userCtrl.searchUser(regDataObj)
            console.log("Search",searchResult)
            if( searchResult == false){
                userCtrl.addUser(regDataObj)
                userDb.userData.forEach(ele=>{
                    console.log('Array is',ele)
                })
                res.setHeader('Content-type','text/html')
                res.write('User Register Successfully. <a href="login.html">Login Now</a>' )
                res.end()
            } else {
                res.write('User Already registered')
                res.end()
            }
        })
        req.on('error', err=>{
            res.write(err)
            res.end()
        })

    } else if(req.url === '/doLogin' && req.method == 'POST'){
        res.setHeader('Content-type','text/html')
        var loginData = ''
        req.on('data', chunk=>{
            loginData += chunk
        })
        req.on('end', ()=>{
            var loginObj = qString.parse(loginData)
            userDb.userData.filter(ele=>{
                if(ele.userID === loginObj.userID && ele.password === loginObj.password){
                    console.log(ele.userID)
                    res.write(`Welcome ${ele.userID}`)
                    res.write('<br><a href="updateUserInfo.html">Delete Account</a><br><a href="login.html">Logout</a>')
                    res.write(`<br><h3>Update Profiel</h3><br>
                    <form action="/doUpdate" method="POST">
                    <label for="">User ID</label><br>
                    <input type="text" name="userID" id="" value="${ele.userID}" readonly><br>
                    <label for="">Password</label><br>
                    <input type="password" name="password" id="" value="${ele.password}"><br>
                    <label for="">Full Name</label><br>
                    <input type="text" name="name" id="" value="${ele.name}"><br>
                    <label for="">Address</label><br>
                    <input type="text" name="address" id="" value="${ele.address}"><br>
                    <label for="">Contact Number</label><br>
                    <input type="text" name="phoneNo" id="" value="${ele.phoneNo}"><br>
                    <input type="submit" value="Update"/><br>
                </form>
                    `)
                } 
                // else {
                //     res.write('Invalid Login ID and password')
                // }
                res.end()
            })
        })
        req.on('error', err=>{
            res.write(err)
            res.end()
        })
    } else if(req.url === '/doUpdate' && req.method=='POST'){
        var updateData = ''
        res.setHeader('Content-type','text/html')
        req.on('data', chunk=>{
            updateData += chunk
        })
        req.on('end',()=>{

            var updateDataObj = qString.parse(updateData)
            var result = userCtrl.updateUser(updateDataObj)
            res.write('User Updated Successfully <a href="login.html">Login Again</a>')
            res.end()
        })
        req.on('error',err=>{
            res.write(err)
            res.end()
        })
    }
}

function serveFiles(uri, res){
    var staticFilePath = path.join(__dirname,'/public'+uri)
    fs.readFile(staticFilePath, (err,content)=>{
        if(err){
            res.write(err)
        } else {
            res.write(content)
        }
        res.end()
    })
}

function isStatic(uri){
    const fileExt = ['.html','.css','.js']
    var extName = path.extname(uri)
    return fileExt.indexOf(extName)>=0
}


const app = http.createServer(serveStaticFile)
app.listen(8000,()=>console.log('server started'))