import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdDragIndicator } from 'react-icons/md';
import { motion } from 'framer-motion';

import { PrimaryButton, IconButton } from '../core/Button';
import { useUser } from '../../context/UserContext';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currSection = searchParams.get('section') || 'basics';
  const { username } = useUser();

  const sectionLinks = [
    { label: 'Templates', section: 'templates' },
    { label: 'Profile', section: 'basics' },
    { label: 'Education', section: 'education' },
    { label: 'Work Experience', section: 'work' },
    { label: 'Skills', section: 'skills' },
    { label: 'Projects', section: 'projects' },
    { label: 'Awards', section: 'awards' }
  ];

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full p-6 bg-white"
    >
      {username && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-indigo-50 rounded-lg"
        >
          <p className="text-sm text-gray-600">Welcome back,</p>
          <p className="text-lg font-semibold text-indigo-600">{username}</p>
        </motion.div>
      )}

      <nav className="flex flex-col items-start justify-center gap-6 mb-7">
        {sectionLinks.map(({ label, section }) => (
          <motion.div
            key={section}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: sectionLinks.indexOf({ label, section }) * 0.1 }}
            className="flex items-center gap-2 group"
          >
            <IconButton
              type="button"
              className="cursor-grab hover:text-indigo-600 transition-colors"
            >
              <MdDragIndicator className="w-5 h-5" />
            </IconButton>
            <Link
              to={`/generator?section=${section}`}
              className={`text-gray-600 hover:text-indigo-600 transition-colors ${
                section === currSection ? 'text-indigo-600 font-medium' : ''
              }`}
            >
              {label}
            </Link>
          </motion.div>
        ))}
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <PrimaryButton
          form="resume-form"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200 shadow-lg"
        >
          MAKE
        </PrimaryButton>
      </motion.div>
    </motion.aside>
  );
};

export default Sidebar;
