var express = require('express');
var path = require('path');
var router = express.Router();

const frontEndPath = path.resolve(__dirname, '../../build');

router.get('*', (req, res) => {
    res.sendFile(`${frontEndPath}/index.html`);
});

module.exports = router;