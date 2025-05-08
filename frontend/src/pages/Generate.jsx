import React, { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';

import Form  from '../components/generator/Form'
import  Header  from '../components/generator/Header'
import  Sidebar  from '../components/generator/Sidebar'

// Lazy load the Preview component
const Preview = lazy(() => import('../components/generator/Preview'))

const GeneratorPage = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-12 grid-rows-[auto_1fr] h-screen bg-gray-50"
    >
      <div className="col-span-12">
        <Header />
      </div>
      
      <div className="col-span-3 border-r border-gray-200 bg-white">
        <Sidebar />
      </div>
      
      <div className="col-span-4 overflow-y-auto bg-white">
        <Form />
      </div>
      
      <div className="col-span-5 bg-gray-50">
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        }>
          <Preview />
        </Suspense>
      </div>
    </motion.main>
  )
}

export default GeneratorPage