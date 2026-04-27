import { motion } from 'framer-motion'
import { Button } from '../ui/Button'

interface WelcomePageProps {
  onStart: () => void
}

export function WelcomePage({ onStart }: WelcomePageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-2xl text-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <div className="text-6xl mb-4">⚡</div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-text-primary mb-4">
            LifeForge
          </h1>
          <p className="font-hand text-2xl text-accent-cyan">
            人生建模 · 轨迹推演 · 改写参数
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-lg text-text-secondary mb-8 leading-relaxed"
        >
          这不是一份人生规划指南，也不是一碗鸡汤。
          <br />
          它是一个基于统计学的人生模拟器——
          <span className="text-accent-rose">用冷峻的数据告诉你真相</span>。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="grid md:grid-cols-3 gap-4 mb-10"
        >
          {[
            { num: '01', title: '看清现状', desc: '不做任何改变，3年后你会是什么样子' },
            { num: '02', title: '找到核心', desc: '对比理想与现实，识别最关键的1个参数' },
            { num: '03', title: '微行动', desc: '每天一个轻松到不可能失败的动作' }
          ].map((item, i) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              className="bg-bg-secondary rounded-card border border-border p-5 text-left"
            >
              <span className="font-mono text-accent-cyan text-sm">{item.num}</span>
              <h3 className="font-display font-semibold text-text-primary mt-2 mb-1">{item.title}</h3>
              <p className="text-sm text-text-secondary">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <Button size="lg" onClick={onStart}>
            开始人生建模 →
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-8 text-sm text-text-muted"
        >
          预计耗时：15-20分钟 · 所有数据仅保存在本地
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 text-center"
      >
        <p className="text-xs text-text-muted mb-2">为什么要做这个？</p>
        <p className="text-sm text-text-secondary max-w-md">
          "大多数人的失败，不是因为不知道目标在哪里，
          <br />
          而是因为没有看清脚下每一步正在把他们带向何方。"
        </p>
      </motion.div>
    </div>
  )
}