import { useEffect, useState } from "react";
import classes from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function Modal({ isOpen, onClose, onConfirm }: ModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      setIsAnimating(true);
    } else {
      setIsAnimating(false);
    }
  }, [isOpen]);

  if (!isMounted || !isOpen) {
    return null;
  }

  const handleConfirm = () => {
    onConfirm();
    setIsAnimating(false);
  };

  function handleOnClose() {
    setIsAnimating(false);
    onClose();
  }

  return (
    <div
      className={`${classes.overlay} ${isAnimating ? classes.modalOpened : ""}`}
    >
      <div className={classes.modal}>
        <p>Are you sure you want to reset?</p>
        <button className={classes.button} onClick={handleConfirm}>
          Reset
        </button>
        <button className={classes.button} onClick={handleOnClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}
