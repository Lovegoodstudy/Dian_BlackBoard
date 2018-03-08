let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({extended: false});

router.post('/', urlencodedParser, async (req, res, next) => {
    
});

module.exports = router;