# 即梦 (Jimeng) Demo - 完整版本包

## 📁 目录结构

```
jimeng-demo/
├── v1/                      # 原始版本（基础实现）
│   ├── index.html
│   ├── styles.css
│   ├── assets/             # 共享资源
│   └── .github/
│
├── v2/                      # 改进版本（集成颜色提取）
│   ├── index.html
│   ├── styles.css
│   ├── color-preview.html  # 颜色预览工具
│   ├── DEPLOY.md
│   ├── assets/             # 共享资源 + theme.js + color-tool.js
│   └── .github/
│
├── tools/                   # 调试工具集
│   ├── bg-tuner.html       # 背景参数调试工具
│   ├── float-tuner.html    # 浮动动画参数调试工具
│   └── color-preview.html  # 颜色提取与预览工具
│
├── README.md               # 本文档
└── .gitignore

```

## 🚀 快速开始

### 本地预览 v1（原始版本）

```bash
cd v1
python3 -m http.server 5500
# 访问 http://localhost:5500
```

### 本地预览 v2（改进版本）

```bash
cd v2
python3 -m http.server 5500
# 访问 http://localhost:5500
```

### 使用调试工具

```bash
# 背景参数调试
open tools/bg-tuner.html

# 动画参数调试
open tools/float-tuner.html

# 颜色提取工具（v2特有）
open tools/color-preview.html
```

## 📊 版本对比

| 功能 | v1 | v2 |
|------|:--:|:--:|
| 基础交互原型 | ✅ | ✅ |
| 卡片动画 | ✅ | ✅ |
| 颜色提取工具 | ❌ | ✅ |
| 主色提取 | ❌ | ✅ |
| 动态配色系统 | ❌ | ✅ |
| UI 优化 | ❌ | ✅ |

## 🎨 工具说明

### bg-tuner.html
用于调节背景参数（模糊度、亮度、遮罩透明度等）。实时预览效果，导出 CSS 代码。

### float-tuner.html
用于调节卡片动画参数（浮动、入场、闲置动画）。实时预览动画效果，导出 CSS 代码。

### color-preview.html
v2 特有的颜色提取工具：
- 📤 文件上传 / 🔗 URL 输入
- 🎨 实时提取图片主色相（64×64 直方图算法）
- 👁️ 预览前景色效果
- 📋 自动生成 CSS 代码
- 📑 支持复制 CSS 或单独变量

**工作原理**:
1. 上传或输入图片 URL
2. 自动提取主色相（H 值）
3. 生成 CSS 变量：`--theme-h`, `--theme-s`, `--theme-b`
4. 所有前景色动态绑定到 `--theme-h`

## 💡 核心特性

### v1 - 基础实现
- ✅ 纯 HTML / CSS / JavaScript（无框架、无构建工具）
- ✅ 流畅的卡片动画（入场、浮动、退出）
- ✅ Pointer Events 交互处理
- ✅ 响应式设计

### v2 - 增强功能

#### 动态配色系统
```css
:root {
  --theme-h: 200;      /* 主色相 (0-360) */
  --theme-s: 30%;      /* 饱和度 */
  --theme-b: 70%;      /* 亮度 */
}

/* 所有前景色自动驱动 */
.choice-card__arrow,
.feed-arrow,
.replay-icon {
  background-color: hsl(var(--theme-h), 30%, 92%);
}
```

#### UI 优化
- 📐 排版统一（15px 字体，22.5px 行高）
- 🎯 边框设计（1px 渐变边框，11 阶白色渐变）
- 🌈 颜色系统（CSS 变量驱动）
- 🎬 动画优化（弹性曲线）

## 📝 修改与开发

### 编辑样式
```bash
cd v1  # 或 v2
# 编辑 styles.css
# Ctrl+S 保存
# 刷新浏览器查看效果
```

### 编辑内容
编辑 `index.html` 中的 HTML 内容，刷新浏览器即可。

### 调试参数
1. 打开对应的 tuner 工具
2. 实时调整参数
3. 点击"导出 CSS"复制代码
4. 粘贴到 `styles.css`

### 调整配色（v2 only）
1. 打开 `tools/color-preview.html`
2. 上传新的背景图片
3. 工具自动提取主色相
4. 复制生成的 CSS 代码

## 🌍 部署

### Netlify Drop（推荐）
```bash
# 访问 https://app.netlify.com/drop
# 拖拽项目文件夹到页面中
# 自动生成临时 URL
```

### 其他平台
- Vercel：连接 GitHub 仓库自动部署
- GitHub Pages：推送到 gh-pages 分支
- Cloudflare Pages：连接 GitHub 仓库

## 🛠️ 技术栈

| 项目 | 技术 |
|------|------|
| 标记 | HTML5 |
| 样式 | CSS3 + CSS Variables |
| 交互 | Vanilla JavaScript |
| 事件 | Pointer Events API |
| 动画 | CSS @keyframes |
| 构建 | 无（直接部署） |
| 框架 | 无 |

## 🌐 浏览器支持

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Chrome Mobile 90+

## ❓ 常见问题

### Q: 如何修改卡片文本？
A: 编辑 `index.html` 中的相应内容，刷新页面即可。

### Q: 如何改变配色？
A:
- **v1**: 直接修改 `styles.css` 中的颜色值
- **v2**: 使用 `tools/color-preview.html` 工具自动提取并生成 CSS

### Q: 如何微调动画？
A: 使用对应的 tuner 工具进行实时调整并导出 CSS。

### Q: 支持移动端吗？
A: 是的，所有组件都是响应式设计。

### Q: 如何在其他设备上预览？
A:
```bash
# 1. 获取本机 IP
ifconfig | grep "inet "

# 2. 启动服务器
python3 -m http.server 5500

# 3. 在其他设备上访问
http://<你的IP>:5500
```

## 📞 支持

- 调试工具：使用各个 tuner 工具进行实时参数调整
- 诊断：color-preview.html 的控制台包含完整的诊断信息

---

**最后更新**: 2026-04-28
