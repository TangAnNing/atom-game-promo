# 原子游创宣传片工程

这是「原子游创」展厅宣传片的 Remotion 制作工程。宣传片展示一条从 AI 游戏创作到社区游玩的完整链路：Dora SSR 负责理解需求、生成和调试，DSGO 负责让游戏被发现、被游玩、被讨论并继续创作。

## 产品定位

### 原子游创

面向 AI 开源游戏创作的共创平台，连接游戏创作者、玩家、开发者、赛事和合作机构。

### Dora SSR

原子游创的多语言编码智能体与创作引擎。它可以理解自然语言需求，在 Lua、TypeScript、Rust、C# 等语言环境中协助编码、调试和验证，并把创意推进到可运行的游戏结果。

### DSGO

面向玩家和创作者的产品入口。用户可以像刷短视频一样发现游戏，直接游玩，进入作品详情，参与讨论，也可以在平台内发起新的创作。DSGO 的创作能力由 Dora SSR 驱动，但 DSGO 本身同时承担发现、游玩、交流和创作场景。

## 宣传片内容

当前最新版约 `104.53 秒`，画幅 `1920×1080`、`16:9`、`30fps`，使用 H.264 视频和 AAC 双声道音频。

| 时间 | 内容 |
| --- | --- |
| 0:00–0:06 | 原子游创品牌开场与平台定位 |
| 0:06–0:11 | 游戏、AI、开源三种能力建立关系 |
| 0:11–0:16 | Dora SSR 产品与 Logo |
| 0:16–0:26 | 多语言支持与编码智能体能力 |
| 0:26–0:38 | Dora 真实创作过程与可运行游戏结果 |
| 0:38–0:42 | DSGO Logo，明确 Dora SSR 驱动 DSGO |
| 0:42–0:60 | DSGO 发现、详情和游玩 |
| 1:00–1:13 | 手机与掌机游玩体验 |
| 1:13–1:19 | DSGO 内发起创作与社区交流 |
| 1:19–1:28 | 赛事、作品展示和瀑布墙 |
| 1:28–1:38 | 奖项、承办协办单位与合作机构 |
| 1:38–1:45 | 原子游创品牌收束 |

## 工程结构

- `promo-video/`：React、TypeScript 与 Remotion 视频工程
- `promo-video/src/promo/AtomGamePromo.tsx`：主宣传片场景编排
- `promo-video/src/promo/timeline.ts`：当前生效的帧级时间线
- `promo-video/src/dsgo-segment/`：DSGO 与 Dora 功能段场景和设计规格
- `promo-video/public/media/`：宣传片使用的产品录屏、图标和合作机构素材
- `images/`：原始及补充素材
- `styleframes/`：前期视觉样稿
- `项目交接说明.md`：版本约束与验收流程

## 本地运行

需要 Node.js 和 Git LFS。在 `promo-video` 目录执行：

```powershell
npm install
npm run dev
```

类型检查：

```powershell
npx tsc --noEmit
```

渲染主宣传片：

```powershell
npx remotion render src/index.ts AtomGamePromo "out/原子游创宣传片-候选.mp4" --codec=h264 --crf=18 --concurrency=4
```

当前本地交付文件为 `promo-video/out/原子游创宣传片-最终版.mp4`。成片输出和 QA 抽帧默认不纳入 Git 跟踪；源码、产品素材和 Git LFS 文件可以复现完整视频。

## 修改原则

修改前请先阅读 `项目交接说明.md`。产品逻辑必须保持为：

`Dora SSR 能力 → Dora 创作与结果 → DSGO 发现/游玩/交流/创作 → 赛事与开放生态`

所有产品页面镜头优先使用真实录屏；文案应具体说明功能和收益，不虚构尚未存在的完整业务流程。

## 素材与授权

视频、演示素材及商业计划书仅用于本项目协作。音频来源记录位于 `promo-video/public/audio/ATTRIBUTION.md`；标记为“待考”或“商用前复核”的素材，在正式商业发布前仍需完成授权确认。
