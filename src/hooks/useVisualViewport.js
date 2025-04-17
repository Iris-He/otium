import { useEffect } from "react";

/**
 * Hook to handle Visual Viewport API for mobile keyboard adjustments
 * This helps prevent the keyboard from pushing content up in PWA mode
 */
export const useVisualViewport = () => {
  useEffect(() => {
    // Check if the Visual Viewport API is available
    if (!window.visualViewport) {
      console.log("Visual Viewport API not available");
      return;
    }

    const handleResize = () => {
      // Get all modal elements that might be affected by keyboard
      const modalElements = document.querySelectorAll(".modal-container");

      if (modalElements.length === 0) return;

      // Calculate the visible height
      const viewportHeight = window.visualViewport.height;
      const windowHeight = window.innerHeight;

      // If keyboard is likely open (viewport height significantly less than window height)
      if (viewportHeight < windowHeight * 0.8) {
        modalElements.forEach((modal) => {
          // Adjust the modal to stay in the visible area
          modal.style.height = `${viewportHeight}px`;
          modal.style.bottom = "auto";
          modal.style.top = `${window.visualViewport.offsetTop}px`;
          modal.style.transform = "none";
          modal.style.maxHeight = `${viewportHeight}px`;
          modal.style.overflow = "auto";
        });
      } else {
        // Reset when keyboard is closed
        modalElements.forEach((modal) => {
          modal.style.height = "";
          modal.style.bottom = "";
          modal.style.top = "";
          modal.style.transform = "";
          modal.style.maxHeight = "";
          modal.style.overflow = "";
        });
      }
    };

    // Add event listeners
    window.visualViewport.addEventListener("resize", handleResize);
    window.visualViewport.addEventListener("scroll", handleResize);

    // Initial adjustment
    handleResize();

    // Cleanup
    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", handleResize);
        window.visualViewport.removeEventListener("scroll", handleResize);
      }
    };
  }, []);
};

export default useVisualViewport;
