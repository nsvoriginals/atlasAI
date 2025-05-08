import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../core/Logo';
import { useUser, UserProvider } from '../../context/UserContext';
import { motion } from 'framer-motion';

const HeaderContent: React.FC = () => {
  const { username } = useUser();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-[10vh] flex justify-between items-center px-6 border-b border-gray-200 bg-white shadow-sm"
    >
      <Link to="/" className="flex items-center">
        <Logo scale={0.65} />
      </Link>

      {username && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center space-x-4"
        >
          <span className="text-gray-600">Welcome,</span>
          <span className="font-semibold text-indigo-600">{username}</span>
        </motion.div>
      )}
    </motion.header>
  );
};

const Header: React.FC = () => {
  return (
    <UserProvider>
      <HeaderContent />
    </UserProvider>
  );
};

export default Header;
