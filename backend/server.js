const express = require('express');

const app = express();
const path = require('path');

app.use(express.json());

const multer = require('multer');

const {db} = require('./config/db');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // console.log(req.params)
        cb(null, './backend/images')
    },
    filename: (req, file, cb) => {
        // console.log(file);
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage });
require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.use('/register-patient' , upload.single('photo') , require('./routes/registerPatient'))

app.use('/getHospitalDetails', require('./routes/hospitalDetails'))


app.post('/register-psychiatrist', (req, res) => {
    try {
        console.log(req.body);
        // res.status(200).json(req.body);
        const q = "INSERT INTO psychiatrists (`name` , `hospital_id`) VALUES (?)";
        const values = [
            req.body.name,
            req.body.hospital_id,
        ];
        db.query(q, [values], (err, data) => {
            if (err) return res.status(400).json(err);
            else return res.status(200).json(data);
        })
    } catch (error) {
        res.status(500).json(error);
    }
});




app.post('/register-hospital', (req, res) => {
    try {
        console.log(req.body);
        const q = "INSERT INTO hospitals (`name`) VALUES (?)";
        const value = [req.body.name];
        db.query(q, [value], (err, data) => {
            if (err) {
                console.log(err);
                return res.status(400).json(err);
            }
            return res.status(200).json(data);
        })
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})

app.get('/', (req, res) => {
    try {
        const q = "SELECT * FROM hospitals";
        db.query(q, (err, data) => {
            return res.json(data);
        })
    } catch (error) {
        return res.status(500).json(error);
    }
})


app.listen(PORT, () => {
    console.log(`server is running at ${PORT} `);
    // console.log(db);
})