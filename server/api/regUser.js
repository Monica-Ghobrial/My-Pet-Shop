const express = require('express');
const router = express.Router()
const User = require('../models/RegUsers');

router.get('/', async (req, res) => {
    const allUsers = await User.find()
    res.json({ msg:"User are :" , data: allUsers })
});
;

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const newUser = await User.findById(id)
        res.json({ data: newUser })
    }
    catch (error) {
        console.log(error)
    }

});

router.post('/', async (req, res) => {
    try {
        console.log(26,req.body)
        const newUser = await User.create(req.body)
        res.json({ data: newUser })
    }
    catch (error) {
        console.log(error)
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const newUser = await User.findById(id)
        if (!newUser) return res.status(404).send({ error: 'This User does not exist' });
        const updated = await User.findByIdAndUpdate(id, req.body)
        res.json({ msg: 'User updated successfully' })
    }
    catch (error) {

        console.log(error)
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const deleted = await User.findByIdAndRemove(id)
        res.json({ msg: 'This User was deleted successfully', data: deleted })
    }
    catch (error) {
        console.log(error)
    }
});

module.exports = router