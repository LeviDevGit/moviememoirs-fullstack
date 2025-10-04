function Spinner() {
  return (
    <div className="flex items-center justify-center">
      <div
        className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  )
}

export default Spinner

// return (
//   <div className="flex h-full w-full items-center">
//     <div className="flex h-full w-full items-center justify-center border-red-500">
//       <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-primary"></div>
//     </div>
//   </div>
// )
