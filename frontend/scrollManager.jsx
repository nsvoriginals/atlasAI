// ScrollManager.js
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ScrollManager({ children }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Refresh ScrollTrigger when components mount/unmount
    const onUpdate = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onUpdate);
    
    return () => {
      window.removeEventListener('resize', onUpdate);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return <div className="scroll-container">{children}</div>;
}