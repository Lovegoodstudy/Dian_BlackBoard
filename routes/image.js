let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({extended: false});
let fs = require('fs'); 

let multer = require('multer');

router.get('/', urlencodedParser, function (req, res, next) {
    let getpath = ('./public/images');
    fs.readdir(getpath, function(err, files) {  //读取图片文件夹(/public/images)
        if (err) {
            console.error(err);  
        }
        //console.log(files);
        let pictureInformations = [];
        for (let file of files){　//读取图片文件夹下的每一个图片
            filename = getpath + "/" + file;　//将相对地址改为绝对地址
            //console.log(filename);
            let stats = fs.statSync(filename);　//读取图片信息
            let eachImage = {　//以对象形式储存图片信息
                name : file,
                altertime : stats.mtime.toLocaleString(),
                size : (stats.size / 1024 / 1024).toFixed(2) + "M"
            };
            //console.log(eachImage);
            pictureInformations.push(eachImage);　//将每张图片的信息加入数组
        };
            
        //console.log(pictureInformations);
        res.status(200).json(pictureInformations);
    });
});


router.delete('/', urlencodedParser, function (req, res, next) {
    let deleteData = {
        name: req.body.name
    };
    //console.log(deleteData.name);
    if (!_validateDeleteData(deleteData)) {　//判断图片是否存在
        //console.log("该图片不存在");
        res.sendStatus(400);
    } else {
        let deletePath = ("./public/images/"); 
        wholename = deletePath + deleteData.name;
        fs.unlink(wholename, function(err) { //删除指定图片
            if (err) {
                res.sendStatus(500);
                console.error(err);
            } else {
                res.status(200).send('delete success!');
            }
        });

    }
});




router.post('/', urlencodedParser, function (req, res, next) {
    //console.log(req.files[0]);  // 上传的文件信息
    let desFile = "./public/images" + "/" + req.files[0].originalname;
    fs.readFile(req.files[0].path, function (err, data) {
        fs.writeFile(desFile, data, function (err) {
            if (err) {
                res.sendStatus(500);
                console.error(err);
            } else {
                response = {
                    message: 'File uploaded successfully', 
                    filename: req.files[0].originalname
                };
            }
            //console.log(response);
            res.stat(200).json(response);
        });
    });
   
});




function _validateDeleteData(deleteData) { //判断图片是否存在
    let deletePath = ("./public/images/");
    wholename = deletePath + deleteData.name;
    return (fs.existsSync(wholename));
}

module.exports = router;
