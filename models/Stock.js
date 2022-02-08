const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')
const Product = require('./Product')

const Stock = sequelize.define('Stock', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    quantity: {
        type: DataTypes.FLOAT,
        allowNull: false,
        notEmpty: {
            msg: "Error! Field 'quantity' is required!",
        },
        min: 0
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Error! Field 'price' is required"
            },
            min: 0
        }
    },
})

Stock.belongsTo(Product, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    foreignKey: { allowNull: false },
})
Product.hasMany(Stock)

module.exports = Stock