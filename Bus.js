const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Bus = sequelize.define("Bus", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  busNumber: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  totalSeats: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  availableSeats: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: "Buses",
  timestamps: false,
});

module.exports = Bus;
