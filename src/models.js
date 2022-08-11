const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.NODE_ENV == 'test' ? 'sqlite::memory:' : 'sqlite:./db.sqlite');

const Tarefa = sequelize.define('tarefa', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    descricao: {
        type: DataTypes.TEXT,
    },
    concluida: {
        type: DataTypes.BOOLEAN,
    },
    data: {
        type: DataTypes.DATE,
    },
});

module.exports = { sequelize, Tarefa }