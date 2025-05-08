import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import JobInterviewWidget from "../widgets/InterviewForm";
import FormComponent from "../components/AtsForm";
import { Menu, X } from "lucide-react";
import { useAtom } from "jotai";
import userAtom from "../store/userStore";

export const Dashboard = () => {
  const [openWidget, setOpenWidget] = useState(null); // <-- use one state for widget name
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user] = useAtom(userAtom);

  // Lock scroll when a widget/modal is open
  useEffect(() => {
    document.body.style.overflow = openWidget ? "hidden" : "";
  }, [openWidget]);

  // Render the appropriate widget based on state
  const renderWidget = () => {
    switch (openWidget) {
      case "Interview Questions Generator":
        return <JobInterviewWidget />;
      case "ATS Tracker":
        return <FormComponent />;
      default:
        return null;
    }
  };

  return (
    <div className="w-screen min-h-screen flex mb-24">
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full bg-white text-black w-64 shadow-lg transition-transform transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0 z-50`}>
        <div className="p-4 flex justify-between items-center border-b border-gray-200">
          <h2 className="text-2xl font-bold text-sky-400">Dashboard</h2>
          <button className="md:hidden" onClick={() => setIsSidebarOpen(false)}>
            <X className="text-black w-6 h-6" />
          </button>
        </div>
        <nav className="mt-6 flex flex-col space-y-2">
          {["Home", "Services", "Profile", "Settings", "Logout"].map((item) => (
            <a
              key={item}
              href="#"
              className="block px-6 py-3 text-black font-medium hover:bg-sky-400 hover:text-white rounded-md transition"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-start ml-0 md:ml-64">
        <button
          className="md:hidden mt-4 ml-4 p-2 bg-gray-900 text-white rounded-full"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="flex justify-around items-center w-full px-10 mt-10">
          <h1 className="text-7xl font-bold">Welcome {user.username}</h1>
          <div className="w-14 h-14 bg-black rounded-full text-center" />
        </div>

        <h1 className="text-5xl mt-10 font-semibold">Services</h1>

        <div className="w-full flex flex-wrap justify-center gap-8 mt-8 px-8">
          {["Interview Questions Generator", "ATS Tracker", "Resume Builder", "Jobs Finder"].map((service, index) => (
            <div
              key={index}
              className="md:w-[45%] w-[90%] h-[40vh] bg-red-300 rounded-lg flex items-center justify-center shadow-md cursor-pointer hover:shadow-lg transition-all"
              onClick={() => setOpenWidget(service)} // <-- Set current widget
            >
              <h1 className="text-2xl font-bold">{service}</h1>
            </div>
          ))}
        </div>

        {/* Widget Modal */}
        {openWidget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl p-6">
              <button
                className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl"
                onClick={() => setOpenWidget(null)} // <-- Close modal
              >
                &times;
              </button>
              {renderWidget()}
            </div>
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
