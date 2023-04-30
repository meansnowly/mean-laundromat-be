const express = require('express')
const mysql = require('mysql');
const cors = require('cors')
const app = express();
const port = process.env.PORT||5000

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    user: "z6kozgk5uqwhkzet",
    host: "jhdjjtqo9w5bzq2t.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    password: "mvdi57gcxz5wgcvi",
    database: "fubhqonv1sbvoauw",
    port : '3306'
})

connection.connect((err) => {
    if (err){
        console.log('Error connent ot Mysql database = ',err);
        return;
    }
    console.log('MySQL successfuly connected!');
});

app.get('/mchistory', (req, res)=>{
    connection.query("SELECT * FROM machine_history", (err, result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
})

app.post('/setmchistory', (req, res)=>{
    const start_datetime = req.body.start_datetime;
    const machine_number = req.body.machine_number;

    if(start_datetime !== "" && machine_number !== 0){
        connection.query("INSERT INTO machine_history(start_datetime, machine_number) VALUES(?,?)",[start_datetime, machine_number], (err, result)=>{
            if(err){
                console.log(err);
            }
            else{
                res.send(result);
            }
        });
    }
})
 
app.listen(port, ()=>{
    console.log('Running on 5000')
})