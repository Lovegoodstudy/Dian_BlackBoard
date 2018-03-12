let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({extended: false});
let fs = require('fs'); 

var multer  = require('multer');

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
        name: req.body.name
    };
    //console.log(deleteData.name);
    if (!_validateDeleteData(deleteData)) {
        console.log("该图片不存在");
        res.sendStatus(400);
    } else {
        let deletePath =("./public/images/");
        wholename=deletePath+deleteData.name;
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




router.post('/', urlencodedParser, function (req, res, next) {

    console.log(req.files[0]);  // 上传的文件信息
    
    var des_file = "./public/images" + "/" + req.files[0].originalname;
    fs.readFile( req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
        if( err ){
            console.log( err );
        }else{
                response = {
                    message:'File uploaded successfully', 
                    filename:req.files[0].originalname
            };
        }
        console.log( response );


        res.end( JSON.stringify( response ) );
        });
    });
   
});




function _validateDeleteData(deleteData){
    let deletePath =("./public/images/");
    wholename=deletePath+deleteData.name;
    return(fs.existsSync(wholename));
}

module.exports = router;
