const fetch = require('node-fetch')
const extra = require('fs-extra')
const fs = require('fs')
const unzip = require("unzip-stream")
const { exec } = require('child_process');

fetch('http://idea.medeming.com/a/jihuoma1.zip',{
    method:"GET",
    header:{'Content-Type': 'application/octet-stream' },
}).then(res=>res.buffer()).then(_=>{
    fs.writeFile("./activationcode.zip",_,"binary",function (err){
        if (err) console.error(err);
        else {
            fs.createReadStream(`./activationcode.zip`).pipe(unzip.Extract({ path:`./activation` }))
        };
    })
    setTimeout(()=>{
        fs.readFile("./activation/2018.2之后的版本用这个.txt", "utf-8",(err,res)=>{
            if (err) {
                console.error(err)
                return
            }else{
                // 复制激活码到剪贴板
                exec(`echo ${res}| clip`,(error)=>{
                    if(error){
                        return
                    }else{
                        console.log('已复制激活码到剪贴板')
                        fs.unlinkSync('./activationcode.zip')
                        extra.remove('./activation')
                    }
                });
            }
        })
    },1500)

})
