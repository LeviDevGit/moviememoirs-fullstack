export default function MediaBanner() {
  return (
    <div className="relative h-[350px] w-full overflow-hidden">
      <div className="flex">
        <img
          src="https://image.tmdb.org/t/p/original/gqTz24ZRsCP6AKjARmEivY7m0cK.jpg"
          alt="Banner"
          className="absolute inset-0 h-full w-full rounded-[10%] object-cover"
        />
        <div className="absolute h-full w-full bg-gradient-to-r from-background to-transparent to-[20%]"></div>
        <div className="absolute h-full w-full bg-gradient-to-l from-background to-transparent to-[20%]"></div>
      </div>
      <div className="absolute h-full w-full bg-gradient-to-t from-background from-[5%] to-transparent"></div>
    </div>
  )
}
