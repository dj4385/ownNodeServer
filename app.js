const http = require('http'),
      fs = require('fs'),
      path = require('path'),
      url = require('url'),
      qString = require('querystring')

function serveStaticFile(req,res){
    if(req.url == '/'){
        serveFiles('/register.html', res)
    } else 
    if(isStatic(req.url)){
        serveFiles(req.url,res)
    } if(req.url === 'doRegister' && req.method == 'POST'){
        

    } if(req.url === 'doPost' && req.method == 'POST'){

    } else {
        res.write('<h1>Invalid request</h1>')
        res.end();
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
app.listen(3000,()=>console.log('server started'))