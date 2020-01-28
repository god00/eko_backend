var express = require('express');
var path = require('path');
var router = express.Router();

const frontEndPath = path.join(path.resolve(__dirname, '../../'), 'deliver-apps/build/');

router.get('*', (req, res) => {
    res.sendFile(`${frontEndPath}/index.html`);
});

module.exports = router;