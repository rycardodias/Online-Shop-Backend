const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')
const Manufacturer = require('./Manufacturer')

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
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
    },
    images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    },
    os: {
        type: DataTypes.STRING,
    },
    ram: {
        type: DataTypes.STRING,
    },
    storage: {
        type: DataTypes.STRING,
    },
    storageType: {
        type: DataTypes.STRING,
    },
    refreshRate: {
        type: DataTypes.STRING,
    },
    displaySize: {
        type: DataTypes.STRING,
    },
    resolution: {
        type: DataTypes.STRING,
    },
    wifi: {
        type: DataTypes.STRING,
    },
    smartTv: {
        type: DataTypes.STRING,
    },
})

Product.belongsTo(Manufacturer, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    foreignKey: { allowNull: false }
})
Manufacturer.hasMany(Product)

// Product.sync({ alter: true })

module.exports = Product