// Watermark rendering helpers — pure canvas logic, no React.

import {
  getPreset,
  buildFilterString,
  tintAlpha,
  vignetteStrength,
} from './presets';
import { applyAdjustments } from './adjustments';

export const POSITIONS = [
  { id: 'top-left', label: 'Top left', row: 0, col: 0 },
  { id: 'top-center', label: 'Top center', row: 0, col: 1 },
  { id: 'top-right', label: 'Top right', row: 0, col: 2 },
  { id: 'middle-left', label: 'Middle left', row: 1, col: 0 },
  { id: 'center', label: 'Center', row: 1, col: 1 },
  { id: 'middle-right', label: 'Middle right', row: 1, col: 2 },
  { id: 'bottom-left', label: 'Bottom left', row: 2, col: 0 },
  { id: 'bottom-center', label: 'Bottom center', row: 2, col: 1 },
  { id: 'bottom-right', label: 'Bottom right', row: 2, col: 2 },
];

export function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export function computeLogoBox(
  imgW,
  imgH,
  logoImg,
  sizePct,
  paddingPct,
  position,
) {
  const lw = (imgW * sizePct) / 100;
  const lh = lw * (logoImg.naturalHeight / logoImg.naturalWidth);
  const padX = (imgW * paddingPct) / 100;
  const padY = (imgH * paddingPct) / 100;

  let x, y;
  if (position.col === 0) x = padX;
  else if (position.col === 1) x = (imgW - lw) / 2;
  else x = imgW - lw - padX;

  if (position.row === 0) y = padY;
  else if (position.row === 1) y = (imgH - lh) / 2;
  else y = imgH - lh - padY;

  return { x, y, w: lw, h: lh };
}

function drawLogo(ctx, logoImg, box, opacity, rotation) {
  ctx.save();
  ctx.globalAlpha = opacity / 100;
  if (rotation) {
    const cx = box.x + box.w / 2;
    const cy = box.y + box.h / 2;
    ctx.translate(cx, cy);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.drawImage(logoImg, -box.w / 2, -box.h / 2, box.w, box.h);
  } else {
    ctx.drawImage(logoImg, box.x, box.y, box.w, box.h);
  }
  ctx.restore();
}

function drawTiled(ctx, canvas, logoImg, sizePct, opacity, rotation) {
  const lw = (canvas.width * sizePct) / 100;
  const lh = lw * (logoImg.naturalHeight / logoImg.naturalWidth);
  const gapX = lw * 1.6;
  const gapY = lh * 1.8;
  ctx.save();
  ctx.globalAlpha = opacity / 100;
  ctx.rotate((rotation * Math.PI) / 180);
  const diag = Math.hypot(canvas.width, canvas.height);
  for (let y = -diag; y < diag; y += gapY) {
    for (let x = -diag; x < diag; x += gapX) {
      ctx.drawImage(logoImg, x, y, lw, lh);
    }
  }
  ctx.restore();
}

function applyPreset(ctx, canvas, presetId, intensity) {
  const preset = getPreset(presetId);
  if (!preset || preset.id === 'none' || intensity <= 0) return;

  // Re-draw the current pixels through the filter to grade in place.
  const filter = buildFilterString(preset, intensity);
  if (filter !== 'none') {
    ctx.save();
    ctx.filter = filter;
    ctx.drawImage(canvas, 0, 0);
    ctx.restore();
  }

  const tAlpha = tintAlpha(preset, intensity);
  if (tAlpha > 0) {
    const [r, g, b] = preset.tint.color;
    ctx.save();
    ctx.globalCompositeOperation = 'overlay';
    ctx.globalAlpha = tAlpha;
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  }

  const vig = vignetteStrength(preset, intensity);
  if (vig > 0) {
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const outer = Math.hypot(cx, cy);
    const grad = ctx.createRadialGradient(cx, cy, outer * 0.5, cx, cy, outer);
    grad.addColorStop(0, 'rgba(0,0,0,0)');
    grad.addColorStop(1, `rgba(0,0,0,${vig.toFixed(3)})`);
    ctx.save();
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  }
}

export function renderComposite(canvas, baseImg, logoImg, opts) {
  const {
    sizePct,
    paddingPct,
    position,
    opacity,
    rotation = 0,
    tiled = false,
    presetId = 'none',
    intensity = 100,
    adjustments = null,
    maxPreviewSize = 0,
  } = opts;

  // Optionally downscale for a responsive preview; export passes full size.
  const nw = baseImg.naturalWidth;
  const nh = baseImg.naturalHeight;
  let scale = 1;
  if (maxPreviewSize > 0) {
    const longest = Math.max(nw, nh);
    if (longest > maxPreviewSize) scale = maxPreviewSize / longest;
  }
  canvas.width = Math.max(1, Math.round(nw * scale));
  canvas.height = Math.max(1, Math.round(nh * scale));

  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(baseImg, 0, 0, canvas.width, canvas.height);

  // Grade the photo before stamping the logo so the logo stays ungraded.
  applyPreset(ctx, canvas, presetId, intensity);
  applyAdjustments(ctx, canvas, adjustments);

  if (!logoImg) return;

  if (tiled) {
    drawTiled(ctx, canvas, logoImg, sizePct, opacity, rotation);
  } else {
    const box = computeLogoBox(
      canvas.width,
      canvas.height,
      logoImg,
      sizePct,
      paddingPct,
      position,
    );
    drawLogo(ctx, logoImg, box, opacity, rotation);
  }
}

export function canvasToPngBytes(canvas) {
  return new Promise((resolve) => {
    canvas.toBlob(async (blob) => {
      resolve(new Uint8Array(await blob.arrayBuffer()));
    }, 'image/png');
  });
}
