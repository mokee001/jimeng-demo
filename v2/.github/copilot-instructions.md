# 项目说明（Copilot 自动读取）

## 项目性质
- 即梦（Jimeng）视频流 → 故事改编 的交互原型 demo
- 纯 HTML / CSS / 原生 JS，**不要**引入任何构建工具、npm、bundler、框架
- 所有依赖以 `<script>` / `<link>` 直接引入，资源放在 `assets/`

## 本地运行
- 预览：`python3 -m http.server 5500`，访问 http://localhost:5500
- 改完代码刷新浏览器即可，无需重启

## 部署
- 平台：Netlify Drop（https://app.netlify.com/drop）
- 产物：项目根目录的 `jimeng-demo.zip`
- 打包命令：
  ```
  cd /Users/bytedance/游戏化回流 && \
  rm -f jimeng-demo.zip && \
  zip -r jimeng-demo.zip . \
    -x "*.DS_Store" "*tuner.html" "jimeng-demo.zip" ".github/*" "*.prompt.md"
  ```

## 代码风格约定
- 动画优先用 **CSS @keyframes**，不要引 GSAP / anime.js 等库
- 拖拽统一用 **Pointer Events**，`setPointerCapture` 必须传 `e.currentTarget`
- 需要"跟手 + 缓动"时拆分 CSS `translate`（0s）和 `scale`（带 transition）两个独立属性
- 变量名、函数名一律英文；注释可以中文
- 不要随便加 `console.log`，调试用现有的 `window.__log`（如果还存在）

## 文件结构
- `index.html` — 入口 + 所有 JS 行为
- `styles.css` — 所有视觉与动画
- `assets/` — 视频、图片、海报
- `*tuner.html` — 调参用的独立工具页，**不要打进生产包**

## 修改原则
- 不要改我没让你改的部分（尤其是已经调过的关键帧、像素位置）
- 改之前先 `read_file` 看清上下文
- 改完简短说明改了哪几处，不要长篇大论
