"use client"
import { useEffect, useRef, useState } from "react"

export default function PreviewPdf({ htmlCode }) {
    const iframeRef = useRef(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!iframeRef.current) return

        const iframe = iframeRef.current
        const doc = iframe.contentDocument || iframe.contentWindow?.document

        try {
            setIsLoading(true)
            setError(null)

            doc.open()
            doc.write(htmlCode)
            doc.close()

            iframe.onload = () => {
                setIsLoading(false)
                // Adjust iframe height to content
                const body = iframe.contentWindow.document.body
                const html = iframe.contentWindow.document.documentElement
                const height = Math.max(
                    body.scrollHeight,
                    body.offsetHeight,
                    html.clientHeight,
                    html.scrollHeight,
                    html.offsetHeight
                )
                iframe.style.height = height + 'px'
            }
        } catch (err) {
            setError('Failed to render preview')
            console.error('Preview error:', err)
            setIsLoading(false)
        }
    }, [htmlCode])

    return (
        <div className="relative w-full h-full">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                    <div className="animate-pulse text-gray-500">Loading preview...</div>
                </div>
            )}

            {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-red-50 text-red-500">
                    {error}
                </div>
            )}

            <iframe
                ref={iframeRef}
                className={`w-full border-0 ${isLoading ? 'opacity-0 h-0' : 'opacity-100'}`}
                title="HTML Preview"
                sandbox="allow-same-origin allow-scripts"
                style={{ minHeight: '500px' }}
            />
        </div>
    )
}

