const express = require('express')
const app = express()
const cors = require('cors')
const port = 4006

const { exec } = require("child_process");

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Test GIT Deploy')
})

app.post('/git/webhooks/:appname',(req, res)=>{
   const data =  req.body;
   const appname = req.params['appname'];

   if(appname =='test-git-deploy'){
     RunActions();
   }

   return res.json('ok');
})


function RunActions(){
    const commands = ['git pull',
    'git status',
    'git submodule sync',
    'git submodule update',
    'git submodule status',
    // 'rm -rf ~/Desktop/target/*',
    'find ~/Desktop/target/* -delete',
    'cp -a ./source/ ~/Desktop/target/'];


    commands.forEach((value)=>{
        execCommand(value);
    })
}

function execCommand(cmd){
    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
}

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})