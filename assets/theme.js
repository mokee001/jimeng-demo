/**
 * 主题色驱动：根据视频封面图算出主色相，
 * 把 H 写到 :root 的 --theme-h 上。CSS 里的"前景文字 / 卡片背景"
 * 都用 hsl(var(--theme-h), …) 引用，从而由这一个值控制整体配色。
 *
 * 依赖：assets/color-tool.js（提供 colorTool.rgbToHsb）
 */
(function () {
  // 默认 fallback：原始冷蓝灰（≈ #DDEAF0 ≈ HSL 200/38/90）
  var DEFAULT_H = 200;
  var DEFAULT_S = 30;
  var DEFAULT_B = 70;
  var root = document.documentElement;
  root.style.setProperty('--theme-h', DEFAULT_H);
  root.style.setProperty('--theme-s', DEFAULT_S + '%');
  root.style.setProperty('--theme-b', DEFAULT_B + '%');

  function compute(img) {
    if (!img.naturalWidth) return null;
    var W = 64, H = 64;
    var c = document.createElement('canvas');
    c.width = W; c.height = H;
    var ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0, W, H);
    var data;
    try { data = ctx.getImageData(0, 0, W, H).data; }
    catch (e) { return null; }

    // 36 个 10° 分箱的色相直方图，权重 = 饱和度
    var BINS = 36;
    var hist = new Array(BINS).fill(0);
    var totalS = 0, totalB = 0, count = 0;
    for (var i = 0; i < data.length; i += 4) {
      if (data[i + 3] < 200) continue; // 半透明跳过
      var hsb = window.colorTool.rgbToHsb({
        r: data[i], g: data[i + 1], b: data[i + 2]
      });
      // 过滤近灰、过暗，避免污染主色
      if (hsb.s < 18 || hsb.b < 18) continue;
      var bin = Math.floor((hsb.h % 360) / (360 / BINS));
      hist[bin] += hsb.s;
      totalS += hsb.s;
      totalB += hsb.b;
      count++;
    }

    if (!count) return null;

    var bestBin = 0, bestVal = 0;
    for (var b2 = 0; b2 < BINS; b2++) {
      if (hist[b2] > bestVal) { bestVal = hist[b2]; bestBin = b2; }
    }
    return {
      h: bestBin * (360 / BINS) + 360 / BINS / 2,
      s: Math.round(totalS / count),
      b: Math.round(totalB / count)
    };
  }

  function apply(theme) {
    if (!theme) return;
    root.style.setProperty('--theme-h', Math.round(theme.h));
    root.style.setProperty('--theme-s', theme.s + '%');
    root.style.setProperty('--theme-b', theme.b + '%');
    // 暴露给调试
    window.__theme = theme;
  }

  // 取页面里第一张同源 poster / 视频封面进行算色
  function pickSource() {
    var v = document.querySelector('.bg-video');
    if (v && v.poster) return v.poster;
    var img = document.querySelector('.shoot-cover');
    return img ? img.src : null;
  }

  function run() {
    var src = pickSource();
    if (!src) return;
    var img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function () { apply(compute(img)); };
    img.onerror = function () { /* 保持 fallback */ };
    img.src = src;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
