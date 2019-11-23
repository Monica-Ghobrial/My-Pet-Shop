const express = require('express');
const router = express.Router()
const Ads = require('../models/Ads');

router.get('/', async (req, res) => {
    const allAdss = await Ads.find()
    res.json({ msg:"Ads are :" , data: allAdss })
});
;

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const newAds = await Ads.findById(id)
        res.json({ data: newAds })
    }
    catch (error) {
        console.log(error)
    }

});

router.post('/', async (req, res) => {
    try {
        console.log(26,req.body)
        const newAds = await Ads.create(req.body)
        res.json({ data: newAds })
    }
    catch (error) {
        console.log(error)
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const newAds = await Ads.findById(id)
        if (!newAds) return res.status(404).send({ error: 'This Ads does not exist' });
        const updated = await Ads.findByIdAndUpdate(id, req.body)
        res.json({ msg: 'Ads updated successfully' })
    }
    catch (error) {

        console.log(error)
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const deleted = await Ads.findByIdAndRemove(id)
        res.json({ msg: 'This Ads was deleted successfully', data: deleted })
    }
    catch (error) {
        console.log(error)
    }
});

module.exports = router