---
mode: agent
description: 重新打包 Netlify 部署 zip
---

帮我重新生成生产部署包：

1. 先确认 `index.html` 里没有遗留的调试代码（`#dbg` 浮层、`window.__log`、`console.log`、liveness setTimeout 等），有就清掉
2. 删除旧的 `jimeng-demo.zip`
3. 按 `.github/copilot-instructions.md` 里的命令重新打包
4. 打完告诉我新 zip 的体积，并提示我下一步去 https://app.netlify.com/drop 拖拽上传
