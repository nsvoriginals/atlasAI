import { useEffect, useState } from "react";
import Button from "../components/Button";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const JobInterviewWidget = () => {
  const [jobRole, setJobRole] = useState("");
  const [experience, setExperience] = useState("");
  const [topics, setTopics] = useState("");
  const [resume, setResume] = useState(null);
  const [profile, setProfile] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Auto-navigate to interview questions page when questions are available
  useEffect(() => {
    if (questions.length > 0) {
      navigate("/interview-questions", { state: { questions } });
    }
  }, [questions, navigate]);

  const handleFileChange = (event) => {
    if (event.target.files?.length > 0) {
      setResume(event.target.files[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("jobRole", jobRole);
    formData.append("experience", experience);
    formData.append("topics", topics);
    if (resume) {
      formData.append("file", resume);
    }

    try {
      const response = await fetch("http://localhost:8080/api/generate", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setProfile(data.data.candidate_profile);
        setQuestions(data.data.interview_questions); // triggers useEffect
      } else {
        alert("Failed to fetch data.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl bg-white rounded-2xl p-8 space-y-6  animate-fade-in-up transition-all duration-500">
      <h2 className="text-2xl font-bold text-center text-gray-800">Interview Prep Generator</h2>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Job Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Role</label>
            <select
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select a role</option>
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Backend Developer">Backend Developer</option>
              <option value="Full Stack Developer">Full Stack Developer</option>
            </select>
          </div>

          {/* Experience Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
            <div className="flex gap-3">
              {["Junior", "Mid", "Senior"].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setExperience(level)}
                  className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                    experience === level
                      ? "bg-blue-500 text-white border-blue-500 scale-105"
                      : "bg-white border-gray-300 text-gray-600 hover:bg-gray-100 hover:scale-105"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Special Topics */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Special Topics (optional)</label>
            <input
              type="text"
              placeholder="e.g., React, GraphQL"
              value={topics}
              onChange={(e) => setTopics(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Resume Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Resume (PDF)</label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:rounded-lg file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {resume && <p className="text-xs text-gray-500 mt-1">Uploaded: {resume.name}</p>}
          </div>

          {/* Submit Button */}
          <div className="w-full">
            <Button text="Generate Interview Questions" />
          </div>
        </form>
      )}

      {/* Optional: Candidate profile (if you still want to show it before navigating) */}
      {!loading && profile && (
        <div className="mt-6 space-y-2 bg-gray-50 p-4 rounded-lg border border-gray-200 animate-fade-in-up">
          <h3 className="text-lg font-semibold text-gray-800">Candidate Profile</h3>
          <p><strong>Experience Level:</strong> {profile.experience_level}</p>
          <p><strong>Key Skills:</strong> {profile.key_skills.join(", ")}</p>
          <p><strong>Primary Domain:</strong> {profile.primary_domain}</p>
          <p><strong>Years of Experience:</strong> {profile.years_of_experience}</p>
        </div>
      )}
    </div>
  );
};

export default JobInterviewWidget;
