const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Manufacturer = sequelize.define('Manufacturer', {
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
})

// Manufacturer.sync({ alter: true })

module.exports = Manufacturer