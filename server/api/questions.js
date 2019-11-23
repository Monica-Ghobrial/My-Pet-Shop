const express = require('express');
const router = express.Router()
const Questions = require('../models/Questions');

router.get('/', async (req, res) => {
    const allQuestionss = await Questions.find()
    res.json({ msg:"Questions are :" , data: allQuestionss })
});
;

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const newQuestions = await Questions.findById(id)
        res.json({ data: newQuestions })
    }
    catch (error) {
        console.log(error)
    }

});

router.post('/', async (req, res) => {
    try {
        console.log(26,req.body)
        const newQuestions = await Questions.create(req.body)
        res.json({ data: newQuestions })
    }
    catch (error) {
        console.log(error)
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const newQuestions = await Questions.findById(id)
        if (!newQuestions) return res.status(404).send({ error: 'This Questions does not exist' });
        const updated = await Questions.findByIdAndUpdate(id, req.body)
        res.json({ msg: 'Questions updated successfully' })
    }
    catch (error) {

        console.log(error)
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const deleted = await Questions.findByIdAndRemove(id)
        res.json({ msg: 'This Questions was deleted successfully', data: deleted })
    }
    catch (error) {
        console.log(error)
    }
});

module.exports = router