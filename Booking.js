const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Booking = sequelize.define("Booking", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  seatNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: "Bookings",
  timestamps: false,
});

module.exports = Booking;
