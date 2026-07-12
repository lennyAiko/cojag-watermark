// Manual photo adjustments — Lightroom-style, all applied on a 2D canvas.
//
// CSS-filterable adjustments (brightness/contrast/saturation) go through
// ctx.filter. The rest (temperature/tint/highlights/shadows/vibrance) need a
// single per-pixel pass via getImageData/putImageData.
//
// Slider ranges are -100..100 (default 0), matching Lightroom's feel. No RAW
// engine is involved — these are approximations that run fully in-browser.

export const ADJUSTMENT_KEYS = [
  'temperature',
  'tint',
  'brightness',
  'contrast',
  'highlights',
  'shadows',
  'vibrance',
  'saturation',
];

export const DEFAULT_ADJUSTMENTS = {
  temperature: 0,
  tint: 0,
  brightness: 0,
  contrast: 0,
  highlights: 0,
  shadows: 0,
  vibrance: 0,
  saturation: 0,
};

export function isNeutral(adj) {
  if (!adj) return true;
  return ADJUSTMENT_KEYS.every((k) => (adj[k] ?? 0) === 0);
}

function clamp255(v) {
  return v < 0 ? 0 : v > 255 ? 255 : v;
}

// CSS filter string for the GPU-cheap adjustments.
function cssFilterFor(adj) {
  const parts = [];
  if (adj.brightness) parts.push(`brightness(${1 + adj.brightness / 200})`);
  if (adj.contrast) parts.push(`contrast(${1 + adj.contrast / 150})`);
  if (adj.saturation) parts.push(`saturate(${1 + adj.saturation / 100})`);
  return parts.length ? parts.join(' ') : 'none';
}

function needsPixelPass(adj) {
  return (
    adj.temperature ||
    adj.tint ||
    adj.highlights ||
    adj.shadows ||
    adj.vibrance
  );
}

export function applyAdjustments(ctx, canvas, adj) {
  if (isNeutral(adj)) return;

  // 1) GPU-cheap filters: redraw the canvas onto itself through ctx.filter.
  const filter = cssFilterFor(adj);
  if (filter !== 'none') {
    ctx.save();
    ctx.filter = filter;
    ctx.drawImage(canvas, 0, 0);
    ctx.restore();
  }

  if (!needsPixelPass(adj)) return;

  // 2) Per-pixel pass for the rest.
  const { width, height } = canvas;
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  const temp = adj.temperature / 100; // -1..1 (warm positive)
  const tintAmt = adj.tint / 100; // -1..1 (magenta positive, green negative)
  const hi = adj.highlights / 100; // -1..1
  const sh = adj.shadows / 100; // -1..1
  const vib = adj.vibrance / 100; // -1..1

  const tempR = temp * 30;
  const tempB = temp * 30;
  const tintG = tintAmt * 30;

  for (let i = 0; i < data.length; i += 4) {
    let r = data[i];
    let g = data[i + 1];
    let b = data[i + 2];

    // Temperature: warm pushes red up, blue down (cool inverts).
    if (temp) {
      r += tempR;
      b -= tempB;
    }

    // Tint: magenta lowers green, green raises it.
    if (tintAmt) {
      g -= tintG;
    }

    // Luminance for tone masks.
    if (hi || sh) {
      const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255; // 0..1
      if (sh) {
        // Shadow mask peaks at dark pixels.
        const mask = 1 - lum;
        const amt = sh * mask * 90;
        r += amt;
        g += amt;
        b += amt;
      }
      if (hi) {
        // Highlight mask peaks at bright pixels.
        const mask = lum;
        const amt = hi * mask * 90;
        r += amt;
        g += amt;
        b += amt;
      }
    }

    // Vibrance: boost saturation more on low-saturation pixels.
    if (vib) {
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const sat = max === 0 ? 0 : (max - min) / max; // 0..1
      const weight = vib * (1 - sat);
      const avg = (r + g + b) / 3;
      r += (r - avg) * weight;
      g += (g - avg) * weight;
      b += (b - avg) * weight;
    }

    data[i] = clamp255(r);
    data[i + 1] = clamp255(g);
    data[i + 2] = clamp255(b);
  }

  ctx.putImageData(imageData, 0, 0);
}
