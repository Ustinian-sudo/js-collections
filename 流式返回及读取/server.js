const express = require("express");
const { Readable } = require("stream");

const app = express();
const port = 3000;

// 定义一个接口，流式返回文本
app.get("/chat", (req, res) => {
  // 创建一个可读流
  const textStream = new Readable({
    read() {},
  });

  // 设置响应头，指定内容类型为纯文本
  res.setHeader("Content-Type", "text/plain");

  // 将可读流与响应管道连接
  textStream.pipe(res);

  // 模拟流式发送文本内容
  const texts = ["Hello, ", "this ", "is ", "a ", "stream ", "of ", "text!"];
  texts.forEach((text, index) => {
    setTimeout(() => {
      textStream.push(text);
      if (index === texts.length - 1) {
        // 结束流
        textStream.push(null);
      }
    }, index * 1000); // 每秒发送一段文本
  });
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
