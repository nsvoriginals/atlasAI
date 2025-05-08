import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import { QuestionCard } from "../components/InterviewQuestion";
import Loader from "../components/Loader";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../components/Button";

const InterviewQuestionsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { questions } = location.state || {};

  const exportToPDF = () => {
    const doc = new jsPDF();
  
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    
    const headerText = "Atlas AI";
    const headerWidth = doc.getTextWidth(headerText);
    const headerX = (doc.internal.pageSize.width - headerWidth) / 2;
    doc.text(headerText, headerX, 15);

    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;
    doc.rect(10, 20, pageWidth - 20, pageHeight - 30);

    doc.setFontSize(16);
    doc.text("Interview Questions", 14, 35);

    let yPosition = 45;
    const margin = 14;
    const lineHeight = 10;
    const maxWidth = 180;

    const wrapText = (text, x, y, maxWidth) => {
      let lines = doc.splitTextToSize(text, maxWidth);
      doc.text(lines, x, y);
      return y + (lines.length * lineHeight);
    };

    questions.forEach((question, index) => {
      yPosition = wrapText(`${index + 1}. ${question.question}`, margin, yPosition, maxWidth);
      yPosition = wrapText(`Expected Answer: ${question.expected_answer}`, margin, yPosition, maxWidth);
      yPosition = wrapText(`Difficulty: ${question.difficulty}`, margin, yPosition, maxWidth);
      yPosition = wrapText(`Type: ${question.type}`, margin, yPosition, maxWidth);
      yPosition = wrapText(`Skill Tested: ${question.skill_tested}`, margin, yPosition, maxWidth);
      yPosition += 10;

      if (yPosition > pageHeight - 20) {
        doc.addPage();
        doc.setFontSize(24);
        doc.text(headerText, headerX, 15);
        doc.rect(10, 20, pageWidth - 20, pageHeight - 30);
        doc.setFontSize(16);
        doc.text("Interview Questions", 14, 35);
        yPosition = 45;
      }
    });

    doc.save("interview_questions.pdf");
  };

  if (!questions) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
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
              text={"Back to Dashboard"}
                onClick={() => navigate('/user/profile')}
                className="bg-gray-600 hover:bg-gray-700"
              >
                Back to Dashboard
              </Button>
              <motion.h2 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl sm:text-3xl font-bold text-gray-800"
              >
                Interview Questions
              </motion.h2>
              <div className="w-24" /> {/* Spacer for balance */}
            </div>

            <motion.div
              className="max-h-[80vh] overflow-y-auto mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {questions.map((question, index) => (
                <motion.div
                  key={index}
                  className="mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 50 }}
                >
                  <QuestionCard
                    no={index + 1}
                    question={question.question}
                    answer={question.expected_answer}
                    difficulty={question.difficulty}
                    type={question.type}
                    skills={question.skill_tested}
                  />
                </motion.div>
              ))}
            </motion.div>

            <Button
              onClick={exportToPDF}
              text={"Export as PDF"}
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mt-4"
            >
              Export as PDF
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InterviewQuestionsPage;
