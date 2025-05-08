import React, { useState, useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { atsAtom } from "../store/AtsStore";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../components/Button";
import { useUser } from "../context/UserContext";

const AtsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { resume, jobDescription } = location.state || {};
  const [atsData] = useAtom(atsAtom);
  const [percentage, setPercentage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const scoreRef = useRef<HTMLDivElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const { username } = useUser();

  // Reset scroll position and handle page transitions
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Animate percentage increase
  useEffect(() => {
    if (!atsData?.ats_score) return;

    const duration = 1500;
    const increment = 1;
    const intervalTime = duration / atsData.ats_score;

    const interval = setInterval(() => {
      setPercentage(prev => Math.min(prev + increment, atsData.ats_score));
    }, intervalTime);

    return () => clearInterval(interval);
  }, [atsData]);

  if (!atsData) return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-white to-blue-50">
      <div className="animate-pulse text-xl text-indigo-600">Analyzing your resume...</div>
    </div>
  );

  return (
    <AnimatePresence mode="wait">
      <motion.div
        ref={mainRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-b from-white to-blue-50"
      >
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <Button
                text="Back to Dashboard"
                onClick={() => navigate('/user/profile')}
                variant="secondary"
              />
              <motion.h2 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl sm:text-3xl font-bold text-gray-800"
              >
                Welcome, {username}!
              </motion.h2>
              <div className="w-24" /> {/* Spacer for balance */}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8,
                delay: 0.2,
                type: "spring",
                stiffness: 100
              }}
              className="w-full max-w-2xl mx-auto"
            >
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 text-center"
              >
                Resume Analysis
              </motion.h1>
              
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  delay: 0.6,
                  type: "spring",
                  stiffness: 200
                }}
                className="mx-auto w-48 sm:w-64 h-48 sm:h-64 mb-8 sm:mb-10"
              >
                <CircularProgressbar
                  value={percentage}
                  text={`${percentage}%`}
                  styles={{
                    path: {
                      stroke: `rgba(79, 70, 229, ${percentage / 100})`,
                      strokeLinecap: 'round'
                    },
                    trail: {
                      stroke: '#e0e7ff'
                    },
                    text: {
                      fill: '#4f46e5',
                      fontSize: '24px',
                      fontWeight: 'bold'
                    }
                  }}
                />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="space-y-4 text-center"
              >
                <motion.h2 
                  whileHover={{ scale: 1.02 }}
                  className="text-xl sm:text-2xl font-semibold text-gray-800"
                >
                  {percentage >= 70 ? 'Strong Match!' : 'Needs Optimization'}
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto"
                >
                  {atsData.resume_summary}
                </motion.p>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mt-16 sm:mt-20"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 backdrop-blur-sm bg-opacity-90"
              >
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6"
                >
                  Recommended Improvements
                </motion.h2>
                <ul className="space-y-4">
                  {atsData.improvements.map((item, idx) => (
                    <motion.li 
                      key={idx}
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ x: 10 }}
                      className="flex items-start p-4 hover:bg-blue-50 rounded-lg transition-colors group"
                    >
                      <motion.div 
                        whileHover={{ scale: 1.2 }}
                        className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mr-3 mt-1 group-hover:bg-indigo-200 transition-colors"
                      >
                        <div className="h-3 w-3 rounded-full bg-indigo-600" />
                      </motion.div>
                      <p className="text-gray-700 text-base sm:text-lg">{item}</p>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mt-16 sm:mt-20"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 backdrop-blur-sm bg-opacity-90"
              >
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6"
                >
                  Missing Keywords
                </motion.h2>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {atsData.missing_keywords.map((skill, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        delay: idx * 0.05,
                        type: "spring",
                        stiffness: 200
                      }}
                      whileHover={{ 
                        scale: 1.1,
                        rotate: [0, -5, 5, -5, 0],
                        transition: { duration: 0.5 }
                      }}
                      className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm sm:text-base ${
                        idx % 3 === 0 ? 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200' :
                        idx % 3 === 1 ? 'bg-pink-100 text-pink-800 hover:bg-pink-200' :
                        'bg-teal-100 text-teal-800 hover:bg-teal-200'
                      } font-medium shadow-sm transition-colors`}
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mt-16 sm:mt-20"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-indigo-600 rounded-2xl p-6 sm:p-8 text-white backdrop-blur-sm bg-opacity-90"
              >
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-2xl sm:text-3xl font-bold mb-4 text-center"
                >
                  Ready to optimize your resume?
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-indigo-100 mb-6 max-w-2xl mx-auto text-center text-base sm:text-lg"
                >
                  Implement these suggestions to increase your chances of passing automated screening systems.
                </motion.p>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="block mx-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-white text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors shadow-md text-base sm:text-lg"
                >
                  Download Optimized Resume
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AtsPage;