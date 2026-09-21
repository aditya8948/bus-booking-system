const express = require("express");
const sql = require("mysql2");

const app = express();
app.use(express.json());

const db =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'mysql@1234',
    database: 'bus_booking_system'
});

db.connect(err=>{
    if(err) {
        console.log(`Error connecting to database: ${err.message}`);
        return;
    }
    console.log(`connected to the database`);
});


// insert 

app.post('/user')