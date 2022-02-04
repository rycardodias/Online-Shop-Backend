const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')


const User = sequelize.define('User', {
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
                msg: "Error! Field is required"
            }
        }
    }
})

module.exports = User