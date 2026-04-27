# MEMORY.md

## Project: Life Modelling（人生建模术）

### Overview
单文件 HTML 应用，用于人生建模和轨迹推演。

### Brand Update (2026-04-05)
- 品牌名：LifeForge → **Life Modelling（改写你的人生底层代码）**
- 图标：⚡ → ◇
- 字体：英文/数字用 Georgia，中文用 Noto Serif SC / 宋体
- 配色：深灰背景 (#1a1a1e) + 柔和粉色 (#C9A0A0)
- 图表：**3年轨迹现为折线图**（Canvas绘制），包含健康/财务/关系/成长四条线

### Core Features
1. **Daily Routine Input** - 用户输入年龄 + 睡眠、饮食、运动、工作、休闲、健康6大模块
2. **Trajectory Simulation** - 基于年龄推演未来不同时间范围的人生轨迹（年龄越小，看的越远）：
   - 25岁以下：20年轨迹
   - 25-35岁：15年轨迹
   - 35-45岁：10年轨迹
   - 45-55岁：8年轨迹
   - 55岁以上：5年轨迹
3. **Core Parameter Analysis** - 识别最能撬动人身的1个核心参数
4. **Micro-action Plan** - 生成轻松可执行的微行动方案

### Technical
- 纯 HTML/CSS/JS 单文件实现
- Tailwind CSS via CDN
- 数据存储在 localStorage
- 算法：基于马尔可夫链的轨迹推演

### Files
- `/Users/sxxxx/WorkBuddy/20260405205759/SPEC.md` - 详细设计规格
- `/Users/sxxxx/WorkBuddy/20260405205759/index.html` - 主应用（单文件）
- `/Users/sxxxx/WorkBuddy/20260405205759/src/` - React/TypeScript 源码（备用）