import { useEffect, useState } from "react";
import styled from "styled-components";

export default function DarkToggle() {
  const [dark, setDark] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  const toggleDark = () => {
    setDark((prev) => {
      const next = !prev;
      localStorage.setItem("darkMode", next);
      return next;
    });
  };

  return (
    <StyledWrapper>
      <label className="switch">
        <input type="checkbox" checked={dark} onChange={toggleDark} />
        <span className="slider" />
      </label>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .switch {
    position: relative;
    display: inline-block;
    /* Reduced size to match topbar height better */
    width: 48px;
    height: 24px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    inset: 0;
    /* Light theme background (subtle gray) */
    background-color: #e2e8f0; 
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 999px;
    border: 1px solid rgba(0,0,0,0.05);
  }

  .slider:before {
    position: absolute;
    content: "";
    /* Smaller thumb with internal padding */
    height: 18px;
    width: 18px;
    border-radius: 50%;
    left: 3px;
    bottom: 2px;
    /* Sun appearance for light mode */
    background: #f59e0b; 
    box-shadow: 0 0 10px rgba(245, 158, 11, 0.5);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Dark Mode Styles */
  input:checked + .slider {
    background-color: #2e1065; /* Deep purple for dark mode */
  }

  input:checked + .slider:before {
    transform: translateX(22px);
    background: #2e1065;
    /* Creates the moon "crescent" effect using a cleaner box shadow */
    box-shadow: inset -6px -2px 0 0 #fef3c7; 
  }

  /* Hover effect for better UX */
  .switch:hover .slider {
    filter: brightness(1.05);
  }
`;