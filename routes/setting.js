let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({extended: false});
let fs = require('fs');

router.post('/', urlencodedParser, function (req, res, next) {
    // 获取req.body传来的信息，暂存在settingData中
    let settingData = {
        pictureInfomations: req.body.pictureInfomations,
        appointmentInfomations: req.body.appointmentInfomations,
    };
    // console.log(settingData);

    // console.log(_validateSettingData(settingData));
    // 函数验证settingData是否符合规范，不符合则返回400（请求错误）
    if (!_validateSettingData(settingData)) {
        res.sendStatus(400);
    } else {
        // 参数验证成功，解析JSON变为字符串，写入setting文件。写入失败则返回500（服务器错误），写入成功则可以返回200（请求成功）
        let settingStr = JSON.stringify(settingData);
        let file = './public/setting.json';
        fs.writeFile(file, settingStr, function(err) {
            if (err) {
                res.sendStatus(500);
                console.error(err);
            } else {
                res.sendStatus(200);
            }
        });
    }
});

router.get('/', urlencodedParser, function (req, res, next) {
    // 读取setting.json，转换为JSON返回
    let file = './public/setting.json';
    fs.readFile(file, 'ascii', function(err, data) {
        if (err) {
            // 读取失败，返回500（服务器错误）
            res.sendStatus(500);
            console.error(err);
        } else {
            // 读取成功，将JSON字符串转为JSON对象并返回
            let settingData = JSON.parse(data);
            // console.log(settingData);
            
            res.status(200).json(settingData);
        }
    });
});

// 验证SettingData是否格式合法，具有必须字段
function _validateSettingData(settingData) {
    if ((settingData.pictureInfomations === undefined) || (settingData.appointmentInfomations === undefined))
        return false;
    for (let pictureInfomation of settingData.pictureInfomations) {
        if ((pictureInfomation.filepath === undefined) || (pictureInfomation.displayTime === undefined))
            return false;
    }
    if ((settingData.appointmentInfomations.displayTime === undefined) || (settingData.appointmentInfomations.refreshTime === undefined))
        return false;
    return true;
}

module.exports = router;