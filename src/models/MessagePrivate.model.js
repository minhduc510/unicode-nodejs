const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const MessagePrivate = sequelize.define('message_privates', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    receiver_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    message_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    is_read: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'created_at'
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'updated_at'
    },
}, {
    timestamps: true,
});

module.exports = MessagePrivate;
