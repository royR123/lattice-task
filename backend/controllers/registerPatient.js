const { db } = require('../config/db');

const registerPatient = (req,res) => {
    try {
            console.log(req.params);
           const q = "INSERT INTO patients (`name` , `address` , `email` , `password` , `photo` , `psychiatrist_id`, `hospital_id` , `phone_no`) VALUES (?)";
           const { name, address, hospital_id, password, phone_no, email } = req.body;
           const photo = req.file.filename;
           const values = [
               name,
               address,
               email,
               password,
               photo,
               req.params.psychiatristId,
               hospital_id,
               phone_no
   
           ]
           db.query(q, [values], (err, data) => {
               if (err) return res.status(400).json(err);
                db.query('UPDATE psychiatrists SET patient_count = patient_count+1 WHERE id = ?' , [req.params.psychiatristId] , (err,data)=>{
                    if(err)console.log(err);
                    else console.log(data);
                })
               return res.status(200).json(data);
           })
       } catch (error) {
           res.status(500).json(error);
       }

} 

module.exports = registerPatient;