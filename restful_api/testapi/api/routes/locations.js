const express = require('express');
const router = express.Router();

//Post method.. this one is the useful one.
router.post('/', (req, res, next) => {
    const location = {
        lat: req.body.lat,
        lng: req.body.lng
    }
    res.status(201).json({
        message: 'Handling POST request to /location',
        LocationList: location
    });
});

module.exports = router;