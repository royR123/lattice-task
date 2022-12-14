const fs = require('fs');
const path = require('path');
const deleteFile = (req) => {
    try {
        console.log('in delete file');
        console.log(req.file.filename);
        console.log(__dirname);
        fs.unlink(path.join(__dirname,'../','images' , req.file.filename), (err) => {
            if(err)console.log(err);
            else console.log('file deleted');
        });
    } catch (error) {
        console.log(error);
    }
}

const validate = (req,res,next) => {
    const regExEmail = (/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/);
    const regExNumber = (/^[+]{0,1}[1-9]{1,3}[0-9]{10}$/)
    try {
        const { name , address , password , phone_no , email } = req.body;
        console.log(req.body);
        console.log(req.params)
        if(!email.match(regExEmail)){
            deleteFile(req);
            return res.status(400).json('Email is not valid')
        }
        if(!phone_no.match(regExNumber)){
            deleteFile(req);
            return res.status(400).json('number is not valid')
        }
        if(address.length < 10){
            deleteFile(req);
            return res.status(400).json('address is too small');
        }
        if(password.length < 8 || password.length > 15){
            deleteFile(req);
            return res.status(400).json("password length is not proper")
        }
        let upper = false;
        let lower = false; 
        let num = false;
        for(let i = 0 ; i < password.length ; i++){
            if(password[i] >= 'a' && password[i] <= 'z'){
                lower = true;
            }
            if(password[i] >= 'A' && password[i] <= 'Z'){
                upper = true;
            }
            if(password[i] >= '0' && password[i] <= '9'){
                num = true;
            }
        } 
        if(num && upper && lower){
            next();
        }else{
            deleteFile(req);
            return res.status(400).json("Your passsword must be contain atleast one number , one lowercase  and one uppercase alphabet")
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { validate } ;