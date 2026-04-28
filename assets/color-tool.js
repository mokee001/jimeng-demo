/**
 * 算色工具 — port of B2.sh
 * HEX → RGB → HSB → 中文颜色名（橙/黄/绿/蓝/紫/红/灰）
 *
 * 使用：
 *   const r = window.colorTool.classify('#ff8800');
 *   // → { hex:'FF8800', r,g,b, h,s,b, name:'橙色' }
 */
(function (global) {
  function hexToRgb(hex) {
    if (typeof hex !== 'string') return null;
    hex = hex.replace(/^#/, '').trim();
    if (!/^[0-9a-fA-F]{6}$/.test(hex)) return null;
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
      hex: hex.toUpperCase(),
    };
  }

  function rgbToHsb(rgb) {
    const r = rgb.r, g = rgb.g, b = rgb.b;
    const rn = r / 255, gn = g / 255, bn = b / 255;
    const max = Math.max(rn, gn, bn);
    const min = Math.min(rn, gn, bn);
    const delta = max - min;
    let h = 0;
    if (delta !== 0) {
      if (max === rn) h = 60 * ((gn - bn) / delta);
      else if (max === gn) h = 60 * ((bn - rn) / delta + 2);
      else h = 60 * ((rn - gn) / delta + 4);
      h = ((h % 360) + 360) % 360;
      // 与 B2.sh 一致：有小数则向上进位
      h = Math.ceil(h);
    }
    const s = max === 0 ? 0 : Math.ceil(100 * (delta / max));
    const bv = Math.floor(100 * max);
    return { h: h, s: s, b: bv };
  }

  function hsbToColorName(hsb) {
    const h = hsb.h, s = hsb.s, b = hsb.b;
    if (s <= 5 || (s > 5 && s <= 20 && b < 70)) return '灰色';
    if (h > 0 && h <= 45) return '橙色';
    if (h >= 46 && h <= 90) return '黄色';
    if (h >= 91 && h <= 180) return '绿色';
    if (h >= 181 && h <= 225) return '蓝色';
    if (h >= 226 && h <= 270) return '紫色';
    if (h >= 270 || h === 0 || h === 360) return '红色';
    return '灰色';
  }

  function classify(hex) {
    const rgb = hexToRgb(hex);
    if (!rgb) return null;
    const hsb = rgbToHsb(rgb);
    return Object.assign({}, rgb, hsb, { name: hsbToColorName(hsb) });
  }

  global.colorTool = { hexToRgb, rgbToHsb, hsbToColorName, classify };
})(window);
