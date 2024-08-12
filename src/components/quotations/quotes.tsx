import { useEffect, useState } from "react";

import classes from "./Quotes.module.css";

const quotes = [
  `"Focus is the art of knowing what to ignore." - James Clear`,
  `"Focus is the key to achieving your goals." - Anonymous`,
  `The successful warrior is the average man, with laser-like focus." - Bruce Lee`,
  `"Focus on the possibilities for success, not on the potential for failure." - Napoleon Hill`,
  `"Concentrate all your thoughts upon the work in hand. The sun's rays do not burn until brought to a focus." - Alexander Graham Bell`,
  `"It is during our darkest moments that we must focus to see the light." - Aristotle`,
  `"Focus on being productive instead of busy." - Tim Ferriss`,
  `"The only reason men fail is because of broken focus." - Mike Murdock`,
  `"You don’t get results by focusing on results. You get results by focusing on the actions that produce results." - Mike Hawkins`,
  `"Focus on the journey, not the destination. Joy is found not in finishing an activity but in doing it." - Greg Anderson`,
];

export default function Quotes() {
  const [isMounted, setIsMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(() =>
    Math.floor(Math.random() * quotes.length)
  );
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    setIsMounted(true);

    const interval = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentIndex(Math.floor(Math.random() * quotes.length));
        setIsVisible(true);
      }, 3000);
    }, 30000);

    return () => clearInterval(interval);
  }, [setIsMounted]);

  if (!isMounted) return null;

  return (
    <div className={classes.container}>
      <p
        className={`${classes.subtitle} ${isVisible ? classes.showQuote : ""}`}
      >
        {quotes[currentIndex]}
      </p>
    </div>
  );
}
