const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')


const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "Error! Field {email} is required!"
            },
            isEmail: {
                msg: "Error! Field {email} must be an email!"
            },
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Error! Field {password} is required!"
            }
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Error! Field {name} is required!"
            }
        }
    },
    phone: {
        type: DataTypes.INTEGER,
        validate: {
            isNumeric: {
                msg: "Error! Field {phone} must be a number!"
            }
        }
    },
    permission: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'USER'
    },
    active: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
})

module.exports = User