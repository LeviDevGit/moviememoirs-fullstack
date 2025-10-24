interface DetailSynopsisProps {
  plot?: string | undefined
}

function DetailSynopsis({ plot }: DetailSynopsisProps) {
  if (!plot) return null

  return (
    <div className="h-full w-full">
      <h2>Sinopse</h2>
      <p className="line-clamp-4 h-[100px] w-full select-none text-justify text-[#9ab]">
        {plot}
      </p>
    </div>
  )
}

export default DetailSynopsis
