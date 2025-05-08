import React from 'react'
import { useAtom } from 'jotai'
import { useState, useCallback } from 'react'
import { pdfjs, Document, Page } from 'react-pdf'
import type { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api'
import { resumeAtom } from '../../store/Resume'

const workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc

const Preview: React.FC = () => {
  const [resume] = useAtom(resumeAtom)
  const [, setPageCount] = useState(1)
  const [pageNumber] = useState(1)
  const [scale] = useState(window.innerWidth > 1440 ? 1.75 : 1)

  const handleDocumentLoadSuccess = useCallback((pdf: PDFDocumentProxy) => {
    setPageCount(pdf.numPages)
  }, [])

  return (
    <div className="grid-area-preview bg-gray-900 overflow-y-auto">
      <button 
        onClick={() => window.open(resume.url)}
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
      >
        Export as PDF
      </button>
      <article className="w-full h-full">
        <Document
          file={resume.url || '/blank.pdf'}
          onLoadSuccess={handleDocumentLoadSuccess}
          loading=""
          className="w-full"
        >
          <div className="flex justify-center items-center py-6 pb-40">
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderAnnotationLayer={false}
              renderTextLayer={false}
              loading=""
              className="max-w-[95%]"
            />
          </div>
        </Document>
      </article>
    </div>
  )
}

export default Preview
