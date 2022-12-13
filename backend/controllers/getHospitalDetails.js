const { db } = require('../config/db');

const getHospitalDetails = (req,res) => {
    try {
        db.query('SELECT name from hospitals where id = ?',[req.params.hospitalId],(err,data) => {
            if(err)return res.status(400).json(err);
            if(data.length === 0)return res.status(400).json(`No hospital with id = ${req.params.hospitalId}`);
            db.query('SELECT count(name) AS psychiatrist_count , sum(patient_count) AS patient_count from psychiatrists WHERE hospital_id = ? GROUP BY hospital_id ',[req.params.hospitalId] , (err,data1) => {
                if(err)return res.status(400).json(err);
                db.query('SELECT id , name , patient_count FROM psychiatrists WHERE hospital_id = ?' , [req.params.hospitalId] , (err,data2) => {
                    if(err)return res.status(400).json(err);
                    return res.status(200).json({name : data[0].name , 
                        psychiatrist_count : data1[0].psychiatrist_count ,
                        patient_count : data1[0].patient_count,
                        psychiatrists : data2
                    });

                })
            })
        })
    } catch (error) {
        
    }
}

module.exports = getHospitalDetails;