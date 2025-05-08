import { BsArrowReturnRight } from "react-icons/bs";

export default function Button({ 
  text, 
  onClick,
  variant = "primary", // 'primary' | 'secondary'
  size = "medium",     // 'small' | 'medium' | 'large'
  fullWidth = false,
  withArrow = false
}) {
  // Base classes that apply to all buttons
  const baseClasses = "inline-flex items-center justify-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  // Variant styles
  const variantClasses = {
    primary: "bg-black text-white hover:bg-blue-300 hover:text-black focus:bg-blue-300 focus:text-black",
    secondary: "bg-transparent text-black border-2 border-black hover:bg-black hover:text-white focus:bg-black focus:text-white"
  };

  // Size styles
  const sizeClasses = {
    small: "px-4 py-1.5 text-sm",
    medium: "px-8 py-2.5 text-base",
    large: "px-6 py-3 text-lg"
  };

  // Full width style
  const widthClass = fullWidth ? "w-full" : "w-auto";

  return (
    <button
      onClick={onClick}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]} 
        ${widthClass}
      `}
    >
      {text}
      {withArrow && (
        <BsArrowReturnRight className="ml-2" />
      )}
    </button>
  );
}