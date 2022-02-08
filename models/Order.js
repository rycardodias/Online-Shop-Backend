const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')
const User = require('../models/User')

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Error! Field 'total' is required!",
            },
            min: 0
        },
    },
    totalTax: {
        type: DataTypes.FLOAT,
        allowNull: false,
        notEmpty: {
            msg: "Error! Field 'totalTax' is required!",
        },
        min: 0
    },
    address: {
        type: DataTypes.STRING,
    },
    locale: {
        type: DataTypes.STRING,
    },
    zipcode: {
        type: DataTypes.STRING,
    },
    observation: {
        type: DataTypes.STRING,
    },
    fiscalNumber: {
        type: DataTypes.STRING,
    },
})

Order.belongsTo(User, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    foreignKey: { allowNull: false },
})
User.hasMany(Order)
// Order.hasMany(OrderLine)
// Order.hasMany(OrderStatus)

module.exports = Order