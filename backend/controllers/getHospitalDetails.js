const { db } = require('../config/db');

const getHospitalDetails = (req,res) => {
    try {
        db.query('select count(id) as psychiatrist_count , sum(patient_count) as patient_count , temp.hospital_name  from (select t2.name as hospital_name , t1.* from healthcare.psychiatrists as t1 inner join healthcare.hospitals as t2 on t1.hospital_id = t2.id) as temp where temp.hospital_id = ? group by temp.hospital_id ; ',[req.params.hospitalId],(err,data) => {
            if(err)return res.status(400).json(err);
            console.log(data);
            if(data.length === 0)return res.status(400).json('such hospital not exist');
            db.query('select id , name , patient_count from healthcare.psychiatrists where hospital_id = ?',[req.params.hospitalId],(err,data1) => {
                if(err)return res.status(400).json(err);
                return res.status(200).json({...data[0],psychiatrist_details : data1})
                // return res.json(data1);

            });
        })
    } catch (error) {
        
    }
}

module.exports = getHospitalDetails;