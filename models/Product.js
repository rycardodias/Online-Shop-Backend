const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Error! Field 'name' is required"
            }
        }
    },
    description: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Error! Field 'price' is required"
            }
        }
    },
    tax: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Error! Field 'tax' is required"
            }
        }
    }
})

module.exports = Product