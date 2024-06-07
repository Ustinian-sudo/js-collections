const url = "http://localhost:3000/chat";

async function chat() {
  // 第一次await会先返回整个Promise对象，即响应头
  const resp = await fetch(url, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });

  //   第二次await才返回响应体
  //   const data = await resp.text();

  // 流式读取
  const reader = resp.body.getReader();
  // 解码器
  const decoder = new TextDecoder();
  while (1) {
    // reader.read() 返回一个包含数据块的 Buffer 对象
    const { done, value } = await reader.read();
    const txt = decoder.decode(value);
    console.log(txt);
    if (done) break;
  }
}

chat();
