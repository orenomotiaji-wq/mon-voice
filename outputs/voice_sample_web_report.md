# MON Voice Sample Web Audio Report

Target loudness: -16 LUFS integrated / true peak <= -1 dBTP / LRA 11
Processing: leading/trailing silence trim at -50 dB, two-pass loudnorm, MP3 192 kbps, 44.1 kHz.

## Output Summary

| File | Length | Integrated LUFS | True Peak dBTP | LRA | Size | Leading silence | Trailing silence |
|---|---:|---:|---:|---:|---:|---:|---:|
| 01_vp_web.mp3 | 23.04s | -16.0 | -1.2 | 3.6 | 542KB | 0.00s | 0.00s |
| 02_elearning_web.mp3 | 21.06s | -16.7 | -1.3 | 3.8 | 496KB | 0.00s | 0.00s |
| 03_webcm_web.mp3 | 14.15s | -15.8 | -1.2 | 1.2 | 333KB | 0.00s | 0.00s |
| 04_youtube_web.mp3 | 21.14s | -16.2 | -1.2 | 2.9 | 497KB | 0.00s | 0.00s |
| 05_audiobook_web.mp3 | 24.33s | -15.9 | -1.2 | 4.1 | 572KB | 0.00s | 0.00s |

## Before / After

| Source | Before LUFS | After LUFS | Before TP | After TP | Before length | After length | Before size | After size |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| 01_vp.mp3 | -29.6 | -16.0 | -13.6 | -1.2 | 26.07s | 23.04s | 615KB | 542KB |
| 02_elearning.mp3 | -28.6 | -16.7 | -9.3 | -1.3 | 22.57s | 21.06s | 533KB | 496KB |
| 03_webcm.mp3 | -22.6 | -15.8 | -5.4 | -1.2 | 15.80s | 14.15s | 374KB | 333KB |
| 04_youtube.mp3 | -25.4 | -16.2 | -9.2 | -1.2 | 23.20s | 21.14s | 548KB | 497KB |
| 05_audiobook.mp3 | -29.6 | -15.9 | -14.7 | -1.2 | 27.43s | 24.33s | 647KB | 572KB |

## QA

- 01_vp_web.mp3: loudness OK, true peak OK
- 02_elearning_web.mp3: loudness OK, true peak OK
- 03_webcm_web.mp3: loudness OK, true peak OK
- 04_youtube_web.mp3: loudness OK, true peak OK
- 05_audiobook_web.mp3: loudness OK, true peak OK

No source files were modified.
