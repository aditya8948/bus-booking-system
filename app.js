const express = require("express");
const { Op } = require("sequelize");
const sequelize = require("./db");
const User = require("./User");
const Bus = require("./Bus");
const Booking = require("./Booking");
const Payment = require("./Payment");

User.hasMany(Booking);
Booking.belongsTo(User);

Bus.hasMany(Booking);
Booking.belongsTo(Bus);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const init = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    const userCount = await User.count();
    if (userCount === 0) {
      await User.create({ name: "John Doe", email: "john@example.com" });
      await User.create({ name: "Jane Smith", email: "jane@example.com" });
      await User.create({ name: "Alice Brown", email: "alice@example.com" });
    }

    const busCount = await Bus.count();
    if (busCount === 0) {
      await Bus.create({ busNumber: "BUS-101", totalSeats: 40, availableSeats: 25 });
      await Bus.create({ busNumber: "BUS-102", totalSeats: 30, availableSeats: 5 });
    }

    const bookingCount = await Booking.count();
    if (bookingCount === 0) {
      const users = await User.findAll();
      const buses = await Bus.findAll();
      if (users.length > 0 && buses.length > 0) {
        await Booking.create({ seatNumber: 12, UserId: users[0].id, BusId: buses[0].id });
        await Booking.create({ seatNumber: 14, UserId: users[0].id, BusId: buses[0].id });
      }
    }
  } catch (err) {
    console.error(err.message);
  }
};

init();

app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/users/:id/bookings", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [Booking],
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/buses", async (req, res) => {
  try {
    const bus = await Bus.create(req.body);
    res.status(201).json(bus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/buses/available/:seats", async (req, res) => {
  try {
    const seats = parseInt(req.params.seats, 10);
    const buses = await Bus.findAll({
      where: {
        availableSeats: {
          [Op.gt]: seats,
        },
      },
    });
    res.json(buses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/bookings", async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [User, Bus],
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});