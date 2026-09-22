const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Payment = sequelize.define("Payment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  amountPaid: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  paymentStatus: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
  tableName: "Payments",
  timestamps: false,
});

module.exports = Payment;
