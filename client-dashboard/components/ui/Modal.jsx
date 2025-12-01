"use state";
import { Button } from "./button";
import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";
import { useRef, useEffect } from "react";

const Modal = ({ children, onClose }) => {
  const modalRef = useRef();
  useEffect(() => {
    function handleClick(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  return createPortal(
    <div className="absolute inset-0 w-full h-full transition-all duration-500 backdrop-blur-sm flex items-center justify-center">
      <div
        ref={modalRef}
        className="fixed top-2/4 w-max left-2/4 -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl rounded-3xl  transition-all duration-500 z-20"
      >
        <button
          className="absolute top-4 right-4 cursor-pointer text-2xl"
          onClick={onClose}
        >
          <HiXMark />
        </button>

        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
