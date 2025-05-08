import React from 'react'
import { useFieldArray } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'

import { LabeledInput } from '../../../core/LabeledInput'
import { AddButton } from '../../../core/Button'
import { Divider } from '../../../core/Divider'
import { FormSection } from './FormSection'
import Highlights from './Highlights'

import { Work } from '../../../../types'

const WorkSection: React.FC = () => {
  const { fields, append } = useFieldArray({ name: 'work' })

  const handleAdd = () => {
    const defaultWork: Work = {
      company: '',
      position: '',
      summary: '',
      startDate: '',
      endDate: '',
      highlights: []
    }

    append(defaultWork)
  }

  return (
    <FormSection title="Your Work Experience">
      <AnimatePresence mode="wait">
        {fields.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <LabeledInput
              name="headings.work"
              label="Section Heading"
              placeholder="Work"
              className="mb-4"
            />
            <Divider className="my-6" />
          </motion.div>
        )}

        <AnimatePresence mode="popLayout">
          {fields.map((field, index) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="space-y-4 mb-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <LabeledInput
                  name={`work.${index}.company`}
                  label="Company name"
                  placeholder="Netflix"
                  className="bg-white rounded-lg shadow-sm"
                />
                <LabeledInput
                  name={`work.${index}.position`}
                  label="Position"
                  placeholder="Software Engineer"
                  className="bg-white rounded-lg shadow-sm"
                />
              </div>

              <LabeledInput
                name={`work.${index}.summary`}
                label="Summary"
                placeholder="lorem ipsum"
                className="bg-white rounded-lg shadow-sm"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <LabeledInput
                  name={`work.${index}.startDate`}
                  label="Start Date"
                  placeholder="Sep 2015"
                  className="bg-white rounded-lg shadow-sm"
                />
                <LabeledInput
                  name={`work.${index}.endDate`}
                  label="End Date"
                  placeholder="Jun 2019"
                  className="bg-white rounded-lg shadow-sm"
                />
              </div>

              <Highlights
                label="Job Responsibilities"
                placeholder="Did cool stuff at company"
                name={`work.${index}.highlights`}
              />

              <Divider className="my-6" />
            </motion.div>
          ))}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6"
        >
          <AddButton
            type="button"
            onClick={handleAdd}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200 shadow-lg"
          >
            + Add Work Experience
          </AddButton>
        </motion.div>
      </AnimatePresence>
    </FormSection>
  )
}

export default WorkSection
