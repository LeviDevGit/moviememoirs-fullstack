interface DetailGenreProps {
  genres?: string[] | undefined
}

function DetailGenre({ genres }: DetailGenreProps) {
  if (!genres || genres.length === 0) {
    return null
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col items-start gap-2">
        <h2>Tags</h2>
        {genres.map((genre, index) => (
          <p
            className="inline-block whitespace-nowrap rounded-[3px] bg-[#283038] px-[6px] py-[3px] leading-[1.5] text-[#9ab] shadow-inner shadow-[hsla(0,0%,100%,0.05)]"
            key={index}
          >
            {genre}
          </p>
        ))}
      </div>
    </div>
  )
}

export default DetailGenre
