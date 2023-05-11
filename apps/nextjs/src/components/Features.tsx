import { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";

const Feature = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex w-full items-center">
      <div className="h-16 w-16 flex-shrink-0 rounded-full bg-gray-300" />
      <div className="ml-4">
        <h3 className="text-xl">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
};

const Features = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // offset: ["end", "end", "end", "start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [370, -370]);

  return (
    <section className="flex w-full flex-col items-center justify-center bg-pink-100 py-32 px-4">
      <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
        Smart Goodies
      </h2>
      <div className="flex w-full flex-col items-center justify-center md:flex-row">
        <div className="flex w-full flex-col items-center justify-center p-10 md:w-1/2">
          {/* <img
            src="https://via.placeholder.com/350x550"
            alt="Placeholder"
            className="h-[500px] w-72 rounded-3xl"
          /> */}
          <div
            ref={ref}
            className="flex h-96 w-52 items-center justify-center overflow-hidden rounded-3xl bg-gray-300"
          >
            <motion.div
              style={{ y }}
              className="flex h-[350px] w-48 items-center justify-center rounded-2xl bg-gray-500"
            >
              Text
            </motion.div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center space-y-8 p-10 md:w-1/2 md:justify-start md:p-0 md:py-10 md:pr-10">
          <Feature
            title="Streamlined Parent-Teacher Communication"
            description="Effortless and Personalized Messaging for Busy Educators"
          />
          <Feature
            title="Automated Text Correction"
            description="Error-free Writing and Feedback with AI-driven Editing"
          />
          <Feature
            title="Innovative Lesson Plan Generation"
            description="Engaging, Tailored Curriculum Design Made Easy for Educators"
          />
          <Feature
            title="Classroom Activity Suggestions"
            description="Discover Creative, Age-Appropriate Learning Experiences for Your  Students"
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
