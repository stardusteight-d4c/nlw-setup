interface Props {
  progress: number
}

export const ProgressBar = ({ progress }: Props) => {
  return (
    <div className={style.wrapper}>
      <div
        role="progressbar"
        aria-label="Progresso de hábitos completados nesse dia"
        aria-valuenow={progress}
        style={{ width: `${progress}%` }}
        className={style.progressBar}
      />
    </div>
  )
}

const style = {
  wrapper: `h-3 rounded-xl bg-zinc-700 w-full mt-4`,
  progressBar: `h-3 rounded-xl bg-violet-600 transition-all duration-200 ease-out`,
}
