import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative w-full h-screen max-h-screen">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={3000}
        showArrows={false}
        swipeable
        className="h-full"
      >
        <div className="h-screen">
          <img
            src="https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Slide 1"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="h-screen">
          <img
            src="https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Slide 2"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="h-screen">
          <img
            src="https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Slide 3"
            className="object-cover w-full h-full"
          />
        </div>
      </Carousel>

      <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center px-4">
        <div className="text-white">
          <h1 className="text-3xl md:text-6xl font-bold">
            Smart Dining Experience
          </h1>
          <p className="text-base md:text-lg my-3">
            QR-based seamless ordering system
          </p>
          <Link to="/signup" className="btn btn-outline mt-4 px-8 text-lg">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
