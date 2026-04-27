# LifeForge - 人生建模与轨迹推演系统

## 1. Concept & Vision

**LifeForge** 是一款基于统计学和概率论的人生模拟器。它不贩卖焦虑，不美化未来——它用冷峻的数据告诉你：如果什么都不变，3年后的你会是什么样子。然后，它帮你找到那一个最能撬动人生的参数，给出一个轻松到不可能失败的微行动方案。

**核心体验**：像一个冷静的人生精算师，用数字而非鸡汤说话。

**情感基调**：清醒、理性、温和但直接。像一个懂你的老朋友，指出问题时不带评判，给出方案时充满信任。

## 2. Design Language

### 2.1 Aesthetic Direction
**参考风格**：线性代数笔记本 × 数据仪表盘 × 冥想应用的冷静感

- 大量留白，让数据呼吸
- 手写笔记感的细节装饰
- 深色模式为主（深夜反思的氛围）
- 流动的线条暗示人生的轨迹

### 2.2 Color Palette
```
--bg-primary: #0D0D0F          // 深空黑背景
--bg-secondary: #16161A        // 卡片背景
--bg-tertiary: #1E1E24         // 输入框背景
--text-primary: #FFFFFE        // 主文字
--text-secondary: #94A1B2     // 次要文字
--text-muted: #6B7280          // 弱化文字
--accent-cyan: #22D3EE         // 主强调色（冷色调代表理性）
--accent-amber: #FBBF24        // 警示色（现实轨迹）
--accent-emerald: #34D399      // 积极色（改变后轨迹）
--accent-rose: #FB7185          // 核心问题标识
--accent-violet: #A78BFA       // 微行动方案
--border: #2A2A32               // 边框色
```

### 2.3 Typography
- **标题**: "Space Grotesk" (几何感、未来感)
- **正文**: "Inter" (清晰、专业)
- **数据/数字**: "JetBrains Mono" (等宽，数据感)
- **手写装饰**: "Caveat" (笔记感)
- 备用: system-ui, sans-serif

### 2.4 Spatial System
- 基础单位: 8px
- 大量 padding: 24-48px
- 卡片圆角: 16px
- 输入框圆角: 12px
- 按钮圆角: 8px

### 2.5 Motion Philosophy
- **页面过渡**: 淡入淡出 + 轻微上移，400ms ease-out
- **数据揭示**: 数字滚动效果，从0计数到目标值
- **轨迹线条**: SVG path 绘制动画，线条逐渐展开
- **微交互**: 按钮hover scale 1.02，input focus 边框发光
- **警示/重点**: 轻微脉冲动画吸引注意力

## 3. Layout & Structure

### 3.1 整体架构
```
┌─────────────────────────────────────────────────────────┐
│  Header: Logo + 进度指示器 + 重置按钮                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │                                                   │   │
│  │              Main Content Area                    │   │
│  │           (根据Step动态切换)                      │   │
│  │                                                   │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  Footer: Step导航 + 继续/返回按钮                        │
└─────────────────────────────────────────────────────────┘
```

### 3.2 五大核心页面

#### Page 0: Welcome
- 大标题 + 副标题
- 简洁的3步骤预览
- "开始建模" CTA按钮
- 底部：为什么要做这个（简短说明）

#### Page 1: Daily Routine Input (日常细节输入)
- 分模块输入卡片
- 每个模块可折叠/展开
- 右侧实时更新的"探针问题"
- 保存后显示"探针清单"

#### Page 2: Current Trajectory (当前轨迹)
- 3年轨迹时间线可视化
- 关键人生指标卡片（健康/财务/关系/事业）
- "现实检验"警告框（不美化）
- 统计数据展示

#### Page 3: Desired Future & Core Parameter (目标设定 + 核心参数识别)
- 左侧：目标生活描述输入
- 右侧：与现状对比分析
- 底部：核心参数揭示（只有一个，rose色高亮）
- 解释为什么是这个参数

#### Page 4: Micro-Action Plan (微行动方案)
- 核心参数详细解读
- 每日微行动清单（极度简单）
- 新的3年轨迹预览（与原始轨迹对比）
- 自信度指示

## 4. Features & Interactions

### 4.1 Daily Routine Input 模块

**输入模块** (每个模块独立卡片):

1. **睡眠模块**
   - 睡觉时间 (时间选择器)
   - 起床时间
   - 睡眠质量 (1-5星)
   - 夜间醒来次数
   - 午睡习惯 (有/无/偶尔)

2. **饮食模块**
   - 早餐 (吃/不吃/偶尔)
   - 午餐时间 + 内容概要
   - 晚餐时间 + 是否规律
   - 零食频率
   - 喝水量 (杯/天)

3. **运动模块**
   - 每周运动次数
   - 运动类型
   - 每次运动时长
   - 久坐时长
   - 步数均值

4. **通勤与移动**
   - 通勤方式
   - 单程通勤时间
   - 通勤时做什么

5. **工作/学习**
   - 主要活动类型
   - 平均每日专注时长
   - 加班频率
   - 学习/成长时间

6. **休闲与社交**
   - 每日刷手机时长
   - 社交活动频率
   - 独处时间
   - 兴趣爱好

7. **健康习惯**
   - 体检频率
   - 不适症状
   - 压力水平 (1-10)

**探针机制 (Probe)**:
- 用户完成基础输入后，系统生成个性化探针问题
- 例如："你提到每天运动30分钟，但每周只有2次——其余5天是什么阻止了你运动？"
- 探针在右侧边栏动态出现
- 用户可选择回答、跳过、或标记"已解决"

### 4.2 人生轨迹推演引擎 (Step 1)

**算法逻辑**:

```
基础概率模型:

健康指数 = f(睡眠质量, 运动频率, 饮食规律, 压力水平)
财务指数 = f(收入水平, 支出结构, 通勤时间, 加班频率)
关系指数 = f(社交频率, 独处时间, 沟通质量)
成长指数 = f(专注时长, 学习时间, 反思习惯)

轨迹衰减因子:
- 每6个月，各指数基于当前状态自动衰减或增益
- 不做改变时，惯性会加强现有趋势（复利效应）
```

**输出指标**:
- 3年后的预测状态（健康/财务/关系/成长各维度）
- 关键转折点标记
- "如果你现在开始改变，最晚能在哪个时间点挽回"

**现实展示原则**:
- 不美化数据
- 显示概率区间（最佳/最可能/最差）
- 关键警告用rose色标识

### 4.3 核心参数识别 (Step 2)

**输入**: 用户描述的"理想未来生活"
- 城市偏好
- 生活节奏
- 社交圈层
- 财务目标
- 健康状态
- 每日日程预览

**对比分析**:
```
Gap Analysis = |Desired_State - Current_State|

Core_Parameter = argmax(Impact_Weight × Gap_Magnitude)
```

**输出原则**:
- 只输出1个核心参数
- 用rose色高亮
- 解释：为什么这个参数能撬动最多改变
- 显示：如果改变这个参数，能带动哪些次级参数改善

**示例**:
> "你的核心参数是：每日睡眠时间从11:30 PM延迟到10:30 PM"
> "原因：睡眠是健康的底层参数，它直接影响：次日专注力 → 学习效率 → 成长速度 → 财务状况 → 社交能量"
> "这个参数能带动：健康+15%，成长+12%，情绪稳定性+8%"

### 4.4 微行动方案 (Step 3)

**微行动设计原则**:
- 极其简单 (2分钟可完成)
- 不依赖意志力
- 融入现有习惯
- 立即可见效果

**方案结构**:
```
核心行动: [一个极度简单的动作]

触发器设计: [嵌入现有习惯的方案]
例如: "坐在床边时，做5个深呼吸" (嵌入"准备睡觉"习惯)

进度追踪: [极度轻量]
- 只记录"做了/没做"
- 不记录细节

抵抗预防: [预先解决阻碍]
- "如果加班到很晚，就..."
```

**新轨迹推演**:
- 仅改变核心参数
- 展示新的3年轨迹
- 与原始轨迹叠加对比
- 关键差异点标注

## 5. Component Inventory

### 5.1 ProgressIndicator
- 5个步骤圆点
- 当前步骤高亮(cyan)
- 已完成步骤填充(green)
- 未完成步骤空心(gray)
- 步骤间连接线

### 5.2 ModuleCard (输入模块卡片)
- 标题 + 图标
- 展开/折叠状态
- 内部表单组件
- 完整性指示器
- States: collapsed, expanded, valid, invalid

### 5.3 TimePicker
- 圆形时钟UI
- 拖拽选择
- 数字化显示
- 24小时制

### 5.4 RatingSlider
- 横向滑块
- 1-5或1-10刻度
- 实时数值显示
- 颜色渐变反馈

### 5.5 ProbeCard (探针卡片)
- 问题文本
- 回答/跳过/已解决按钮
- 回答后显示输入框
- 动画过渡

### 5.6 TrajectoryTimeline
- SVG时间轴
- 分支线条（原始vs新轨迹）
- 关键节点标记
- 悬停显示详情
- 动画绘制效果

### 5.7 MetricCard
- 指标名称
- 当前值 → 预测值
- 变化百分比
- 状态颜色编码
- 图标装饰

### 5.8 CoreParameterCard
- 高亮边框(rose)
- 参数名称
- 影响链可视化
- 解释文本
- 动画入场

### 5.9 MicroActionItem
- 序号
- 动作描述
- 触发器提示
- 完成复选框
- 简洁设计

### 5.10 ComparisonChart
- 双轨迹叠加
- 图例说明
- 差异标注
- 交互悬停

## 6. Technical Approach

### 6.1 技术栈
- **Framework**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context + useReducer
- **Data Persistence**: localStorage
- **Animation**: Framer Motion
- **Charts**: Recharts (轻量)

### 6.2 项目结构
```
src/
├── components/
│   ├── ui/           # 基础UI组件
│   ├── modules/      # 输入模块组件
│   ├── visualization/# 可视化组件
│   └── layout/       # 布局组件
├── context/          # 全局状态管理
├── hooks/            # 自定义hooks
├── utils/            # 工具函数
│   ├── trajectory.ts # 轨迹推演算法
│   ├── analyzer.ts   # 核心参数分析
│   └── generator.ts   # 微行动生成
├── types/            # TypeScript类型
├── data/             # 探针问题库
└── App.tsx
```

### 6.3 数据模型

```typescript
interface UserProfile {
  // 基础信息
  name?: string

  // 日常习惯
  dailyRoutine: {
    sleep: {
      bedtime: string      // "23:30"
      wakeTime: string
      quality: number       // 1-5
      nightWakeups: number
      napHabit: 'yes' | 'no' | 'sometimes'
    }
    diet: {
      breakfast: 'always' | 'sometimes' | 'never'
      lunchTime: string
      dinnerTime: string
      dinnerRegular: boolean
      snacksPerDay: number
      waterCups: number
    }
    exercise: {
      timesPerWeek: number
      type: string
      duration: number      // minutes
      sedentaryHours: number
      avgSteps: number
    }
    commute: {
      method: string
      duration: number      // minutes
      activity: string
    }
    work: {
      type: string
      focusHours: number
      overtimeFreq: 'never' | 'sometimes' | 'often'
      growthTime: number    // minutes per day
    }
    leisure: {
      screenTime: number    // hours per day
      socialFreq: number    // times per week
      aloneTime: number     // hours per day
      hobbies: string[]
    }
    health: {
      checkupFreq: string
      symptoms: string[]
      stressLevel: number   // 1-10
    }
  }

  // 探针回答
  probeAnswers: Record<string, string>

  // 目标未来
  desiredFuture: {
    city: string
    lifestyle: string
    relationships: string
    financial: string
    health: string
    dailySchedule: string
  }

  // 计算结果（自动生成）
  results?: {
    currentTrajectory: TrajectoryPoint[]
    coreParameter: string
    microActions: MicroAction[]
    newTrajectory: TrajectoryPoint[]
  }
}

interface TrajectoryPoint {
  month: number        // 0-36
  health: number       // 0-100
  finance: number
  relationships: number
  growth: number
  milestone?: string   // 关键事件
}

interface MicroAction {
  id: string
  action: string
  trigger: string
  duration: string     // "2 min"
  resistanceSolution: string
}
```

### 6.4 核心算法

**轨迹推演**:
- 使用马尔可夫链思想：当前状态决定下一步状态的概率分布
- 每个维度独立计算，然后整合
- 惯性因子：当前趋势越强，改变越难

**核心参数识别**:
- 构建人生参数影响图谱
- 计算每个参数对目标的影响力权重
- 选择"高影响力 × 大现状差距"的参数
- 贪心算法选择最优单个参数

**微行动生成**:
- 基于核心参数，设计最简行动
- 使用行为科学原理：摩擦最小化、即时奖励
- 提供if-then预案应对阻碍

## 7. 用户流程

```
[Welcome] → [Daily Input] → [Probes] → [Current Trajectory]
    ↓                                          ↓
    ← ← ← ← ← ← ← ← [Core Parameter] ← ← ← ← ←
    ↓
[Micro-Action Plan] → [New Trajectory Comparison]
    ↓
[Complete / Restart]
```

## 8. 响应式策略

- Mobile-first design
- 主要针对平板/手机（深夜反思场景）
- 桌面端扩展两栏布局
- 断点: 640px (sm), 768px (md), 1024px (lg)
