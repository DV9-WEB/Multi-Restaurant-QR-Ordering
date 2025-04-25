import React from 'react'
import HeroSection from '../components/HeroSection';

const Home = () => {
  return (
    <div className="flex flex-col w-full h-full bg-base-200">
      <main className="flex-grow w-full">
        <HeroSection />
      </main>
    </div>
  );
}

export default Home
