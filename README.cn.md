# Safety AI（中文）

[English](README.md) | [中文](README.cn.md) 

一款注重隐私的家长监护 Chrome 扩展，帮助孩子在 AI 聊天网站（ChatGPT、Claude、Gemini 等）上保持安全。它会扫描页面中的有害内容、记录并限制每日使用时长，并允许家长屏蔽或放行指定的 AI 网站。所有数据仅保存在本地设备，不会上传到任何服务器。

本文件夹是已构建、可直接加载的扩展（Manifest V3），无需再编译。

## 安装

1. 在 Chrome 中打开 `chrome://extensions`。
2. 打开右上角的 **开发者模式**。
3. 点击 **加载已解压的扩展程序**，选择此 `SafekidExtension` 文件夹。

## 功能

- 安全模式：扫描已放行的 AI 网站中的有害或不当关键词。
- 屏幕使用时间统计，达到每日上限后自动停止访问。
- 使用历史图表（1天 / 7天 / 30天 / 1年）。
- AI 网站的放行 / 屏蔽名单，并可添加自定义网站。
- 家长密码（PBKDF2 加密），60 秒无操作自动锁定。
- 可拖动的屏幕计时小组件，附带安全提醒。

## 权限说明

- `storage` — 本地保存设置与使用历史。
- `scripting` — 向放行网站注入小组件与内容扫描。
- `declarativeNetRequest` — 将被屏蔽网站重定向到本地页面。
- `alarms` — 每分钟计时一次，统计使用时长。
- `tabs` — 读取当前标签页域名以匹配放行网站。
- AI 域名的主机权限（自定义网站按需申请）。

## 文件夹结构

- `manifest.json` — 扩展清单（MV3）。
- `service-worker-loader.js` — 后台服务工作线程入口。
- `content-script.js` — 注入到放行 AI 网站的脚本。
- `assets/` — 打包后的脚本与样式。
- `src/popup/popup.html` — 工具栏弹窗。
- `src/pages/` — 设置、引导与屏蔽页面。
- `src/assets/icons/` — 扩展图标。

## 隐私

无账号、无分析统计、无外部服务器。所有设置与使用数据都保存在本地设备的 `chrome.storage.local` 中。

## 团队

由悉尼科技大学（UTS）Team Safekids 制作：Anna-Maria、Harrison、Huong、Sofia、Terry、Tom。

*最后编辑日期：2026-08-04*
