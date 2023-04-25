import { Fragment } from "react";
import type { NextPage } from "next";

import Layout from "./layout";

const Hero = () => {
  return (
    <section className="container flex flex-col md:flex-row md:py-10 xl:py-20">
      <div className="flex w-full flex-col justify-center p-10 md:w-1/2">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Revolutionize Your Work with AI Teacher Assistant!
        </h1>
        <h3 className="py-5 text-xl tracking-tight md:py-10 md:text-xl">
          Enhance teaching and nurture young minds using smart, adaptable AI
          teacher assistant.
        </h3>
        <button className="mx-auto mt-4 w-24 items-center justify-center rounded-lg bg-black p-2 px-1 font-medium text-white hover:bg-gray-800 md:mx-0 md:mt-0 md:flex">
          Join
        </button>
      </div>

      <div className="flex w-full justify-center p-10 md:w-1/2">
        <img
          src="https://via.placeholder.com/250"
          alt="Placeholder"
          className="h-72 w-72 rounded-full"
        />
      </div>
    </section>
  );
};

const ConnectedCircles = ({ numberOfCircles }: { numberOfCircles: number }) => {
  const circles = Array.from({ length: numberOfCircles }, (_, index) => index);

  return (
    <section className="flex w-full items-center justify-center px-4 py-20">
      <div className="flex h-[28rem] flex-grow flex-col items-center space-y-4 sm:px-10 md:h-full md:flex-row md:space-y-0 md:space-x-8 md:px-20">
        {circles.map((_, index) => (
          <Fragment key={index}>
            <div className="h-24 w-24 flex-none rounded-full border border-solid border-gray-500"></div>
            {index < circles.length - 1 && (
              <div className="my-1 h-auto w-[-2] flex-grow border-r border-solid border-gray-500 md:mx-2 md:my-0 md:h-auto md:border-t"></div>
            )}
          </Fragment>
        ))}
      </div>
    </section>
  );
};

const Home: NextPage = () => {
  return (
    <Layout>
      <main className="flex flex-col items-center text-black">
        <Hero />
        <ConnectedCircles numberOfCircles={3} />
      </main>
    </Layout>
  );
};

export default Home;
