let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({extended: false});
let fs = require('fs'); 

router.get('/', urlencodedParser, function (req, res, next) {
    let getpath=('./public/images');
    fs.readdir(getpath, function(err, files) {  
        if (err) {  
            console.error(err);  
        }
        //console.log(files);
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


router.delete('/', urlencodedParser, function (req, res, next) {
    let deleteData={
        _name: req.body.name
    };
    //console.log(deleteData._name);
    if (!_validateDeleteData(deleteData)) {
        console.log("该图片不存在");
        res.sendStatus(400);
    } else {
        let deletePath =("./public/images/");
        wholename=deletePath+deleteData._name;
        fs.unlink(wholename,function(err){
            if(err){
                res.sendStatus(500);
                console.error(err);
            }else{
                res.status(200).send('delete success!');
            }
        });

    }
});

function _validateDeleteData(deleteData){
    let deletePath =("./public/images/");
    wholename=deletePath+deleteData._name;
    return(fs.existsSync(wholename));
}

module.exports = router;
