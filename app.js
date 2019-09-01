const http = require('http'),
      fs = require('fs'),
      path = require('path'),
      url = require('url'),
      qString = require('querystring'),
      userCtrl = require('./controllers/userCtrl'),
      userDb = require('./db/userDB')

function serveStaticFile(req,res){
    if(req.url == '/'){
        serveFiles('/register.html', res)
    } else 
    if(isStatic(req.url)){
        serveFiles(req.url,res)
    } if(req.url === '/doRegister' && req.method == 'POST'){
        var data = ''
        req.on('data',chunk=>{
            data += chunk
        })        
        req.on('end',()=>{
            var regDataObj = qString.parse(data)
            if(userCtrl.searchUser(regDataObj) != null){
                res.write('User Already registered')
                res.end()
            } else {
                userCtrl.addUser(regDataObj)
                userDb.userData.forEach(ele=>{
                    console.log('Array is',ele)
                })
                res.write('User Register Successfully' )
                res.end()
            }
        })
        req.on('error', err=>{
            res.write(err)
            res.end()
        })

    } if(req.url === '/doLogin' && req.method == 'POST'){
        var loginData = ''
        req.on('data', chunk=>{
            loginData += chunk
        })
        req.on('end', ()=>{
            var loginObj = qString.parse(loginData)
            console.log(loginObj)
        })
        req.on('error', err=>{
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