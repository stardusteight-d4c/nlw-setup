import React from 'react'

interface Props {
  progress: number
}

export const ProgressBar = ({ progress }: Props) => {
  return (
    <div className="h-3 rounded-xl bg-zinc-700 w-full mt-4">
      <div
        role="progressbar"
        aria-label="Progresso de hábitos completados nesse dia"
        aria-valuenow={progress}
        style={{ width: `${progress}%` }}
        className="h-3 rounded-xl bg-violet-600"
      />
    </div>
  )
}
