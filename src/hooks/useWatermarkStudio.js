import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  POSITIONS,
  loadImage,
  renderComposite,
  canvasToPngBytes,
} from '../lib/watermark';
import { makeZip } from '../lib/zip';

export function useWatermarkStudio() {
  const [logo, setLogo] = useState(null); // { url, img, name }
  const [images, setImages] = useState([]); // { id, name, url, img, orientation }
  const [position, setPosition] = useState(POSITIONS[8]); // bottom-right
  const [sizePct, setSizePct] = useState(15);
  const [paddingPct, setPaddingPct] = useState(4);
  const [opacity, setOpacity] = useState(85);
  const [rotation, setRotation] = useState(0);
  const [tiled, setTiled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZipping, setIsZipping] = useState(false);
  const [zipProgress, setZipProgress] = useState(0);
  const activeIndexRef = useRef(0);

  const settings = useMemo(
    () => ({ position, sizePct, paddingPct, opacity, rotation, tiled }),
    [position, sizePct, paddingPct, opacity, rotation, tiled],
  );

  const onLogoUpload = useCallback(async (file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const img = await loadImage(url);
    setLogo((prev) => {
      if (prev) URL.revokeObjectURL(prev.url);
      return { url, img, name: file.name };
    });
  }, []);

  const onLogoClear = useCallback(() => {
    setLogo((prev) => {
      if (prev) URL.revokeObjectURL(prev.url);
      return null;
    });
  }, []);

  const onAddImages = useCallback(async (fileList) => {
    const files = Array.from(fileList).filter((f) =>
      f.type.startsWith('image/'),
    );
    const loaded = await Promise.all(
      files.map(async (file) => {
        const url = URL.createObjectURL(file);
        const img = await loadImage(url);
        return {
          id: `${file.name}-${file.size}-${Math.random().toString(36).slice(2)}`,
          name: file.name,
          url,
          img,
          orientation:
            img.naturalHeight >= img.naturalWidth ? 'portrait' : 'landscape',
          presetId: 'none',
          intensity: 100,
        };
      }),
    );
    setImages((prev) => [...prev, ...loaded]);
  }, []);

  const removeImage = useCallback((id) => {
    setImages((prev) => {
      const target = prev.find((im) => im.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((im) => im.id !== id);
    });
  }, []);

  const clearAll = useCallback(() => {
    setImages((prev) => {
      prev.forEach((im) => URL.revokeObjectURL(im.url));
      return [];
    });
    setActiveIndex(0);
  }, []);

  const setActivePreset = useCallback((presetId) => {
    const idx = activeIndexRef.current;
    setImages((prev) =>
      prev.map((im, i) => (i === idx ? { ...im, presetId } : im)),
    );
  }, []);

  const setActiveIntensity = useCallback((intensity) => {
    const idx = activeIndexRef.current;
    setImages((prev) =>
      prev.map((im, i) => (i === idx ? { ...im, intensity } : im)),
    );
  }, []);

  const applyPresetToAll = useCallback(() => {
    const idx = activeIndexRef.current;
    setImages((prev) => {
      const source = prev[idx];
      if (!source) return prev;
      const { presetId, intensity } = source;
      return prev.map((im) => ({ ...im, presetId, intensity }));
    });
  }, []);

  const prev = useCallback(
    () => setActiveIndex((i) => (i - 1 + images.length) % images.length),
    [images.length],
  );
  const next = useCallback(
    () => setActiveIndex((i) => (i + 1) % images.length),
    [images.length],
  );

  const downloadAll = useCallback(async () => {
    if (images.length === 0) return;
    setIsZipping(true);
    setZipProgress(0);
    const offscreen = document.createElement('canvas');
    const entries = [];

    for (let i = 0; i < images.length; i++) {
      const im = images[i];
      renderComposite(offscreen, im.img, logo?.img || null, {
        ...settings,
        presetId: im.presetId,
        intensity: im.intensity,
      });
      const data = await canvasToPngBytes(offscreen);
      const baseName = im.name.replace(/\.[^/.]+$/, '');
      entries.push({ name: `${baseName}-watermarked.png`, data });
      setZipProgress(Math.round(((i + 1) / images.length) * 100));
      await new Promise((r) => setTimeout(r, 0)); // keep UI responsive
    }

    const zipBlob = makeZip(entries);
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'watermarked-images.zip';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setIsZipping(false);
  }, [images, logo, settings]);

  const counts = useMemo(() => {
    const portrait = images.filter((i) => i.orientation === 'portrait').length;
    return { portrait, landscape: images.length - portrait };
  }, [images]);

  // clamp during render instead of syncing via an effect
  const safeIndex = activeIndex < images.length ? activeIndex : 0;
  const active = images[safeIndex] ?? null;

  useEffect(() => {
    activeIndexRef.current = safeIndex;
  }, [safeIndex]);

  return {
    logo,
    images,
    active,
    activeIndex: safeIndex,
    counts,
    settings,
    isZipping,
    zipProgress,
    actions: {
      onLogoUpload,
      onLogoClear,
      onAddImages,
      setPosition,
      setSizePct,
      setPaddingPct,
      setOpacity,
      setRotation,
      setTiled,
      setActivePreset,
      setActiveIntensity,
      applyPresetToAll,
    },
    setActiveIndex,
    removeImage,
    clearAll,
    prev,
    next,
    downloadAll,
  };
}
