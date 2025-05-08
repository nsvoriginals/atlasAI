import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import { FormProvider, useForm } from 'react-hook-form'
import { useAtom } from 'jotai'

import { TemplatesSection } from './sections/TemplatesSection'
import { ProfileSection } from './sections/ProfileSection'
import { EducationSection } from './sections/EducationSection'
import { WorkSection } from './sections/WorkSection'
import { SkillsSection } from './sections/SkillsSection'
import { AwardSection } from './sections/AwardsSection'
import { ProjectsSection } from './sections/projectsSection'
import { resumeAtom } from '../../../atoms/resume'
import { FormValues } from '../../../types'

import latex from '../../../lib/latex'
import getTemplateData from '../../../lib/templates'

async function generateResume(formData) {
  const { texDoc, opts } = getTemplateData(formData)
  return latex(texDoc, opts)
}

const initialFormValues = {
  headings: {},
  sections: ['profile', 'education', 'work', 'skills', 'projects', 'awards'],
  selectedTemplate: 1
}

export function Form() {
  const router = useRouter()
  const { section: currSection = 'basics' } = router.query

  const [resume, setResume] = useAtom(resumeAtom)
  const formContext = useForm<FormValues>({ defaultValues: initialFormValues })

  useEffect(() => {
    const lastSession = localStorage.getItem('jsonResume')
    if (lastSession) {
      const jsonResume = JSON.parse(lastSession) 
      formContext.reset(jsonResume)
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
      console.error(error)
      setResume({ ...resume, isError: true, isLoading: false })
    }
  }, [formContext, resume, setResume])

  return (
    <FormProvider {...formContext}>
      <form
        id="resume-form"
        onSubmit={formContext.handleSubmit(handleFormSubmit)}
        className="overflow-auto"
      >
        {currSection === 'templates' && <TemplatesSection />}
        {currSection === 'basics' && <ProfileSection />}
        {currSection === 'education' && <EducationSection />}
        {currSection === 'work' && <WorkSection />}
        {currSection === 'skills' && <SkillsSection />}
        {currSection === 'awards' && <AwardSection />}
        {currSection === 'projects' && <ProjectsSection />}
      </form>
    </FormProvider>
  )
}