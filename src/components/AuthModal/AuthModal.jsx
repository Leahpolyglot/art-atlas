import { useEffect } from "react";
import "./AuthModal.css";

function AuthModal({ title, isOpen, onClose, children }) {
  useEffect(() => {
    if (!isOpen) return undefined;

    function handleEscape(event) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) onClose();
  }

  return (
    <div className="auth-modal" onMouseDown={handleOverlayClick}>
      <div className="auth-modal__container" role="dialog" aria-modal="true" aria-label={title}>
        <button className="auth-modal__close" type="button" onClick={onClose} aria-label="Close">
          ×
        </button>
        <h2 className="auth-modal__title">{title}</h2>
        {children}
      </div>
    </div>
  );
}

export default AuthModal;
