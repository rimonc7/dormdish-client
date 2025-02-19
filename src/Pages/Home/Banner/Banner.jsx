import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay, Mousewheel, Keyboard } from "swiper/modules";
import slide1 from "../../../assets/slide1.jpg";
import slide2 from "../../../assets/slide2.jpg";
import slide3 from "../../../assets/slide3.jpg";

const Banner = ({ setSearchQuery }) => {
  return (
    <div className="relative">
      <Swiper
        cssMode={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Autoplay, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="relative">
            <img
              src={slide1}
              alt="Slide 1"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
              <h1 className="text-4xl font-bold mb-4">
                Delicious Meals Delivered
              </h1>
              <p className="text-xl mb-6">
                Discover a wide variety of meals that suit your taste.
              </p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative">
            <img
              src={slide2}
              alt="Slide 2"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
              <h1 className="text-4xl font-bold mb-4">
                Fresh and Fast Delivery
              </h1>
              <p className="text-xl mb-6">
                Enjoy your meals with just a few clicks. Fast and fresh.
              </p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative">
            <img
              src={slide3}
              alt="Slide 3"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
              <h1 className="text-4xl font-bold mb-4">Healthy Meals for You</h1>
              <p className="text-xl mb-6">
                Choose from a variety of healthy meals delivered at your door.
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div className="absolute inset-x-0 top-60 flex flex-col justify-center items-center z-10">
        <input
          type="text"
          className="p-2 rounded-md w-72 text-black"
          placeholder="Search for meals"
          onChange={(e) => setSearchQuery(e.target.value || "")}
        />
      </div>
    </div>
  );
};

export default Banner;
