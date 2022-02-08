const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')
const Order = require('./Order')

const OrderStatus = sequelize.define('OrderStatus', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Error! Field 'status' is required!",
            },
        },
    },
}, { freezeTableName: true })

OrderStatus.belongsTo(Order, {
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL',
    foreignKey: { allowNull: false },
})
Order.hasMany(OrderStatus)

module.exports = OrderStatus