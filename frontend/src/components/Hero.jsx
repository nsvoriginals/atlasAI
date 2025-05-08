import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-[#ffffff] bg-opacity-30 py-10 sm:py-16 lg:py-24">
      <div className="px-4 mx-auto max-w-8xl sm:px-6 lg:px-8 flex items-center">
        <div className="flex flex-col space-y-4 w-full">
          <div className="reveal-container text-center">
            <p className="flap-reveal text-base font-semibold tracking-wider text-blue-600 uppercase">
              A Platform for your Future
            </p>
          </div>
          <div className="text-center lg:mt-10">
            <h1 className="flap-reveal text-9xl font-bold text-black leading-none">
              <span className="inline-flex items-center justify-center pl-8 pr-6 pt-1 pb-5 mr-4 bg-blue-500 text-white rounded-full">
                Ace
              </span>
              your Interview,
            </h1>
            <span className="flap-reveal block text-7xl font-bold text-black">Every. Single. Time.</span>
          </div>
          <p className="flap-reveal mt-4 text-base text-black lg:mt-8 sm:text-xl text-center">
            Grow your career fast at the right place.
          </p>
          <div className="flex justify-center">
            <a
              href="#"
              className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-black bg-blue-300 rounded-full hover:bg-blue-400"
            >
              Join for free
              <svg className="w-6 h-6 ml-8 -mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </a>
          </div>
          <p className="mt-5 text-gray-600 text-center">
            Already joined us? <a href="#" className="text-black hover:underline">Log in</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;