import React from 'react';

const Hero = () => {
  return (
    <div className="relative  h-[300px] overflow-hidden">
      <img
        src="https://th.bing.com/th/id/OIP.a8_GiC8_OH3U6NEkh1rTXAHaEK?w=320&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
        alt="Investment Banner"
        className="h-full w-full object-cover brightness-75"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
        <h1 className="text-4xl font-semibold tracking-wide">INVEST SMARTER</h1>
        <h1 className="text-4xl font-semibold tracking-wide mt-2">INVEST BETTER</h1>
        <p className="mt-4 text-sm text-gray-200 font-light">
          Score stocks with precision. Make decisions with confidence.
        </p>
      </div>
    </div>
  );
};

export default Hero;
