import { useAtom } from 'jotai'
import { useState, useCallback } from 'react'
import { pdfjs, Document, Page } from 'react-pdf'
import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api'
import { resumeAtom } from '../../atoms/resume'

const workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc

export function Preview() {
  const [resume] = useAtom(resumeAtom)
  const [, setPageCount] = useState(1)
  const [pageNumber] = useState(1)
  const [scale] = useState(document.body.clientWidth > 1440 ? 1.75 : 1)

  const handleDocumentLoadSuccess = useCallback((pdf) => {
    setPageCount(pdf.numPages)
  }, [])

  return (
    <output className="grid-area-preview bg-neutral-800 overflow-y-auto">
      <button
        className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 m-4 rounded"
        onClick={() => window.open(resume.url)}
      >
        export as pdf
      </button>
      <article className="w-full h-full">
        <Document
          file={resume.url || '/blank.pdf'}
          onLoadSuccess={handleDocumentLoadSuccess}
          loading=""
          className="w-full"
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            loading=""
            className="flex justify-center items-center py-6 pb-40 [&>canvas]:max-w-[95%] [&>canvas]:h-auto"
          />
        </Document>
      </article>
    </output>
  )
}
