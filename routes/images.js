let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({extended: false});
let fs = require('fs'); 



router.get('/', urlencodedParser, function (req, res, next) {
    fs.readdir(getpath, function(err, files) {  
        if (err) {  
            console.error(err);  
        }
        //console.log(files);
        let getpath=('./public/images');
        let pictureinformations=new Array();
        for (let i in files){
            filename=getpath+"/"+files[i];
            //console.log(filename);
            let stats = fs.statSync(filename);

                if(err){
                    console.error(err);
                }
                //console.log("mmp");
                let eachimage = {
                    name : files[i],
                    altertime : stats.mtime.toLocaleString(),
                    size : (stats.size/1024/1024).toFixed(2)+"M"
                };
                //console.log(eachimage);
                pictureinformations.push(eachimage);
            };
            
        
        console.log(pictureinformations);
        res.status(200).json(pictureinformations);

    });
});


module.exports = router;
