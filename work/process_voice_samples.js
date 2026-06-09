const { execFileSync, spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = "/Users/nakaguchitakuya/Documents/Codex/2026-06-08/mon-01-vp-mp3-02-elearning";
const desktop = "/Users/nakaguchitakuya/Desktop";
const outDir = path.join(root, "outputs");
const workDir = path.join(root, "work");

const files = [
  "01_vp.mp3",
  "02_elearning.mp3",
  "03_webcm.mp3",
  "04_youtube.mp3",
  "05_audiobook.mp3",
];

const target = {
  i: -16,
  tp: -1.0,
  lra: 11,
};

fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(workDir, { recursive: true });

function run(command, args) {
  return execFileSync(command, args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
}

function runAll(command, args) {
  const result = spawnSync(command, args, { encoding: "utf8" });
  return {
    stdout: result.stdout || "",
    stderr: result.stderr || "",
    status: result.status,
  };
}

function probe(filePath) {
  const json = run("ffprobe", [
    "-v", "error",
    "-print_format", "json",
    "-show_format",
    "-show_streams",
    filePath,
  ]);
  const parsed = JSON.parse(json);
  const audioStream = parsed.streams.find((stream) => stream.codec_type === "audio") || {};
  return {
    duration: Number(parsed.format.duration),
    sizeBytes: Number(parsed.format.size),
    bitRate: Number(parsed.format.bit_rate),
    codec: audioStream.codec_name || "",
    sampleRate: Number(audioStream.sample_rate || 0),
    channels: Number(audioStream.channels || 0),
  };
}

function parseLoudnorm(text) {
  const match = text.match(/\{\s*"input_i"[\s\S]*?\}/);
  if (!match) {
    throw new Error(`Could not parse loudnorm JSON:\n${text}`);
  }
  const data = JSON.parse(match[0]);
  for (const key of Object.keys(data)) {
    const num = Number(data[key]);
    if (!Number.isNaN(num)) data[key] = num;
  }
  return data;
}

function loudnormMeasure(filePath, includeTrim) {
  const trim = "silenceremove=start_periods=1:start_duration=0.08:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_duration=0.16:start_threshold=-50dB,areverse";
  const norm = `loudnorm=I=${target.i}:TP=${target.tp}:LRA=${target.lra}:print_format=json`;
  const filter = includeTrim ? `${trim},${norm}` : norm;
  const result = runAll("ffmpeg", [
    "-hide_banner",
    "-nostats",
    "-i", filePath,
    "-af", filter,
    "-f", "null",
    "-",
  ]);
  return parseLoudnorm(result.stderr);
}

function silenceReport(filePath, duration) {
  const result = runAll("ffmpeg", [
    "-hide_banner",
    "-nostats",
    "-i", filePath,
    "-af", "silencedetect=noise=-50dB:d=0.1",
    "-f", "null",
    "-",
  ]);
  const text = result.stderr;
  let leading = 0;
  let trailing = 0;
  const firstStart = text.match(/silence_start: ([0-9.]+)/);
  const firstEnd = text.match(/silence_end: ([0-9.]+) \| silence_duration: ([0-9.]+)/);
  if (firstStart && Number(firstStart[1]) < 0.03 && firstEnd) {
    leading = Number(firstEnd[1]);
  }
  const starts = [...text.matchAll(/silence_start: ([0-9.]+)/g)].map((match) => Number(match[1]));
  const ends = [...text.matchAll(/silence_end: ([0-9.]+) \| silence_duration: ([0-9.]+)/g)].map((match) => Number(match[1]));
  const lastStart = starts.length ? starts[starts.length - 1] : null;
  const lastEnd = ends.length ? ends[ends.length - 1] : null;
  if (lastStart !== null && (lastEnd === null || lastEnd < lastStart) && duration - lastStart <= 3) {
    trailing = Math.max(0, duration - lastStart);
  }
  return { leading, trailing };
}

function normalize(inputPath, outputPath, measured) {
  const trim = "silenceremove=start_periods=1:start_duration=0.08:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_duration=0.16:start_threshold=-50dB,areverse";
  const norm = [
    `loudnorm=I=${target.i}`,
    `TP=${target.tp}`,
    `LRA=${target.lra}`,
    `measured_I=${measured.input_i}`,
    `measured_TP=${measured.input_tp}`,
    `measured_LRA=${measured.input_lra}`,
    `measured_thresh=${measured.input_thresh}`,
    "linear=false",
    "print_format=summary",
  ].join(":");
  runAll("ffmpeg", [
    "-hide_banner",
    "-y",
    "-i", inputPath,
    "-af", `${trim},${norm}`,
    "-codec:a", "libmp3lame",
    "-b:a", "192k",
    "-ar", "44100",
    outputPath,
  ]);
}

function fmtSeconds(value) {
  return `${value.toFixed(2)}s`;
}

function fmtBytes(bytes) {
  return `${(bytes / 1024).toFixed(0)}KB`;
}

const rows = [];

for (const file of files) {
  const inputPath = path.join(desktop, file);
  if (!fs.existsSync(inputPath)) {
    throw new Error(`Missing input file: ${inputPath}`);
  }
  const outputName = file.replace(/\.mp3$/, "_web.mp3");
  const outputPath = path.join(outDir, outputName);

  const originalProbe = probe(inputPath);
  const originalLoudness = loudnormMeasure(inputPath, false);
  const trimMeasure = loudnormMeasure(inputPath, true);
  const originalSilence = silenceReport(inputPath, originalProbe.duration);

  normalize(inputPath, outputPath, trimMeasure);

  const outputProbe = probe(outputPath);
  const outputLoudness = loudnormMeasure(outputPath, false);
  const outputSilence = silenceReport(outputPath, outputProbe.duration);

  rows.push({
    file,
    outputName,
    original: {
      ...originalProbe,
      loudness: originalLoudness,
      silence: originalSilence,
    },
    output: {
      ...outputProbe,
      loudness: outputLoudness,
      silence: outputSilence,
    },
  });
}

const reportPath = path.join(outDir, "voice_sample_web_report.md");
const jsonPath = path.join(workDir, "voice_sample_web_report.json");
fs.writeFileSync(jsonPath, JSON.stringify({ target, rows }, null, 2));

const lines = [];
lines.push("# MON Voice Sample Web Audio Report");
lines.push("");
lines.push(`Target loudness: ${target.i} LUFS integrated / true peak <= ${target.tp} dBTP / LRA ${target.lra}`);
lines.push("Processing: leading/trailing silence trim at -50 dB, two-pass loudnorm, MP3 192 kbps, 44.1 kHz.");
lines.push("");
lines.push("## Output Summary");
lines.push("");
lines.push("| File | Length | Integrated LUFS | True Peak dBTP | LRA | Size | Leading silence | Trailing silence |");
lines.push("|---|---:|---:|---:|---:|---:|---:|---:|");
for (const row of rows) {
  lines.push([
    `| ${row.outputName}`,
    fmtSeconds(row.output.duration),
    row.output.loudness.input_i.toFixed(1),
    row.output.loudness.input_tp.toFixed(1),
    row.output.loudness.input_lra.toFixed(1),
    fmtBytes(row.output.sizeBytes),
    fmtSeconds(row.output.silence.leading),
    `${fmtSeconds(row.output.silence.trailing)} |`,
  ].join(" | "));
}
lines.push("");
lines.push("## Before / After");
lines.push("");
lines.push("| Source | Before LUFS | After LUFS | Before TP | After TP | Before length | After length | Before size | After size |");
lines.push("|---|---:|---:|---:|---:|---:|---:|---:|---:|");
for (const row of rows) {
  lines.push([
    `| ${row.file}`,
    row.original.loudness.input_i.toFixed(1),
    row.output.loudness.input_i.toFixed(1),
    row.original.loudness.input_tp.toFixed(1),
    row.output.loudness.input_tp.toFixed(1),
    fmtSeconds(row.original.duration),
    fmtSeconds(row.output.duration),
    fmtBytes(row.original.sizeBytes),
    `${fmtBytes(row.output.sizeBytes)} |`,
  ].join(" | "));
}
lines.push("");
lines.push("## QA");
lines.push("");
for (const row of rows) {
  const tpOk = row.output.loudness.input_tp <= target.tp + 0.2;
  const loudnessOk = Math.abs(row.output.loudness.input_i - target.i) <= 1.0;
  lines.push(`- ${row.outputName}: loudness ${loudnessOk ? "OK" : "CHECK"}, true peak ${tpOk ? "OK" : "CHECK"}`);
}
lines.push("");
lines.push("No source files were modified.");

fs.writeFileSync(reportPath, `${lines.join("\n")}\n`);
console.log(reportPath);
console.log(jsonPath);
