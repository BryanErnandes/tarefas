const express = require('express');
const { Tarefa } = require('./models')

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const tarefa = await Tarefa.findAll();
    res.send(tarefa);
    }
    catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try{
        const  tarefa = await Tarefa.create(req.body);
    res.send(tarefa);
    }
    catch (err) {
        next(err);
    }
})  

module.exports = router;