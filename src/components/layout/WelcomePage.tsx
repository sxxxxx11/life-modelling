import { motion } from 'framer-motion'
import { useI18n } from '../../i18n'
import { Button } from '../ui/Button'

interface WelcomePageProps {
  onStart: () => void
}

export function WelcomePage({ onStart }: WelcomePageProps) {
  const { t } = useI18n()

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
          <div className="text-6xl mb-4">◇</div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-text-primary mb-4">
            LifeForge
          </h1>
          <p className="font-hand text-2xl text-accent-cyan">
            {t.welcome.subtitle}
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-lg text-text-secondary mb-8 leading-relaxed whitespace-pre-line"
        >
          {t.welcome.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="grid md:grid-cols-3 gap-4 mb-10"
        >
          {[
            { num: '01', title: t.welcome.step1Title, desc: t.welcome.step1Desc },
            { num: '02', title: t.welcome.step2Title, desc: t.welcome.step2Desc },
            { num: '03', title: t.welcome.step3Title, desc: t.welcome.step3Desc }
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
            {t.welcome.startButton}
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-8 text-sm text-text-muted"
        >
          {t.welcome.timeEstimate}
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 text-center"
      >
        <p className="text-xs text-text-muted mb-2">{t.welcome.whyTitle}</p>
        <p className="text-sm text-text-secondary max-w-md whitespace-pre-line">
          {t.welcome.whyQuote}
        </p>
      </motion.div>
    </div>
  )
}
