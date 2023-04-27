import type { NextPage } from "next";

import Layout from "../layout";
import Hero from "../components/Hero";
import Steps from "../components/Steps";
import Features from "../components/Features";
import Join from "../components/Join";

const Home: NextPage = () => {
  return (
    <Layout>
      <main className="flex flex-col items-center text-black">
        <Hero />
        <Steps
          numberOfSteps={3}
          texts={[
            "Pick Your Adventure",
            "Detail Your Quest",
            "Unveil the Magic",
          ]}
        />
        <Features />
        <Join />
      </main>
    </Layout>
  );
};

export default Home;
