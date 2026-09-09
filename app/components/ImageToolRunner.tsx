"use client";

import { useEffect, useId, useRef, useState } from "react";

type Output = { url: string; blob: Blob; name: string; width?: number; height?: number };
type Raster = { image: HTMLImageElement; width: number; height: number };
type Format = "image/jpeg" | "image/png" | "image/webp" | "image/avif";
type ConverterFormat = Format | "image/bmp";

const acceptImages = ".jpg,.jpeg,.png,.webp,.avif,.heic,.heif,image/jpeg,image/png,image/webp,image/avif,image/heic,image/heif";
const baseName = (name: string) => name.replace(/\.[^.]+$/, "") || "bild";
const formatSize = (bytes: number) => bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toLocaleString("de-DE", { maximumFractionDigits: 2 })} MB` : `${Math.max(1, Math.round(bytes / 1024)).toLocaleString("de-DE")} KB`;
const extFor = (format: ConverterFormat) => format === "image/jpeg" ? "jpg" : format === "image/png" ? "png" : format === "image/webp" ? "webp" : format === "image/avif" ? "avif" : "bmp";

async function normalizeBlob(file: File): Promise<Blob> {
  if (/hei[cf]/i.test(file.type) || /\.hei[cf]$/i.test(file.name)) {
    const heic2any = (await import("heic2any")).default;
    const converted = await heic2any({ blob: file, toType: "image/png", quality: 1 });
    return Array.isArray(converted) ? converted[0] : converted;
  }
  return file;
}

async function loadRaster(file: File): Promise<Raster> {
  const blob = await normalizeBlob(file);
  const url = URL.createObjectURL(blob);
  const image = new Image();
  image.decoding = "async";
  image.src = url;
  try {
    await image.decode();
    return { image, width: image.naturalWidth, height: image.naturalHeight };
  } finally {
    URL.revokeObjectURL(url);
  }
}

function canvasBlob(canvas: HTMLCanvasElement, format: Format, quality = 0.9) {
  return new Promise<Blob>((resolve, reject) => canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error(`ENCODE_UNSUPPORTED:${format}`)), format, quality));
}

function bmpBlob(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d")!;
  const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const rowSize = (canvas.width * 3 + 3) & ~3;
  const pixelSize = rowSize * canvas.height;
  const bytes = new Uint8Array(54 + pixelSize);
  const view = new DataView(bytes.buffer);
  bytes[0] = 0x42; bytes[1] = 0x4d;
  view.setUint32(2, bytes.length, true); view.setUint32(10, 54, true);
  view.setUint32(14, 40, true); view.setInt32(18, canvas.width, true); view.setInt32(22, canvas.height, true);
  view.setUint16(26, 1, true); view.setUint16(28, 24, true); view.setUint32(34, pixelSize, true);
  view.setInt32(38, 2835, true); view.setInt32(42, 2835, true);
  for (let y = 0; y < canvas.height; y++) {
    const targetRow = 54 + (canvas.height - 1 - y) * rowSize;
    for (let x = 0; x < canvas.width; x++) {
      const source = (y * canvas.width + x) * 4;
      const target = targetRow + x * 3;
      bytes[target] = data[source + 2]; bytes[target + 1] = data[source + 1]; bytes[target + 2] = data[source];
    }
  }
  return new Blob([bytes], { type: "image/bmp" });
}

function canvasFrom(image: HTMLImageElement, width = image.naturalWidth, height = image.naturalHeight, fill?: string) {
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(width));
  canvas.height = Math.max(1, Math.round(height));
  const ctx = canvas.getContext("2d", { alpha: true })!;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  if (fill) { ctx.fillStyle = fill; ctx.fillRect(0, 0, canvas.width, canvas.height); }
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas;
}

function useOutput() {
  const [output, setState] = useState<Output | null>(null);
  const outputRef = useRef<Output | null>(null);
  const setOutput = (value: Omit<Output, "url"> | null) => {
    if (outputRef.current) URL.revokeObjectURL(outputRef.current.url);
    const next = value ? { ...value, url: URL.createObjectURL(value.blob) } : null;
    outputRef.current = next;
    setState(next);
  };
  useEffect(() => () => { if (outputRef.current) URL.revokeObjectURL(outputRef.current.url); }, []);
  return [output, setOutput] as const;
}

function useFilePreview(file?: File) {
  const [preview, setPreview] = useState<{ file: File; src: string } | null>(null);
  useEffect(() => { let active = true; if (!file) return; loadRaster(file).then((raster) => { const scale = Math.min(1, 900 / Math.max(raster.width, raster.height)); const canvas = canvasFrom(raster.image, raster.width * scale, raster.height * scale); if (active) setPreview({ file, src: canvas.toDataURL("image/jpeg", .86) }); }).catch(() => undefined); return () => { active = false; }; }, [file]);
  return preview && preview.file === file ? preview.src : "";
}

function UploadZone({ files, onFiles, multiple = false, hint = "JPG, PNG, WebP, HEIC oder HEIF" }: { files: File[]; onFiles: (files: File[]) => void; multiple?: boolean; hint?: string }) {
  const id = useId();
  const [dragging, setDragging] = useState(false);
  const choose = (list: FileList | null) => {
    const next = Array.from(list ?? []).filter((file) => file.type.startsWith("image/") || /\.(jpe?g|png|webp|hei[cf])$/i.test(file.name));
    if (next.length) onFiles(multiple ? next : [next[0]]);
  };
  return <label className={`upload-zone ${dragging ? "is-dragging" : ""}`} htmlFor={id}
    onDragEnter={(event) => { event.preventDefault(); setDragging(true); }}
    onDragOver={(event) => { event.preventDefault(); event.dataTransfer.dropEffect = "copy"; setDragging(true); }}
    onDragLeave={(event) => { event.preventDefault(); if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setDragging(false); }}
    onDrop={(event) => { event.preventDefault(); setDragging(false); choose(event.dataTransfer.files); }}>
    <input id={id} type="file" accept={acceptImages} multiple={multiple} onChange={(event) => { choose(event.target.files); event.currentTarget.value = ""; }} />
    <span className="upload-icon" aria-hidden="true"><svg viewBox="0 0 32 32"><path d="M16 22V6m0 0-6 6m6-6 6 6M6 21v5h20v-5" /></svg></span>
    <strong>{files.length ? (files.length === 1 ? files[0].name : `${files.length} Bilder ausgewählt`) : "Bild hier ablegen oder auswählen"}</strong>
    <small>{hint} · Dateien bleiben auf deinem Gerät</small>
  </label>;
}

function ErrorNote({ error }: { error: string }) { return error ? <p className="error-note" role="alert">{error}</p> : null; }

function DownloadResult({ output, originalSize, label = "Datei herunterladen" }: { output: Output; originalSize?: number; label?: string }) {
  return <div className="image-result">
    {output.blob.type.startsWith("image/") && <div className="image-result-preview"><img src={output.url} alt="Vorschau der erzeugten Datei" /></div>}
    <div className="download-result"><div><strong>Fertig</strong><span>{output.width && output.height ? `${output.width} × ${output.height} px · ` : ""}{formatSize(output.blob.size)}{originalSize ? ` · vorher ${formatSize(originalSize)}` : ""}</span></div><a href={output.url} download={output.name}>{label}</a></div>
  </div>;
}

function ToolShell({ children }: { children: React.ReactNode }) {
  return <><p className="privacy-note image-privacy">Die Verarbeitung erfolgt lokal in deinem Browser. Deine Bilder werden nicht hochgeladen.</p>{children}</>;
}

function FormatConverter() {
  const [files, setFiles] = useState<File[]>([]); const file = files[0];
  const [format, setFormat] = useState<ConverterFormat>("image/jpeg"); const [quality, setQuality] = useState(90); const [busy, setBusy] = useState(false); const [error, setError] = useState(""); const [output, setOutput] = useOutput();
  const run = async () => { if (!file) return; setBusy(true); setError(""); try { const raster = await loadRaster(file); const canvas = canvasFrom(raster.image, raster.width, raster.height, format === "image/jpeg" || format === "image/bmp" ? "#fff" : undefined); const blob = format === "image/bmp" ? bmpBlob(canvas) : await canvasBlob(canvas, format, quality / 100); if (format === "image/avif" && blob.type !== "image/avif") throw new Error("ENCODE_UNSUPPORTED:image/avif"); setOutput({ blob, name: `${baseName(file.name)}.${extFor(format)}`, width: canvas.width, height: canvas.height }); } catch (caught) { setError(caught instanceof Error && caught.message === "ENCODE_UNSUPPORTED:image/avif" ? "Dein Browser kann AVIF noch nicht erzeugen. Nutze stattdessen WebP – es bietet ebenfalls kleine Dateien bei guter Bildqualität." : "Dieses Bildformat konnte dein Browser nicht lesen. Bitte prüfe die Datei oder verwende ein anderes Bild."); } finally { setBusy(false); } };
  const usesQuality = format === "image/jpeg" || format === "image/webp" || format === "image/avif";
  return <ToolShell><UploadZone files={files} onFiles={(next) => { setFiles(next); setOutput(null); }} hint="JPG, PNG, WebP, AVIF, HEIC oder HEIF" />{file && <div className="image-controls"><div><span className="control-label">Ausgabeformat</span><div className="format-buttons">{(["image/jpeg", "image/png", "image/webp", "image/avif", "image/bmp"] as ConverterFormat[]).map((item) => <button type="button" className={format === item ? "active" : ""} onClick={() => { setFormat(item); setOutput(null); setError(""); }} key={item}>{extFor(item).toUpperCase()}</button>)}</div></div>{usesQuality && <label className="range-field"><span>Bildqualität <b>{quality} %</b></span><input type="range" min="40" max="100" value={quality} onChange={(event) => setQuality(Number(event.target.value))} /></label>}<p className="form-hint">JPG für hohe Kompatibilität, PNG für Transparenz, WebP oder AVIF für kleine Webdateien und BMP für ältere Programme ohne moderne Formatunterstützung.</p><button className="primary-button" onClick={run} disabled={busy}>{busy ? "Bild wird umgewandelt …" : `In ${extFor(format).toUpperCase()} umwandeln`}</button></div>}<ErrorNote error={error} />{output && <DownloadResult output={output} originalSize={file?.size} />}</ToolShell>;
}

function hexRgb(hex: string) { const value = Number.parseInt(hex.slice(1), 16); return [(value >> 16) & 255, (value >> 8) & 255, value & 255] as const; }

function BackgroundRemover() {
  const [files, setFiles] = useState<File[]>([]); const file = files[0]; const [sensitivity, setSensitivity] = useState(42); const [mode, setMode] = useState<"auto" | "manual">("auto"); const [color, setColor] = useState("#ffffff"); const [busy, setBusy] = useState(false); const [error, setError] = useState(""); const [output, setOutput] = useOutput();
  const run = async () => { if (!file) return; setBusy(true); setError(""); try {
    const raster = await loadRaster(file); const maxPixels = 8_000_000; const scale = Math.min(1, Math.sqrt(maxPixels / (raster.width * raster.height))); const canvas = canvasFrom(raster.image, raster.width * scale, raster.height * scale); const ctx = canvas.getContext("2d")!; const data = ctx.getImageData(0, 0, canvas.width, canvas.height); const pixels = data.data; const w = canvas.width; const h = canvas.height;
    let reference: readonly number[] = hexRgb(color);
    if (mode === "auto") { const points = [[0, 0], [w - 1, 0], [0, h - 1], [w - 1, h - 1]]; reference = [0, 1, 2].map((channel) => Math.round(points.reduce((sum, [x, y]) => sum + pixels[(y * w + x) * 4 + channel], 0) / points.length)); }
    const limit = sensitivity * 2.25; const feather = Math.max(8, sensitivity * .35); const visited = new Uint8Array(w * h); const queue = new Int32Array(w * h); let head = 0; let tail = 0;
    const push = (index: number) => { if (!visited[index]) { visited[index] = 1; queue[tail++] = index; } };
    for (let x = 0; x < w; x++) { push(x); push((h - 1) * w + x); } for (let y = 1; y < h - 1; y++) { push(y * w); push(y * w + w - 1); }
    while (head < tail) { const index = queue[head++]; const offset = index * 4; const distance = Math.sqrt((pixels[offset] - reference[0]) ** 2 + (pixels[offset + 1] - reference[1]) ** 2 + (pixels[offset + 2] - reference[2]) ** 2); if (distance > limit + feather) continue; pixels[offset + 3] = distance <= limit ? 0 : Math.round(255 * (distance - limit) / feather); const x = index % w; if (x) push(index - 1); if (x < w - 1) push(index + 1); if (index >= w) push(index - w); if (index < w * (h - 1)) push(index + w); }
    ctx.putImageData(data, 0, 0); const blob = await canvasBlob(canvas, "image/png"); setOutput({ blob, name: `${baseName(file.name)}-freigestellt.png`, width: w, height: h });
  } catch { setError("Der Hintergrund konnte nicht entfernt werden. Verwende möglichst ein scharfes Motiv vor einem ruhigen Hintergrund."); } finally { setBusy(false); } };
  return <ToolShell><UploadZone files={files} onFiles={(next) => { setFiles(next); setOutput(null); }} hint="Am besten: deutliches Motiv vor einem gleichmäßigen Hintergrund" />{file && <div className="image-controls"><div><span className="control-label">Hintergrund erkennen</span><div className="format-buttons"><button className={mode === "auto" ? "active" : ""} onClick={() => setMode("auto")}>Automatisch über Bildränder</button><button className={mode === "manual" ? "active" : ""} onClick={() => setMode("manual")}>Farbe festlegen</button></div></div>{mode === "manual" && <label className="color-field"><span>Hintergrundfarbe</span><input type="color" value={color} onChange={(event) => setColor(event.target.value)} /></label>}<label className="range-field"><span>Empfindlichkeit <b>{sensitivity}</b></span><input type="range" min="10" max="90" value={sensitivity} onChange={(event) => setSensitivity(Number(event.target.value))} /></label><p className="form-hint">Eine höhere Empfindlichkeit entfernt größere Farbabweichungen. Beginne niedrig, damit feine Motivkanten erhalten bleiben.</p><button className="primary-button" onClick={run} disabled={busy}>{busy ? "Hintergrund wird entfernt …" : "Hintergrund entfernen"}</button></div>}<ErrorNote error={error} />{output && <DownloadResult output={output} originalSize={file?.size} label="Freigestelltes PNG herunterladen" />}</ToolShell>;
}

function ResizeTool() {
  const [files, setFiles] = useState<File[]>([]); const file = files[0]; const [width, setWidth] = useState(1200); const [height, setHeight] = useState(800); const [ratio, setRatio] = useState(1.5); const [locked, setLocked] = useState(true); const [busy, setBusy] = useState(false); const [error, setError] = useState(""); const [output, setOutput] = useOutput();
  const select = async (next: File[]) => { setFiles(next); setOutput(null); if (next[0]) try { const raster = await loadRaster(next[0]); setWidth(raster.width); setHeight(raster.height); setRatio(raster.width / raster.height); } catch { setError("Die Bildabmessungen konnten nicht gelesen werden."); } };
  const changeWidth = (value: number) => { setWidth(value); if (locked) setHeight(Math.max(1, Math.round(value / ratio))); }; const changeHeight = (value: number) => { setHeight(value); if (locked) setWidth(Math.max(1, Math.round(value * ratio))); };
  const run = async () => { if (!file || width < 1 || height < 1) return; setBusy(true); setError(""); try { const raster = await loadRaster(file); const canvas = canvasFrom(raster.image, width, height); const blob = await canvasBlob(canvas, "image/png"); setOutput({ blob, name: `${baseName(file.name)}-${width}x${height}.png`, width, height }); } catch { setError("Das Bild konnte nicht skaliert werden."); } finally { setBusy(false); } };
  return <ToolShell><UploadZone files={files} onFiles={select} />{file && <div className="image-controls"><div className="dimension-grid"><label><span>Breite in Pixeln</span><input type="number" min="1" max="12000" value={width} onChange={(event) => changeWidth(Number(event.target.value))} /></label><label><span>Höhe in Pixeln</span><input type="number" min="1" max="12000" value={height} onChange={(event) => changeHeight(Number(event.target.value))} /></label></div><label className="check-row"><input type="checkbox" checked={locked} onChange={(event) => setLocked(event.target.checked)} /> Seitenverhältnis beibehalten</label><button className="primary-button" onClick={run} disabled={busy}>{busy ? "Größe wird geändert …" : "Neue Bildgröße erstellen"}</button></div>}<ErrorNote error={error} />{output && <DownloadResult output={output} originalSize={file?.size} />}</ToolShell>;
}

type CropPreset = "frei" | "1:1" | "4:3" | "16:9" | "9:16";
function CropTool() {
  const [files, setFiles] = useState<File[]>([]); const file = files[0]; const [crop, setCrop] = useState({ x: 0, y: 0, w: 100, h: 100 }); const [preset, setPreset] = useState<CropPreset>("frei"); const [rotation, setRotation] = useState(0); const [flip, setFlip] = useState(false); const [busy, setBusy] = useState(false); const [error, setError] = useState(""); const [output, setOutput] = useOutput();
  const preview = useFilePreview(file);
  const choosePreset = (value: CropPreset) => { setPreset(value); if (value === "frei") return setCrop({ x: 0, y: 0, w: 100, h: 100 }); const [rw, rh] = value.split(":").map(Number); const ratio = rw / rh; if (ratio >= 1) { const h = 100 / ratio; setCrop({ x: 0, y: (100 - h) / 2, w: 100, h }); } else { const w = 100 * ratio; setCrop({ x: (100 - w) / 2, y: 0, w, h: 100 }); } };
  const setPart = (key: keyof typeof crop, value: number) => setCrop((current) => {
    const maximum = key === "x" ? 100 - current.w : key === "y" ? 100 - current.h : key === "w" ? 100 - current.x : 100 - current.y;
    return { ...current, [key]: Math.max(key === "w" || key === "h" ? 10 : 0, Math.min(maximum, value)) };
  });
  const run = async () => { if (!file) return; setBusy(true); setError(""); try { const raster = await loadRaster(file); const sx = raster.width * crop.x / 100; const sy = raster.height * crop.y / 100; const sw = raster.width * crop.w / 100; const sh = raster.height * crop.h / 100; const angle = rotation * Math.PI / 180; const sideways = rotation % 180 !== 0; const canvas = document.createElement("canvas"); canvas.width = Math.max(1, Math.round(sideways ? sh : sw)); canvas.height = Math.max(1, Math.round(sideways ? sw : sh)); const ctx = canvas.getContext("2d")!; ctx.translate(canvas.width / 2, canvas.height / 2); ctx.rotate(angle); ctx.scale(flip ? -1 : 1, 1); ctx.drawImage(raster.image, sx, sy, sw, sh, -sw / 2, -sh / 2, sw, sh); const blob = await canvasBlob(canvas, "image/png"); setOutput({ blob, name: `${baseName(file.name)}-zugeschnitten.png`, width: canvas.width, height: canvas.height }); } catch { setError("Der gewählte Bildausschnitt konnte nicht erstellt werden."); } finally { setBusy(false); } };
  return <ToolShell><UploadZone files={files} onFiles={(next) => { setFiles(next); setOutput(null); }} />{file && <div className="image-controls">{preview && <div className="crop-preview"><img src={preview} alt="Vorschau des gewählten Bildes" /><span style={{ left: `${crop.x}%`, top: `${crop.y}%`, width: `${crop.w}%`, height: `${crop.h}%` }} /></div>}<div><span className="control-label">Seitenverhältnis</span><div className="format-buttons">{(["frei", "1:1", "4:3", "16:9", "9:16"] as CropPreset[]).map((item) => <button className={preset === item ? "active" : ""} onClick={() => choosePreset(item)} key={item}>{item === "frei" ? "Gesamtes Bild" : item}</button>)}</div></div><div className="crop-sliders">{(["x", "y", "w", "h"] as const).map((key) => <label key={key}><span>{{ x: "Von links", y: "Von oben", w: "Breite", h: "Höhe" }[key]} <b>{Math.round(crop[key])} %</b></span><input type="range" min={key === "w" || key === "h" ? "10" : "0"} max="100" value={crop[key]} onChange={(event) => setPart(key, Number(event.target.value))} /></label>)}</div><div className="format-buttons"><button onClick={() => setRotation((rotation + 90) % 360)}>Um 90° drehen</button><button className={flip ? "active" : ""} onClick={() => setFlip(!flip)}>Horizontal spiegeln</button></div><button className="primary-button" onClick={run} disabled={busy}>{busy ? "Ausschnitt wird erstellt …" : "Bild zuschneiden"}</button></div>}<ErrorNote error={error} />{output && <DownloadResult output={output} originalSize={file?.size} />}</ToolShell>;
}

async function compressToTarget(image: HTMLImageElement, target: number, format: "image/jpeg" | "image/webp") {
  let width = image.naturalWidth; let height = image.naturalHeight; let best: Blob | null = null; let canvas = canvasFrom(image, width, height, "#fff");
  for (let resize = 0; resize < 4; resize++) { let low = .25; let high = .96; for (let attempt = 0; attempt < 9; attempt++) { const quality = (low + high) / 2; const blob = await canvasBlob(canvas, format, quality); if (blob.size <= target) { best = blob; low = quality; } else high = quality; } if (best) return { blob: best, width: canvas.width, height: canvas.height }; const minimum = await canvasBlob(canvas, format, .2); const scale = Math.min(.9, Math.sqrt(target / minimum.size) * .92); width = Math.max(320, Math.round(width * scale)); height = Math.max(240, Math.round(height * scale)); canvas = canvasFrom(image, width, height, "#fff"); }
  return { blob: await canvasBlob(canvas, format, .18), width: canvas.width, height: canvas.height };
}

function TargetCompression() {
  const [files, setFiles] = useState<File[]>([]); const file = files[0]; const [targetKb, setTargetKb] = useState(500); const [format, setFormat] = useState<"image/jpeg" | "image/webp">("image/jpeg"); const [busy, setBusy] = useState(false); const [error, setError] = useState(""); const [output, setOutput] = useOutput();
  const run = async () => { if (!file || targetKb < 20) return; setBusy(true); setError(""); try { const raster = await loadRaster(file); const result = await compressToTarget(raster.image, targetKb * 1024, format); setOutput({ blob: result.blob, name: `${baseName(file.name)}-${targetKb}kb.${extFor(format)}`, width: result.width, height: result.height }); if (result.blob.size > targetKb * 1024 * 1.05) setError("Die Zielgröße ließ sich ohne eine sehr kleine Bildauflösung nicht exakt erreichen. Die bestmögliche Version wurde erstellt."); } catch { setError("Das Bild konnte nicht auf die gewünschte Dateigröße gebracht werden."); } finally { setBusy(false); } };
  return <ToolShell><UploadZone files={files} onFiles={(next) => { setFiles(next); setOutput(null); }} />{file && <div className="image-controls"><div className="dimension-grid"><label><span>Maximale Dateigröße in KB</span><input type="number" min="20" max="20000" value={targetKb} onChange={(event) => setTargetKb(Number(event.target.value))} /></label><div><span className="control-label">Ausgabeformat</span><div className="format-buttons"><button className={format === "image/jpeg" ? "active" : ""} onClick={() => setFormat("image/jpeg")}>JPG</button><button className={format === "image/webp" ? "active" : ""} onClick={() => setFormat("image/webp")}>WebP</button></div></div></div><p className="form-hint">Das Tool sucht zuerst die höchste passende Qualität. Nur wenn das nicht reicht, wird die Auflösung vorsichtig reduziert.</p><button className="primary-button" onClick={run} disabled={busy}>{busy ? "Optimale Qualität wird gesucht …" : `Auf höchstens ${targetKb} KB verkleinern`}</button></div>}<ErrorNote error={error} />{output && <DownloadResult output={output} originalSize={file?.size} />}</ToolShell>;
}

function MetadataCleaner() {
  const [files, setFiles] = useState<File[]>([]); const file = files[0]; const [format, setFormat] = useState<Format>("image/jpeg"); const [busy, setBusy] = useState(false); const [error, setError] = useState(""); const [output, setOutput] = useOutput();
  const run = async () => { if (!file) return; setBusy(true); setError(""); try { const raster = await loadRaster(file); const canvas = canvasFrom(raster.image, raster.width, raster.height, format === "image/jpeg" ? "#fff" : undefined); const blob = await canvasBlob(canvas, format, .94); setOutput({ blob, name: `${baseName(file.name)}-ohne-metadaten.${extFor(format)}`, width: canvas.width, height: canvas.height }); } catch { setError("Das Bild konnte nicht neu gespeichert werden."); } finally { setBusy(false); } };
  return <ToolShell><UploadZone files={files} onFiles={(next) => { setFiles(next); setOutput(null); }} />{file && <div className="image-controls"><div><span className="control-label">Ausgabeformat</span><div className="format-buttons">{(["image/jpeg", "image/png", "image/webp"] as Format[]).map((item) => <button className={format === item ? "active" : ""} onClick={() => setFormat(item)} key={item}>{extFor(item).toUpperCase()}</button>)}</div></div><p className="form-hint">Das Bild wird vollständig neu aufgebaut. Standort, Kameramodell, Aufnahmedatum und eingebettete Vorschaubilder werden nicht übernommen.</p><button className="primary-button" onClick={run} disabled={busy}>{busy ? "Metadaten werden entfernt …" : "Saubere Bildkopie erstellen"}</button></div>}<ErrorNote error={error} />{output && <DownloadResult output={output} originalSize={file?.size} />}</ToolShell>;
}

function PassportPhoto() {
  const [files, setFiles] = useState<File[]>([]); const file = files[0]; const [zoom, setZoom] = useState(110); const [x, setX] = useState(0); const [y, setY] = useState(0); const [busy, setBusy] = useState(false); const [error, setError] = useState(""); const [output, setOutput] = useOutput();
  const preview = useFilePreview(file);
  const run = async () => { if (!file) return; setBusy(true); setError(""); try { const raster = await loadRaster(file); const canvas = document.createElement("canvas"); canvas.width = 413; canvas.height = 531; const ctx = canvas.getContext("2d")!; ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, canvas.width, canvas.height); const scale = Math.max(canvas.width / raster.width, canvas.height / raster.height) * zoom / 100; const dw = raster.width * scale; const dh = raster.height * scale; const dx = (canvas.width - dw) / 2 + x / 100 * Math.max(0, dw - canvas.width) / 2; const dy = (canvas.height - dh) / 2 + y / 100 * Math.max(0, dh - canvas.height) / 2; ctx.drawImage(raster.image, dx, dy, dw, dh); const blob = await canvasBlob(canvas, "image/jpeg", .95); setOutput({ blob, name: `${baseName(file.name)}-35x45mm.jpg`, width: 413, height: 531 }); } catch { setError("Das Passfoto konnte nicht erstellt werden."); } finally { setBusy(false); } };
  return <ToolShell><UploadZone files={files} onFiles={(next) => { setFiles(next); setOutput(null); }} hint="Frontales Foto mit ruhigem, hellem Hintergrund empfohlen" />{file && <div className="image-controls"><div className="passport-frame">{preview && <img src={preview} alt="Vorschau im Passfotoformat" style={{ transform: `translate(${x / 3}%, ${y / 3}%) scale(${zoom / 100})` }} />}<span>35 × 45 mm</span><div className="passport-head-guide" /></div><label className="range-field"><span>Vergrößerung <b>{zoom} %</b></span><input type="range" min="100" max="220" value={zoom} onChange={(event) => setZoom(Number(event.target.value))} /></label><div className="crop-sliders"><label><span>Horizontal verschieben</span><input type="range" min="-100" max="100" value={x} onChange={(event) => setX(Number(event.target.value))} /></label><label><span>Vertikal verschieben</span><input type="range" min="-100" max="100" value={y} onChange={(event) => setY(Number(event.target.value))} /></label></div><p className="form-hint">Das Tool erstellt nur Format und Ausschnitt. Ob ein Foto biometrische Vorgaben erfüllt, muss bei der zuständigen Stelle geprüft werden.</p><button className="primary-button" onClick={run} disabled={busy}>{busy ? "Foto wird erstellt …" : "Passfoto-Datei erstellen"}</button></div>}<ErrorNote error={error} />{output && <DownloadResult output={output} originalSize={file?.size} />}</ToolShell>;
}

function ascii(value: string) { return new TextEncoder().encode(value); }
function concatBytes(parts: Uint8Array[]) { const size = parts.reduce((sum, part) => sum + part.length, 0); const result = new Uint8Array(size); let offset = 0; for (const part of parts) { result.set(part, offset); offset += part.length; } return result; }
function jpegBytes(dataUrl: string) { const binary = atob(dataUrl.split(",")[1]); return Uint8Array.from(binary, (char) => char.charCodeAt(0)); }
function buildPdf(images: { bytes: Uint8Array; width: number; height: number }[]) {
  const objects: Uint8Array[] = []; const pageIds = images.map((_, index) => 3 + index); const add = (id: number, body: Uint8Array) => objects.push(concatBytes([ascii(`${id} 0 obj\n`), body, ascii("\nendobj\n")]));
  add(1, ascii("<< /Type /Catalog /Pages 2 0 R >>")); add(2, ascii(`<< /Type /Pages /Count ${images.length} /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] >>`));
  images.forEach((image, index) => { const pageId = 3 + index; const imageId = 3 + images.length + index; const contentId = 3 + images.length * 2 + index; const pageW = 595.28; const pageH = 841.89; const margin = 28; const scale = Math.min((pageW - margin * 2) / image.width, (pageH - margin * 2) / image.height); const drawW = image.width * scale; const drawH = image.height * scale; const left = (pageW - drawW) / 2; const bottom = (pageH - drawH) / 2; const content = `q ${drawW.toFixed(2)} 0 0 ${drawH.toFixed(2)} ${left.toFixed(2)} ${bottom.toFixed(2)} cm /Im${index} Do Q`; add(pageId, ascii(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageW} ${pageH}] /Resources << /XObject << /Im${index} ${imageId} 0 R >> >> /Contents ${contentId} 0 R >>`)); add(imageId, concatBytes([ascii(`<< /Type /XObject /Subtype /Image /Width ${image.width} /Height ${image.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${image.bytes.length} >>\nstream\n`), image.bytes, ascii("\nendstream")])); add(contentId, ascii(`<< /Length ${content.length} >>\nstream\n${content}\nendstream`)); });
  objects.sort((a, b) => Number(new TextDecoder().decode(a.slice(0, 8)).split(" ")[0]) - Number(new TextDecoder().decode(b.slice(0, 8)).split(" ")[0])); const header = ascii("%PDF-1.4\n%ST\n"); const offsets: number[] = [0]; let offset = header.length; for (const object of objects) { offsets.push(offset); offset += object.length; } const xrefAt = offset; const xref = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n${offsets.slice(1).map((value) => `${String(value).padStart(10, "0")} 00000 n `).join("\n")}\ntrailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefAt}\n%%EOF`; return new Blob([concatBytes([header, ...objects, ascii(xref)])], { type: "application/pdf" });
}

function ImagesToPdf() {
  const [files, setFiles] = useState<File[]>([]); const [busy, setBusy] = useState(false); const [error, setError] = useState(""); const [output, setOutput] = useOutput();
  const add = (next: File[]) => { setFiles((current) => [...current, ...next]); setOutput(null); };
  const move = (index: number, direction: number) => setFiles((current) => { const next = [...current]; const target = index + direction; if (target < 0 || target >= next.length) return current; [next[index], next[target]] = [next[target], next[index]]; return next; });
  const run = async () => { if (!files.length) return; setBusy(true); setError(""); try { const pages = []; for (const file of files) { const raster = await loadRaster(file); const max = 1800; const scale = Math.min(1, max / Math.max(raster.width, raster.height)); const canvas = canvasFrom(raster.image, raster.width * scale, raster.height * scale, "#fff"); pages.push({ bytes: jpegBytes(canvas.toDataURL("image/jpeg", .9)), width: canvas.width, height: canvas.height }); } const blob = buildPdf(pages); setOutput({ blob, name: "bilder.pdf" }); } catch { setError("Mindestens eines der Bilder konnte nicht in das PDF übernommen werden."); } finally { setBusy(false); } };
  return <ToolShell><UploadZone files={files} onFiles={add} multiple hint="Mehrere Bilder auswählen oder gemeinsam hier ablegen" />{files.length > 0 && <div className="image-controls"><ol className="file-order">{files.map((file, index) => <li key={`${file.name}-${file.lastModified}-${index}`}><span><b>{index + 1}</b>{file.name}<small>{formatSize(file.size)}</small></span><div><button onClick={() => move(index, -1)} disabled={index === 0} aria-label={`${file.name} nach oben verschieben`}>Nach oben</button><button onClick={() => move(index, 1)} disabled={index === files.length - 1} aria-label={`${file.name} nach unten verschieben`}>Nach unten</button><button onClick={() => setFiles(files.filter((_, item) => item !== index))}>Entfernen</button></div></li>)}</ol><button className="primary-button" onClick={run} disabled={busy}>{busy ? `PDF wird erstellt …` : `PDF mit ${files.length} ${files.length === 1 ? "Seite" : "Seiten"} erstellen`}</button></div>}<ErrorNote error={error} />{output && <DownloadResult output={output} label="PDF herunterladen" />}</ToolShell>;
}

function ColorCorrection() {
  const [files, setFiles] = useState<File[]>([]); const file = files[0]; const [brightness, setBrightness] = useState(0); const [contrast, setContrast] = useState(0); const [saturation, setSaturation] = useState(0); const [warmth, setWarmth] = useState(0); const [busy, setBusy] = useState(false); const [error, setError] = useState(""); const [output, setOutput] = useOutput();
  const run = async () => { if (!file) return; setBusy(true); setError(""); try { const raster = await loadRaster(file); const canvas = canvasFrom(raster.image); const ctx = canvas.getContext("2d")!; const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height); const data = imageData.data; const c = (100 + contrast) / 100; const s = (100 + saturation) / 100; for (let i = 0; i < data.length; i += 4) { const r = (data[i] - 128) * c + 128 + brightness * 2.2 + warmth * 1.1; const g = (data[i + 1] - 128) * c + 128 + brightness * 2.2; const b = (data[i + 2] - 128) * c + 128 + brightness * 2.2 - warmth * 1.1; const gray = .2126 * r + .7152 * g + .0722 * b; data[i] = Math.max(0, Math.min(255, gray + (r - gray) * s)); data[i + 1] = Math.max(0, Math.min(255, gray + (g - gray) * s)); data[i + 2] = Math.max(0, Math.min(255, gray + (b - gray) * s)); } ctx.putImageData(imageData, 0, 0); const blob = await canvasBlob(canvas, "image/jpeg", .94); setOutput({ blob, name: `${baseName(file.name)}-korrigiert.jpg`, width: canvas.width, height: canvas.height }); } catch { setError("Die Korrektur konnte auf dieses Bild nicht angewendet werden."); } finally { setBusy(false); } };
  const controls = [["Helligkeit", brightness, setBrightness], ["Kontrast", contrast, setContrast], ["Sättigung", saturation, setSaturation], ["Farbtemperatur", warmth, setWarmth]] as const;
  return <ToolShell><UploadZone files={files} onFiles={(next) => { setFiles(next); setOutput(null); }} />{file && <div className="image-controls"><div className="crop-sliders">{controls.map(([label, value, setter]) => <label key={label}><span>{label} <b>{value > 0 ? "+" : ""}{value}</b></span><input type="range" min="-50" max="50" value={value} onChange={(event) => setter(Number(event.target.value))} /></label>)}</div><div className="format-buttons"><button onClick={() => { setBrightness(0); setContrast(0); setSaturation(0); setWarmth(0); }}>Regler zurücksetzen</button></div><button className="primary-button" onClick={run} disabled={busy}>{busy ? "Korrektur wird angewendet …" : "Korrigiertes Bild erstellen"}</button></div>}<ErrorNote error={error} />{output && <DownloadResult output={output} originalSize={file?.size} />}</ToolShell>;
}

function buildIco(pngs: { size: number; bytes: Uint8Array }[]) { const headerSize = 6 + pngs.length * 16; const total = headerSize + pngs.reduce((sum, png) => sum + png.bytes.length, 0); const result = new Uint8Array(total); const view = new DataView(result.buffer); view.setUint16(0, 0, true); view.setUint16(2, 1, true); view.setUint16(4, pngs.length, true); let dataOffset = headerSize; pngs.forEach((png, index) => { const offset = 6 + index * 16; result[offset] = png.size === 256 ? 0 : png.size; result[offset + 1] = png.size === 256 ? 0 : png.size; result[offset + 2] = 0; result[offset + 3] = 0; view.setUint16(offset + 4, 1, true); view.setUint16(offset + 6, 32, true); view.setUint32(offset + 8, png.bytes.length, true); view.setUint32(offset + 12, dataOffset, true); result.set(png.bytes, dataOffset); dataOffset += png.bytes.length; }); return new Blob([result], { type: "image/x-icon" }); }

function FaviconTool() {
  const [files, setFiles] = useState<File[]>([]); const file = files[0]; const [busy, setBusy] = useState(false); const [error, setError] = useState(""); const [results, setResults] = useState<Output[]>([]);
  useEffect(() => () => results.forEach((result) => URL.revokeObjectURL(result.url)), [results]);
  const run = async () => { if (!file) return; setBusy(true); setError(""); results.forEach((result) => URL.revokeObjectURL(result.url)); try { const raster = await loadRaster(file); const sourceSize = Math.min(raster.width, raster.height); const sx = (raster.width - sourceSize) / 2; const sy = (raster.height - sourceSize) / 2; const pngs: { size: number; bytes: Uint8Array; blob: Blob }[] = []; for (const size of [16, 32, 48, 180, 192, 512]) { const canvas = document.createElement("canvas"); canvas.width = size; canvas.height = size; const ctx = canvas.getContext("2d")!; ctx.imageSmoothingQuality = "high"; ctx.drawImage(raster.image, sx, sy, sourceSize, sourceSize, 0, 0, size, size); const blob = await canvasBlob(canvas, "image/png"); pngs.push({ size, blob, bytes: new Uint8Array(await blob.arrayBuffer()) }); } const ico = buildIco(pngs.filter((item) => item.size <= 48)); setResults([{ blob: ico, url: URL.createObjectURL(ico), name: "favicon.ico" }, ...pngs.map((item) => ({ blob: item.blob, url: URL.createObjectURL(item.blob), name: item.size === 180 ? "apple-touch-icon.png" : `icon-${item.size}.png`, width: item.size, height: item.size }))]); } catch { setError("Aus diesem Bild konnten keine Favicons erstellt werden."); } finally { setBusy(false); } };
  return <ToolShell><UploadZone files={files} onFiles={(next) => { setFiles(next); setResults([]); }} hint="Quadratisches Logo empfohlen; andere Bilder werden mittig zugeschnitten" />{file && <div className="image-controls"><p className="form-hint">Erzeugt werden favicon.ico sowie PNG-Dateien für Browser, Apple-Geräte und Web-Apps.</p><button className="primary-button" onClick={run} disabled={busy}>{busy ? "Symbole werden erstellt …" : "Favicon-Paket erstellen"}</button></div>}<ErrorNote error={error} />{results.length > 0 && <div className="favicon-results">{results.map((result) => <a href={result.url} download={result.name} key={result.name}><span>{result.width ? `${result.width} × ${result.height}` : "ICO"}</span><strong>{result.name}</strong><small>{formatSize(result.blob.size)}</small></a>)}</div>}</ToolShell>;
}

const imageTools: Record<string, React.ReactNode> = {
  "bildformat-konverter": <FormatConverter />,
  "hintergrund-entfernen": <BackgroundRemover />,
  "bildgroesse-aendern": <ResizeTool />,
  "bild-zuschneiden-drehen": <CropTool />,
  "bild-dateigroesse-komprimieren": <TargetCompression />,
  "bild-metadaten-entfernen": <MetadataCleaner />,
  "passfoto-zuschneiden": <PassportPhoto />,
  "bilder-zu-pdf": <ImagesToPdf />,
  "bildfarben-korrigieren": <ColorCorrection />,
  "favicon-erstellen": <FaviconTool />,
};

export function ImageToolRunner({ slug }: { slug: string }) { return imageTools[slug] ?? null; }
export const imageToolSlugs = Object.keys(imageTools);
