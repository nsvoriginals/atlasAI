import { useState } from "react";
import Button from "../components/Button";
import userImage from "../../public/images/user.jpg";
import userAtom from "../store/userStore";
import { useAtomValue } from "jotai";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();

  const handleSignout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      {/* Navbar */}
      <nav className="fixed mont top-0 z-50 w-full bg-white border-b border-gray-300 shadow-[16rem_12px_10px_-4px_rgba(0,0,0,0.1)]">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="#" className="flex ms-2 md:me-24">
                <img src="images/fox_light_blue.png" className="h-8 me-3" alt="Logo" />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-black">
                  Atlas
                </span>
              </a>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex text-sm bg-gray-300 rounded-full focus:ring-2 focus:ring-gray-300"
                >
                  <span className="sr-only">Open user menu</span>
                  <img className="w-10 h-10 rounded-full" src={userImage} alt="User" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute top-11 right-2 mt-5 w-48 bg-white rounded-lg drop-shadow-xl">
                    <div className="px-4 py-3">
                      <p className="text-sm text-blue-700">{user.username}</p>
                      <p className="text-sm font-medium text-blue-700 truncate">{user.email}</p>
                    </div>
                    <ul className="py-1">
                      <li>
                        <a
                          onClick={() => navigate("/")}
                          href="#"
                          className="block px-4 py-2 text-sm text-blue-700 hover:bg-gray-200 hover:text-black"
                        >
                          Home
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={handleSignout}
                          href="#"
                          className="block px-4 py-2 text-sm text-blue-700 hover:bg-gray-200 hover:text-black"
                        >
                          Sign out
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed drop-shadow-2xl top-0 left-0 z-40 w-64 h-screen pt-20 bg-white border-r border-gray-200 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="h-full px-3 pb-4 overflow-y-auto">
          <div className="flex flex-col justify-between items-center gap-72">
            <ul className="space-y-2 font-medium">
              {["Interview Assistant", "Resume Generator", "Settings"].map((item, index) => (
                <li key={index}>
                  <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 22 21">
                      <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                      <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                    </svg>
                    <span className="ms-3">{item}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="w-full">
              <Button text="Logout" onClick={handleSignout} />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="p-4 sm:ml-64 mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Interview Questions Generator", description: "Generate tailored interview questions based on your resume.", button: "Get Started" },
            { title: "ATS Tracking", description: "Track how your resume performs in Applicant Tracking Systems.", button: "Track Now" },
            { title: "Salary Estimation", description: "Get an estimated salary range based on your skills and experience.", button: "Estimate Salary" },
            { title: "Build a Resume", description: "Create a professional resume tailored to your job search.", button: "Build Resume" }
          ].map((card, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-blue-700 mb-4">{card.title}</h2>
              <p className="text-gray-600">{card.description}</p>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                {card.button}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
