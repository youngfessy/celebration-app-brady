'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';

import fireworksAnim from './animations/fireworks.json';
import balloonsAnim from './animations/balloon.json';
import confettiAnim from './animations/confetti.json';
import cheerleaderAnim from './animations/cheerleader.json';
import monkeyAnim from './animations/monkey.json';
// import penguinAnim from './animations/penguin.json';
import rabbitsAnim from './animations/rabbits.json';

const phrases = [
  "Yay, you did it",
  "I'm so proud of you",
  "Amazing job",
  "Look at you go",
  "Great work",
  "You're awesome",
  "Hooray",
  "Fantastic",
  "That's the way",
  "You're a star",
  "Well done",
  "You did it",
  "Spectacular",
  "Woo-hoo",
  "That's awesome"
];

const animationMap = {
  fireworks: fireworksAnim,
  balloons: balloonsAnim,
  confetti: confettiAnim,
  cheerleader: cheerleaderAnim,
  monkey: monkeyAnim,
  // penguin: penguinAnim,
  rabbits: rabbitsAnim,
};

const animationKeys = Object.keys(animationMap);

export default function CelebrationApp() {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [phrase, setPhrase] = useState(phrases[0]);
  const [animationKey, setAnimationKey] = useState(animationKeys[0]);

  const randomize = () => {
    const newPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    const newAnimKey = animationKeys[Math.floor(Math.random() * animationKeys.length)];
    setPhrase(newPhrase);
    setAnimationKey(newAnimKey);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    randomize();
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Load Potta One font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Potta+One&display=swap"
        rel="stylesheet"
      />

      {!submitted ? (
        <form
          onSubmit={handleSubmit}
          className="min-h-screen flex flex-col justify-center items-center text-center space-y-6 bg-gradient-to-br from-pink-100 to-blue-200 p-4"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-black">
            What's your child's name?
          </h1>
          <input
            type="text"
            className="text-xl p-3 rounded border border-b-blue-500 text-black w-64"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded text-lg shadow"
          >
            Go!
          </button>
        </form>
      ) : (
        <div className="relative w-full h-screen overflow-hidden">
          {/* Top celebratory text */}
          <div className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-start pt-20 px-4 text-center">
          <motion.h2
  key={phrase + name}
  initial={{ scale: 0.8, opacity: 0 }}
  animate={{ scale: 1.2, opacity: 1 }}
  transition={{ duration: 0.5 }}
  className={`mx-auto mt-4 max-w-[90%] text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-lg break-words leading-tight ${animationKey === 'penguin' ? 'text-black' : 'text-white'}`}
  style={{ fontFamily: "'Potta One', cursive" }}
>
  {phrase}, {name}!
</motion.h2>

          </div>

          {/* Background animation */}
          <motion.div
            className="absolute inset-0 w-full h-full z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Lottie
              animationData={animationMap[animationKey]}
              loop={true}
              className="w-full h-full"
              style={{ objectFit: 'cover' }}
            />
          </motion.div>

          {/* Celebrate Again button */}
          <button
  onClick={randomize}
  aria-label="Celebrate Again"
  className="absolute top-4 right-4 z-20 text-white text-2xl sm:text-3xl bg-green-500 p-2 rounded-full shadow hover:bg-green-600 transition"
>
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="white"
  className="w-6 h-6"
>
  <path d="M12 6V2L8 6l4 4V7c2.76 0 5 2.24 5 5a5.002 5.002 0 01-9.9 1H5a7 7 0 0013.9 1A7 7 0 0012 6z" />
</svg>

</button>
        </div>
      )}
    </div>
  );
}
