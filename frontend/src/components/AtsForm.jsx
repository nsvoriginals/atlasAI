import React, { useState } from "react";
import axios from "axios"; // Import axios
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { atsAtom } from "../store/AtsStore"; // Import your atom for managing state

const FormComponent = ({ onSubmit }) => {
  const [, setData] = useAtom(atsAtom);
  const [jobDescription, setJobDescription] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate(); // 👈 for navigation after submission

  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleJobDescriptionChange = (e) => setJobDescription(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !jobDescription) {
      return alert("Please fill out both the job description and upload a file.");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_description", jobDescription);

    try {
      const response = await axios.post("http://localhost:8080/ats/ats-details", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        setData(response.data.data);        // ✅ Update global state
        navigate("/user/ats");              // ✅ Navigate to results page
      } else {
        alert("Failed to process the data. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your data.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col items-center gap-4 mt-8 p-6 bg-gray-100 rounded-lg"
    >
      <h2 className="text-3xl font-semibold">Job Description and Resume</h2>

      <textarea
        placeholder="Enter the job description here..."
        value={jobDescription}
        onChange={handleJobDescriptionChange}
        rows={4}
        className="w-full p-4 mt-4 border rounded-lg"
      />

      <input
        type="file"
        onChange={handleFileChange}
        className="w-full mt-4 p-2 border rounded-lg"
      />

      <button
        type="submit"
        className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg"
      >
        Submit
      </button>
    </form>
  );

};

export default FormComponent;
