const RateLimitedUI = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-red-100 border border-red-400 text-red-700 m-8 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Rate Limited!</strong>
        <span className="block sm:inline"> You have exceeded the rate limit. Please try again later.</span>
      </div>
    </div>
  )
}

export default RateLimitedUI
