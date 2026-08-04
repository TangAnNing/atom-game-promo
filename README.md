# 原子游创宣传片

用于展厅循环播放的「原子游创」品牌宣传片工程。成片围绕原子游创、核心产品 Dora SSR、游戏发现与游玩、社区反馈、创作入口、赛事及开源生态展开。

## 当前成片

- 文件：`promo-video/out/原子游创宣传片-最终成片.mp4`
- 规格：1920x1080、16:9、30fps
- 编码：H.264 视频、AAC 双声道
- 时长：约 80.02 秒

## 工程结构

- `promo-video/`：React、TypeScript 与 Remotion 视频工程
- `promo-video/src/promo/timeline.ts`：当前生效的时间线
- `promo-video/src/promo/AtomGamePromo.tsx`：正式成片场景编排
- `images/`：原始及补充素材
- `styleframes/`：前期视觉样稿
- `项目交接说明.md`：当前版本约束与验收流程
- `原子游创商业计划书.pptx`：项目背景资料

## 本地运行

需要 Node.js，并确保 Git LFS 已安装。在 `promo-video` 目录执行：

```powershell
npm install
npm run dev
```

类型检查：

```powershell
npx tsc --noEmit
```

渲染候选片：

```powershell
npx remotion render src/index.ts AtomGamePromo "out/原子游创宣传片-候选.mp4" --codec h264 --audio-codec aac --overwrite
```

## 修改原则

继续修改前请先阅读 `项目交接说明.md`。赛事三卡镜面展示、作品瀑布墙参数与结尾品牌收束均属于已确认结构，不应退回旧实现。Agent 创作、二创、开源和发布目前只做概念表达，不虚构完整产品流程。

## 素材与授权

视频、演示素材及商业计划书仅用于本项目协作。音频来源记录位于 `promo-video/public/audio/ATTRIBUTION.md`；其中标记为“待考”或“商用前复核”的素材，在正式商业发布前仍需完成授权确认。
