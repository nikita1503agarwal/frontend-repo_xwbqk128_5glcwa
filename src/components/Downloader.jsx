import { useState } from 'react'
import { Download, Link as LinkIcon, Shield } from 'lucide-react'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Downloader() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  const handlePaste = async (e) => {
    setUrl(e.clipboardData?.getData('text') || url)
  }

  const resolve = async (e) => {
    e?.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const res = await fetch(`${BACKEND}/api/resolve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Failed to resolve')
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="w-full bg-white">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <form onSubmit={resolve} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-red-500/20">
            <LinkIcon className="w-4 h-4 text-gray-500" />
            <input
              type="url"
              required
              placeholder="Paste Instagram reel/post URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onPaste={handlePaste}
              className="w-full outline-none text-sm text-gray-800 placeholder:text-gray-400"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-white text-sm font-medium hover:bg-black disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            {loading ? 'Resolving…' : 'Get Video'}
          </button>
        </form>

        {error && (
          <p className="mt-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-md p-3">{error}</p>
        )}

        {result && (
          <div className="mt-6 rounded-lg border border-gray-200 p-4">
            <div className="flex items-start gap-4">
              {result.thumbnail && (
                <img src={result.thumbnail} alt="thumb" className="w-28 h-28 object-cover rounded" />
              )}
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                  {result.title || 'Resolved media'}
                </h3>
                <p className="mt-1 text-xs text-gray-500">{result.site_name || 'Instagram'}</p>

                {result.download_url ? (
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <a
                      href={`${BACKEND}/api/proxy?u=${encodeURIComponent(result.download_url)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-md bg-red-500 px-3 py-2 text-white text-sm font-medium hover:bg-red-600"
                    >
                      <Download className="w-4 h-4" /> Download
                    </a>
                    <a
                      href={result.download_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-gray-600 underline"
                    >
                      Open direct link
                    </a>
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-gray-700">
                    Could not resolve a direct URL for this link.
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
              <Shield className="w-3.5 h-3.5" />
              This tool fetches metadata only. Private links or content requiring login won’t work.
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
