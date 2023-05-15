import { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";

type Feature = {
  title: string;
  description: string;
};

const Feature = ({ title, description }: Feature) => {
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

const Features = ({
  features,
  title,
  reverse = false,
}: {
  features: Feature[];
  title: string;
  reverse?: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
  });
  const y = useTransform(scrollYProgress, [0.7, 1], ["0%", "100%"]);

  return (
    <section className="flex w-full flex-col items-center justify-center py-32 px-4">
      <h2 className="text-4xl font-bold tracking-tight md:text-5xl">{title}</h2>
      <div className="flex w-full flex-col items-center justify-center md:flex-row">
        <div
          className={`flex w-full flex-col items-center justify-center p-10 md:w-1/2 ${
            reverse ? "md:order-last" : ""
          }`}
        >
          <div
            ref={ref}
            className="flex h-96 w-52 items-center justify-center overflow-hidden rounded-3xl bg-gray-300"
          >
            <motion.div
              style={{ y }}
              className="flex h-[350px] w-48 items-center justify-center rounded-2xl bg-gray-500"
            ></motion.div>
          </div>
        </div>
        <div
          className={`flex flex-col items-center justify-center space-y-8 p-10 md:w-1/2 md:justify-start md:p-0 md:py-10 md:pr-10 ${
            reverse ? "md:pr-0 md:pl-24" : "md:pr-10"
          }`}
        >
          {features.map((feature, index) => (
            <Feature
              key={index}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
