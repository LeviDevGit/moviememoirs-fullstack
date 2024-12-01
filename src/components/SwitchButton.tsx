export default function SwitchButton() {
  return (
    <div className="flex items-center gap-3 text-white">
      <h2 className="font-bold">Clássico</h2>
      <label className="relative inline-block h-8 w-16">
        <input type="checkbox" className="peer hidden" />
        <span className="duration-400 absolute inset-0 cursor-pointer rounded-full bg-gray-300 transition peer-checked:bg-antique-ruby"></span>
        <span className="duration-400 absolute bottom-1 left-1 h-6 w-6 rounded-full bg-white transition-transform peer-checked:translate-x-8"></span>
      </label>
    </div>
  )
}
