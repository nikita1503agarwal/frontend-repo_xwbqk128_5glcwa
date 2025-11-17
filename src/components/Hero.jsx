import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative w-full min-h-[320px] sm:min-h-[420px] lg:min-h-[520px] flex items-center justify-center overflow-hidden bg-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/k3vzWf8TfEDJKl71/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-16 text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 backdrop-blur px-3 py-1 text-xs text-gray-700">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
          Private • No sign‑up • Straight to the file
        </div>
        <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-gray-900">
          Minimal Reel/Video Downloader
        </h1>
        <p className="mt-3 text-gray-600">
          Paste a public Instagram link. Get the video. That’s it.
        </p>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 from-white via-white/80 to-transparent bg-gradient-to-t" />
    </section>
  )
}
