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

export default Hero;