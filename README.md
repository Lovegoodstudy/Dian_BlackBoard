# Dian_BlackBoard

## Environment

npm install

## Test

mocha

## Serve

npm start

## 注意事项

所有前端有关内容保存在 public 下，上传的图片需要放置到 public/images 目录下。配置保存在 public 目录下的 setting.json 。打开 html 页面会读取这个 JSON 文件，如果你直接在文件浏览器打开会出现跨域问题，所以应当使用 npm start 启动服务器后访问 localhost:3000/blackboard.html 。
