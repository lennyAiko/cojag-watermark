// Lightroom-style color-grade presets.
//
// NOTE: These approximate popular Lightroom looks using canvas filter
// primitives (brightness/contrast/saturate/sepia/hue-rotate/grayscale) plus
// optional tint and vignette overlays. They are not real .xmp presets — those
// require a RAW-processing engine that cannot run in a browser canvas.

// Neutral values every filter param lerps toward at intensity 0.
const NEUTRAL = {
  brightness: 1,
  contrast: 1,
  saturate: 1,
  sepia: 0,
  hueRotate: 0,
  grayscale: 0,
};

export const PRESETS = [
  {
    id: 'none',
    label: 'Original',
    swatch: 'linear-gradient(135deg,#6b7280,#374151)',
    filter: {},
  },
  {
    id: 'vivid',
    label: 'Vivid',
    swatch: 'linear-gradient(135deg,#22d3ee,#e11d48)',
    filter: { saturate: 1.45, contrast: 1.12, brightness: 1.03 },
  },
  {
    id: 'punch',
    label: 'Punch',
    swatch: 'linear-gradient(135deg,#f59e0b,#db2777)',
    filter: { saturate: 1.3, contrast: 1.25, brightness: 1.02 },
  },
  {
    id: 'matte',
    label: 'Matte',
    swatch: 'linear-gradient(135deg,#a3a3a3,#525252)',
    filter: { contrast: 0.85, brightness: 1.08, saturate: 0.9 },
    tint: { color: [30, 34, 45], alpha: 0.12 },
  },
  {
    id: 'fade',
    label: 'Faded Film',
    swatch: 'linear-gradient(135deg,#d6d3c7,#8a8577)',
    filter: { contrast: 0.82, brightness: 1.1, saturate: 0.78, sepia: 0.15 },
    tint: { color: [214, 211, 199], alpha: 0.14 },
  },
  {
    id: 'bw',
    label: 'B&W',
    swatch: 'linear-gradient(135deg,#e5e5e5,#404040)',
    filter: { grayscale: 1, contrast: 1.08 },
  },
  {
    id: 'noir',
    label: 'Noir',
    swatch: 'linear-gradient(135deg,#9ca3af,#000000)',
    filter: { grayscale: 1, contrast: 1.4, brightness: 0.95 },
    vignette: 0.55,
  },
  {
    id: 'vintage',
    label: 'Vintage',
    swatch: 'linear-gradient(135deg,#c8a06a,#6b4b2a)',
    filter: { sepia: 0.45, saturate: 1.1, contrast: 1.05, brightness: 1.02 },
    tint: { color: [120, 80, 40], alpha: 0.1 },
    vignette: 0.35,
  },
  {
    id: 'sepia',
    label: 'Sepia',
    swatch: 'linear-gradient(135deg,#d8b98c,#8a5a2b)',
    filter: { sepia: 0.85, contrast: 1.05, brightness: 1.02 },
  },
  {
    id: 'cinematic',
    label: 'Teal & Orange',
    swatch: 'linear-gradient(135deg,#0d9488,#f97316)',
    filter: { contrast: 1.15, saturate: 1.2, hueRotate: -8 },
    tint: { color: [20, 90, 110], alpha: 0.12 },
  },
  {
    id: 'warm',
    label: 'Golden',
    swatch: 'linear-gradient(135deg,#fbbf24,#f97316)',
    filter: { saturate: 1.15, brightness: 1.05, sepia: 0.2 },
    tint: { color: [255, 170, 60], alpha: 0.12 },
  },
  {
    id: 'cool',
    label: 'Arctic',
    swatch: 'linear-gradient(135deg,#93c5fd,#1e3a8a)',
    filter: { saturate: 1.05, brightness: 1.02, hueRotate: 8 },
    tint: { color: [80, 140, 220], alpha: 0.12 },
  },
  {
    id: 'moody',
    label: 'Moody',
    swatch: 'linear-gradient(135deg,#334155,#0f172a)',
    filter: { contrast: 1.3, brightness: 0.9, saturate: 0.85 },
    tint: { color: [20, 30, 45], alpha: 0.18 },
    vignette: 0.5,
  },
  {
    id: 'airy',
    label: 'Airy',
    swatch: 'linear-gradient(135deg,#fce7f3,#e0e7ff)',
    filter: { contrast: 0.8, brightness: 1.15, saturate: 0.75 },
    tint: { color: [255, 250, 240], alpha: 0.1 },
  },
  {
    id: 'kodachrome',
    label: 'Kodachrome',
    swatch: 'linear-gradient(135deg,#dc2626,#7c2d12)',
    filter: { saturate: 1.5, contrast: 1.2, sepia: 0.1 },
    tint: { color: [200, 40, 30], alpha: 0.08 },
  },
  {
    id: 'crossprocess',
    label: 'Cross Process',
    swatch: 'linear-gradient(135deg,#a3e635,#365314)',
    filter: { saturate: 1.35, contrast: 1.3, hueRotate: 25, brightness: 1.02 },
    tint: { color: [180, 200, 40], alpha: 0.1 },
  },
  {
    id: 'bleachbypass',
    label: 'Bleach Bypass',
    swatch: 'linear-gradient(135deg,#cbd5e1,#1e293b)',
    filter: { saturate: 0.4, contrast: 1.5, brightness: 1.05 },
  },
  {
    id: 'dusk',
    label: 'Dusk',
    swatch: 'linear-gradient(135deg,#312e81,#1e1b4b)',
    filter: { saturate: 0.95, contrast: 1.1, brightness: 0.88, hueRotate: -12 },
    tint: { color: [30, 50, 100], alpha: 0.2 },
    vignette: 0.3,
  },
  {
    id: 'duotone',
    label: 'Duotone',
    swatch: 'linear-gradient(135deg,#3b82f6,#1e1b4b)',
    filter: { grayscale: 1, contrast: 1.1 },
    tint: { color: [30, 60, 200], alpha: 0.35 },
  },
  {
    id: 'ansel',
    label: 'Ansel',
    swatch: 'linear-gradient(135deg,#f5f5f5,#171717)',
    filter: { grayscale: 1, contrast: 1.6, brightness: 0.98 },
    vignette: 0.65,
  },
];

const PRESET_MAP = new Map(PRESETS.map((p) => [p.id, p]));

export function getPreset(id) {
  return PRESET_MAP.get(id) || PRESET_MAP.get('none');
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

// Build a CSS/canvas filter string for a preset scaled by intensity (0-100).
export function buildFilterString(preset, intensity = 100) {
  const f = preset?.filter;
  if (!f) return 'none';
  const t = Math.max(0, Math.min(100, intensity)) / 100;

  const brightness = lerp(NEUTRAL.brightness, f.brightness ?? 1, t);
  const contrast = lerp(NEUTRAL.contrast, f.contrast ?? 1, t);
  const saturate = lerp(NEUTRAL.saturate, f.saturate ?? 1, t);
  const sepia = lerp(NEUTRAL.sepia, f.sepia ?? 0, t);
  const grayscale = lerp(NEUTRAL.grayscale, f.grayscale ?? 0, t);
  const hueRotate = lerp(NEUTRAL.hueRotate, f.hueRotate ?? 0, t);

  return [
    `brightness(${brightness.toFixed(3)})`,
    `contrast(${contrast.toFixed(3)})`,
    `saturate(${saturate.toFixed(3)})`,
    `sepia(${sepia.toFixed(3)})`,
    `grayscale(${grayscale.toFixed(3)})`,
    `hue-rotate(${hueRotate.toFixed(1)}deg)`,
  ].join(' ');
}

// Effective overlay alphas scaled by intensity.
export function tintAlpha(preset, intensity = 100) {
  if (!preset?.tint) return 0;
  return preset.tint.alpha * (Math.max(0, Math.min(100, intensity)) / 100);
}

export function vignetteStrength(preset, intensity = 100) {
  if (!preset?.vignette) return 0;
  return preset.vignette * (Math.max(0, Math.min(100, intensity)) / 100);
}
