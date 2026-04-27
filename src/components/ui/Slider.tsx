import { InputHTMLAttributes, forwardRef } from 'react'

interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  min?: number
  max?: number
  showValue?: boolean
  valueDisplay?: string
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ label, min = 1, max = 10, showValue = true, valueDisplay, className = '', ...props }, ref) => {
    const value = Number(props.value || props.defaultValue || min)
    const percentage = ((value - min) / (max - min)) * 100

    return (
      <div className="w-full">
        {label && (
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-text-secondary">
              {label}
            </label>
            {showValue && (
              <span className="text-sm font-mono text-accent-cyan">
                {valueDisplay || value}
              </span>
            )}
          </div>
        )}
        <div className="relative">
          <div className="absolute inset-0 h-2 top-1/2 -translate-y-1/2 rounded-full bg-bg-tertiary" />
          <div
            className="absolute h-2 top-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-accent-cyan to-accent-emerald"
            style={{ width: `${percentage}%` }}
          />
          <input
            ref={ref}
            type="range"
            min={min}
            max={max}
            className={`
              relative w-full h-2 appearance-none bg-transparent
              focus:outline-none
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-5
              [&::-webkit-slider-thumb]:h-5
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-accent-cyan
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:shadow-lg
              [&::-webkit-slider-thumb]:shadow-accent-cyan/30
              [&::-webkit-slider-thumb]:transition-transform
              [&::-webkit-slider-thumb]:hover:scale-110
              ${className}
            `}
            {...props}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-xs text-text-muted">{min}</span>
          <span className="text-xs text-text-muted">{max}</span>
        </div>
      </div>
    )
  }
)

Slider.displayName = 'Slider'