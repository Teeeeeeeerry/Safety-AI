# Safety AI

English](README.md) | [中文](README.cn.md) 

A privacy-first parental-control Chrome extension that helps keep children safe on AI chat websites (ChatGPT, Claude, Gemini, and more). It scans page content for harmful material, tracks and limits daily screen time, and lets a parent block or allow specific AI sites. All data is stored locally on the device; nothing is sent to any server.

This folder is a built, ready-to-load extension (Manifest V3). There is no build step.

## Install

1. Open `chrome://extensions` in Chrome.
2. Turn on **Developer mode** (top-right).
3. Click **Load unpacked** and select this `SafekidExtension` folder.

## Features

- Safe Mode: scans allowed AI sites for harmful or inappropriate keywords.
- Screen-time tracking with daily limits that pause access once reached.
- Usage history with 1D / 7D / 30D / 1Y charts.
- Allow / block list for AI sites, plus custom sites.
- Parent password (PBKDF2-hashed) with a 60-second inactivity auto-lock.
- Draggable on-screen timer widget with safety reminders.

## Permissions

- `storage` — save settings and usage history locally.
- `scripting` — inject the widget and content scan into allowed sites.
- `declarativeNetRequest` — redirect blocked sites to a local page.
- `alarms` — one-minute tick for screen-time counting.
- `tabs` — read the active tab hostname to match allowed sites.
- Host access to AI domains (custom sites requested on demand).

## Folder contents

- `manifest.json` — extension manifest (MV3).
- `service-worker-loader.js` — background service worker entry.
- `content-script.js` — injected on allowed AI sites.
- `assets/` — bundled scripts and styles.
- `src/popup/popup.html` — toolbar popup.
- `src/pages/` — options, onboarding, and blocked pages.
- `src/assets/icons/` — extension icons.

## Privacy

No accounts, no analytics, no external servers. All settings and usage data stay in `chrome.storage.local` on the user's own device.

## Team

Built by Team Safekids at the University of Technology Sydney (UTS): Anna-Maria, Harrison, Huong, Sofia, Terry, Tom.
---

*最后编辑日期：2026-07-28*
