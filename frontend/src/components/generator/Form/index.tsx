import React, { useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import { useAtom } from 'jotai'
import { motion, AnimatePresence } from 'framer-motion'

import { TemplatesSection } from './sections/TemplatesSection'
import { ProfileSection } from './sections/ProfileSection'
import { EducationSection } from './sections/EducationSection'
import  WorkSection  from './sections/WorkSection'
import { SkillsSection } from './sections/SkillsSection'
import { AwardSection } from './sections/AwardsSection'
import { ProjectsSection } from './sections/projectsSection'
import { resumeAtom } from '../../../store/Resume'
import { FormValues } from '../../../types'

import latex from '../../../lib/latex'
import getTemplateData from '../../../lib/templates'

async function generateResume(formData: FormValues): Promise<string> {
  const { texDoc, opts } = getTemplateData(formData)
  return latex(texDoc, opts)
}

const initialFormValues: FormValues = {
  headings: {},
  sections: ['profile', 'education', 'work', 'skills', 'projects', 'awards'],
  selectedTemplate: 1
}

const Form: React.FC = () => {
  const location = useLocation()
  const currSection = new URLSearchParams(location.search).get('section') || 'basics'

  const [resume, setResume] = useAtom(resumeAtom)
  const formContext = useForm<FormValues>({ defaultValues: initialFormValues })

  useEffect(() => {
    const lastSession = localStorage.getItem('jsonResume')
    if (lastSession) {
      try {
        const jsonResume = JSON.parse(lastSession) as FormValues
        formContext.reset(jsonResume)
      } catch (error) {
        console.error('Error parsing stored resume data:', error)
      }
    }

    const subscription = formContext.watch((data) => {
      localStorage.setItem('jsonResume', JSON.stringify(data))
    })

    return () => subscription.unsubscribe()
  }, [formContext])

  const handleFormSubmit = useCallback(async () => {
    const formValues = formContext.getValues()
    setResume({ ...resume, isLoading: true })
    
    try {
      const newResumeUrl = await generateResume(formValues)
      setResume({ ...resume, url: newResumeUrl, isLoading: false })
    } catch (error) {
      console.error('Error generating resume:', error)
      setResume({ ...resume, isError: true, isLoading: false })
    }
  }, [formContext, resume, setResume])

  return (
    <FormProvider {...formContext}>
      <motion.form
        id="resume-form"
        onSubmit={formContext.handleSubmit(handleFormSubmit)}
        className="w-full h-full overflow-y-auto px-6 py-4 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          {currSection === 'templates' && (
            <motion.div
              key="templates"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TemplatesSection />
            </motion.div>
          )}
          {currSection === 'basics' && (
            <motion.div
              key="basics"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ProfileSection />
            </motion.div>
          )}
          {currSection === 'education' && (
            <motion.div
              key="education"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <EducationSection />
            </motion.div>
          )}
          {currSection === 'work' && (
            <motion.div
              key="work"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <WorkSection />
            </motion.div>
          )}
          {currSection === 'skills' && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <SkillsSection />
            </motion.div>
          )}
          {currSection === 'awards' && (
            <motion.div
              key="awards"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <AwardSection />
            </motion.div>
          )}
          {currSection === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectsSection />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>
    </FormProvider>
  )
}

export default Form
