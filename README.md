# Life Modelling · 改写你的人生底层代码

> 这不是一份人生规划指南，也不是一碗鸡汤。它是一个基于统计学的人生模拟器——用冷峻的数据告诉你真相。

**Life Modelling** 是一款免费的人生轨迹推演工具。它不贩卖焦虑，不美化未来——通过分析你当前的日常习惯，用概率模型推演你未来的人生轨迹，帮助你找到最值得改变的那个参数。

[→ 立即体验](https://lifemodelling.vercel.app)

---

## ✨ 核心功能

### 1. 看清现状
输入你当前的日常习惯（睡眠、饮食、运动、工作、休闲、健康），系统会基于统计学模型推演你在不同时间范围的轨迹。

- 年龄 < 25：推演未来 20 年
- 年龄 25-35：推演未来 15 年
- 年龄 35-45：推演未来 10 年
- 年龄 45-55：推演未来 8 年
- 年龄 > 55：推演未来 5 年

### 2. 找到核心参数
在分析了你的现状后，系统会识别出最能撬动你人生的 **1 个核心参数**——不是泛泛而谈，而是精准定位。

### 3. 个性化微行动
基于你的真实数据和生活习惯，为你生成 **3 个轻松到不可能失败** 的微行动。每个行动都：
- 门槛极低，2 分钟内可完成
- 嵌入已有习惯，不需要额外意志力
- 根据你的分数梯度定制（分数越低，行动越基础）

---

## 🎯 产品特点

- **数据驱动**：基于统计学模型，不美化、不鸡汤
- **年龄适应**：轨迹时间范围随年龄动态调整
- **真实轨迹**：好习惯 → 上升；坏习惯 → 下降
- **完全私密**：所有数据仅保存在本地 localStorage
- **无需登录**：打开即用，零门槛

---

## 🛠 技术栈

- **框架**: React + TypeScript + Vite
- **样式**: Tailwind CSS
- **字体**: Georgia (英文/数字) + Noto Serif SC (中文)
- **图表**: Canvas 自定义绘制
- **存储**: localStorage（纯本地，无后端）

---

## 🚀 快速开始

```bash
# 克隆仓库
git clone https://github.com/YOUR_USERNAME/life-modelling.git
cd life-modelling

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

---

## 📦 部署

项目已适配 Vercel、Netlify 等平台。直接部署 `index.html` 即可：

```bash
# Vercel
vercel --prod

# Netlify
netlify deploy --prod
```

或直接访问 [lifemodelling.vercel.app](https://lifemodelling.vercel.app) 在线体验。

---

## 📄 License

MIT License - 欢迎 Fork、Star 和二次开发。

---

*知道自己为什么而活的人，可以忍受任何一种生活。*
