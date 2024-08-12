import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { FaMinus, FaPlus } from "react-icons/fa";

import { setBreakLength, setSessionLength } from "../store/timer";
import classes from "./Setters.module.css";

interface SettersProps {
  type: "break" | "session";
  timeLength: number;
  incAct: () => void;
  decAct: () => void;
}

export default function Setters({
  type,
  timeLength,
  incAct,
  decAct,
}: SettersProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<number>(timeLength);

  const dispatch = useDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef, isEditing]);

  function handleClick() {
    setIsEditing((prev) => !prev);
  }

  function handleUserInput() {
    if (isEditing) {
      if (!isNaN(userInput) && userInput > 0 && userInput <= 60) {
        if (type === "session") {
          dispatch(setSessionLength(userInput));
        } else if (type === "break") {
          dispatch(setBreakLength(userInput));
        }
        setIsEditing(false);
      }
      setUserInput(0);
    }
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleUserInput();
    } else if (e.key === "Escape") {
      setIsEditing(false);
    }
  }

  function handleBlur() {
    handleUserInput();
    setIsEditing(false);
  }

  return (
    <>
      <div id={`${type}-label`} className={classes.setter}>
        <h4 className={classes.label}>{`Set ${type} Length`}</h4>
        <div>
          <button id={`${type}-decrement`} onClick={decAct}>
            <FaMinus />
          </button>
          <button onClick={handleClick} className={classes.editButton}>
            {isEditing ? (
              <input
                type="number"
                ref={inputRef}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => setUserInput(parseInt(e.target.value))}
                value={userInput}
                onKeyDown={handleKeyPress}
                onBlur={handleBlur}
              />
            ) : (
              <span id={`${type}-length`} className={classes.timeLength}>
                {timeLength}
              </span>
            )}
          </button>
          <button id={`${type}-increment`} onClick={incAct}>
            <FaPlus />
          </button>
        </div>
      </div>
    </>
  );
}
