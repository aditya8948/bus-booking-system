const express = require("express");
const mysql = require("mysql2");

const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql@1234',
    database: 'bus_booking_system'
});

db.connect(err => {
    if (err) {
        console.log(`Error connecting to database: ${err.message}`);
        return;
    }
    console.log(`connected to the database`);

    const sampleUsers = `INSERT IGNORE INTO Users (id, name, email) VALUES
        (1, 'Aditya', 'aditya@example.com'),
        (2, 'Rahul', 'rahul@example.com'),
        (3, 'Priya', 'priya@example.com')`;

    const sampleBuses = `INSERT IGNORE INTO Buses (id, busNumber, totalSeats, availableSeats) VALUES
        (1, 'KA-01-1234', 40, 25),
        (2, 'KA-02-5678', 50, 8),
        (3, 'KA-03-9012', 35, 15)`;

    db.query(sampleUsers, (err) => {
        if (err) console.log(`Error inserting users: ${err.message}`);
    });

    db.query(sampleBuses, (err) => {
        if (err) console.log(`Error inserting buses: ${err.message}`);
    });
});

app.post('/users', (req, res) => {
    const { id, name, email } = req.body;
    db.query('INSERT INTO Users (id, name, email) VALUES (?, ?, ?)', [id, name, email], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'User added', id: result.insertId || id });
    });
});

app.get('/users', (req, res) => {
    db.query('SELECT * FROM Users', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.post('/buses', (req, res) => {
    const { id, busNumber, totalSeats, availableSeats } = req.body;
    db.query('INSERT INTO Buses (id, busNumber, totalSeats, availableSeats) VALUES (?, ?, ?, ?)', [id, busNumber, totalSeats, availableSeats], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Bus added', id: result.insertId || id });
    });
});

app.get('/buses/available/:seats', (req, res) => {
    const seats = parseInt(req.params.seats);
    db.query('SELECT * FROM Buses WHERE availableSeats > ?', [seats], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});