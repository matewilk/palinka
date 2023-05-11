const Join = () => {
  return (
    <section className="flex w-full items-center justify-center py-20 px-4">
      <div className="flex w-full flex-col items-center justify-center rounded-xl bg-gray-100 md:flex-row">
        <div className="flex w-full flex-col items-center justify-center pt-10 md:w-1/3 md:p-10">
          <div className="h-48 w-48 rounded-xl bg-gray-300" />
        </div>
        <div className="flex flex-col items-start justify-center gap-3 p-10 md:w-2/3 md:pr-10">
          <div className="text-3xl font-bold tracking-tight text-gray-700 md:text-3xl">
            Join the waiting list now & be first to access our app&apos;s
            treasures. Sign up today!
          </div>
          <div className="flex flex-row">
            <input
              type="text"
              placeholder="Enter your email"
              className="focus:shadow-outline mt-2 h-10 w-full rounded-lg rounded-r-none border px-3 text-sm text-gray-700 placeholder-gray-600"
            />
            <button className="mt-2 w-full rounded-lg rounded-l-none bg-black py-2 px-4 font-bold text-white hover:bg-gray-800">
              Join the waiting list
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Join;
