const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')
const Order = require('./Order')
const Product = require('./Product')

const OrderLine = sequelize.define('OrderLine', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Error! Field {quantity} is required!",
            },
            min: 1
        },
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
        validate: {
            notEmpty: {
                msg: "Error! Field 'totalTax' is required!",
            },
            min: 0
        }
    },

})

OrderLine.belongsTo(Order, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    foreignKey: { allowNull: false },
})
Order.hasMany(OrderLine)

OrderLine.belongsTo(Product, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    foreignKey: { allowNull: false },
})
Product.hasMany(OrderLine)

module.exports = OrderLine