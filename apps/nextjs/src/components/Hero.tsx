import { motion } from "framer-motion";

const topSlide = {
  initial: { y: -200, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", damping: 10, stiffness: 100 },
  },
};

const leftSlide = {
  initial: { x: -400, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      type: "spring",
      damping: 10,
      stiffness: 100,
      delay: 0.5,
    },
  },
};

const Hero = () => {
  return (
    <motion.section
      className="container flex flex-col md:flex-row md:py-10 xl:py-20"
      initial="initial"
      animate="animate"
    >
      <div className="flex w-full flex-col justify-center p-10 md:w-1/2">
        <motion.h1
          variants={topSlide}
          className="text-4xl font-bold tracking-tight md:text-5xl"
        >
          Revolutionize Your Work with AI Teacher Assistant!
        </motion.h1>
        <motion.h3
          variants={leftSlide}
          className="py-5 text-xl tracking-tight md:py-10 md:text-xl"
        >
          Enhance teaching and nurture young minds using smart, adaptable AI
          teacher assistant.
        </motion.h3>
        <motion.button
          variants={leftSlide}
          className="mx-auto mt-4 w-24 items-center justify-center rounded-lg bg-black p-2 px-1 font-medium text-white hover:bg-gray-800 md:mx-0 md:mt-0 md:flex"
        >
          Join
        </motion.button>
      </div>

      <div className="flex w-full justify-center p-10 md:w-1/2">
        <motion.div
          variants={{
            ...topSlide,
            animate: {
              y: 0,
              opacity: 1,
              transition: { delay: 0.3 },
            },
          }}
          className="h-72 w-72 rounded-full bg-gray-300"
        />
      </div>
    </motion.section>
  );
};

export default Hero;
