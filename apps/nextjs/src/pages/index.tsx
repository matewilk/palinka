import type { NextPage } from "next";

import Layout from "../layout";
import Hero from "../components/Hero";
import Steps from "../components/Steps";
import Features from "../components/Features";
import Join from "../components/Join";

const steps = ["Pick Your Adventure", "Detail Your Quest", "Unveil the Magic"];

const smartTitle = "Smart Goodies";
const smartFeatures = [
  {
    title: "Streamlined Parent-Teacher Communication",
    description: "Effortless and Personalized Messaging for Busy Educators",
  },
  {
    title: "Automated Text Correction",
    description: "Error-free Writing and Feedback with AI-driven Editing",
  },
];

const creativeTitle = "Creative Goodies";
const creativeFeatures = [
  {
    title: "Innovative Lesson Plan Generation",
    description: "Engaging, Tailored Curriculum Design Made Easy for Educators",
  },
  {
    title: "Classroom Activity Suggestions",
    description:
      "Discover Creative, Age-Appropriate Learning Experiences for Your Students",
  },
];

const Home: NextPage = () => {
  return (
    <Layout>
      <main className="flex flex-col items-center text-black">
        <Hero />
        <Steps steps={steps} />
        <Features title={smartTitle} features={smartFeatures} />
        <Features
          title={creativeTitle}
          features={creativeFeatures}
          reverse={true}
        />
        <Join />
      </main>
    </Layout>
  );
};

export default Home;
