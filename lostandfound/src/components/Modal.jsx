import { useEffect } from "react";

function Modal({ children, onClose }) {

  useEffect(() => {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollBarWidth}px`;
    return () => {
        document.body.style.overflow = "auto";
        document.body.style.paddingRight = "0px";
    };
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 overflow-y-auto px-4"
    >
      <div className="bg-[#1f2937] p-4 sm:p-6 rounded-2xl w-full max-w-sm sm:max-w-lg relative">
        {children}
      </div>
    </div>
  );
}

export default Modal;