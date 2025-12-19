interface RatingCircleProps {
  value: number
  length: number
  size?: number | string
}

export default function RatingCircle({
  value,
  length,
  size,
}: RatingCircleProps) {
  const clampedValue = Math.min(5, Math.max(0, value))
  const percentage = (clampedValue / 5) * 100

  const radius = 45
  const circumference = 2 * Math.PI * radius
  const strokeDash = (percentage / 100) * circumference

  return (
    <div className="text-center">
      <div
        className="relative mx-auto"
        style={{ width: size, height: size }}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={5}
      >
        <svg className="h-full w-full" viewBox="0 0 100 100">
          {/* background */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-muted"
          />

          {/* progress */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray={`${strokeDash} ${circumference}`}
            strokeLinecap="round"
            className="origin-center text-green-600 transition-all duration-300"
            style={{ transform: 'rotate(-90deg)' }}
          />
        </svg>

        <div className="absolute inset-0 grid place-content-center">
          <span className="text-xl font-semibold">
            {clampedValue.toFixed(1)}
          </span>
        </div>
      </div>

      <p className="text-muted-foreground mt-2 text-sm">
        Baseado em {length} {length === 1 ? 'avaliação' : 'avaliações'}
      </p>
    </div>
  )
}
