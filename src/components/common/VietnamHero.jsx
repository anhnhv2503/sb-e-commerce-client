import mtgp from "@/assets/mtgpdtmnvn.png";
import vnflag from "@/assets/vietnam-flag.jpg";
import TankIcon from "@/components/common/icons/TankIcon";
import LovingVietnameToast from "@/components/common/toasts/LovingVietnameToast";
import AOS from "aos";
import "aos/dist/aos.css";
import { Calendar, Heart, Star } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { TypeAnimation } from "react-type-animation";

export default function VietnamReunionHero() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out",
    });
  }, []);

  const handleCalculateYear = () => {
    const currentYear = new Date().getFullYear();
    const reunionYear = 1975;
    return currentYear - reunionYear;
  };

  const handlePrimaryClick = () => {
    toast.custom((t) => <LovingVietnameToast t={t} />, {
      position: "top-center",
      duration: 1000,
    });
  };

  return (
    <div className="relative bg-red-600 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0">
        <div
          data-aos="fade-right"
          data-aos-delay="400"
          className="ml-8 transition-transform duration-300 hover:scale-110 cursor-pointer "
        >
          <TankIcon />
        </div>
        <div
          data-aos="fade-left"
          data-aos-delay="600"
          className="mr-8 absolute top-1/4 right-0 animate-pulse hover:animate-none hover:rotate-12 transition-all cursor-pointer"
        >
          <img
            src={mtgp}
            alt=""
            className="w-32 h-32 rounded-full object-cover transition-all hover:shadow-lg hover:shadow-yellow-400/50"
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between py-12 md:py-24">
          {/* Text content */}
          <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <div
              data-aos="fade-down"
              data-aos-delay="100"
              className="flex items-center justify-center md:justify-start mb-4 text-yellow-400 group cursor-pointer"
            >
              <Calendar className="w-6 h-6 mr-2 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12" />
              <span className="font-medium transition-all duration-300 group-hover:font-bold group-hover:text-white">
                30 tháng 04
              </span>
            </div>

            <h1 data-aos="fade-down" data-aos-delay="300">
              <TypeAnimation
                sequence={[
                  "Đại thắng Mùa Xuân 1975",
                  3000,

                  "Giải phóng miền Nam",
                  3000,

                  "Thống nhất đất nước",
                  3000,
                ]}
                wrapper="span"
                cursor={false}
                repeat={Infinity}
                className="text-3xl md:text-5xl font-bold text-yellow-400 mb-4 inline-block transition-all duration-300 hover:text-white hover:translate-x-2 cursor-pointer"
                speed={50}
              />
            </h1>

            <p
              data-aos="fade-up"
              data-aos-delay="300"
              className="text-white/90 text-lg mb-6 leading-relaxed transition-all duration-300 hover:text-white  rounded-lg cursor-default"
            >
              Ngày 30 tháng 4 năm 1975, giải phóng miền Nam - thống nhất Đất
              nước. Đánh dấu một bước ngoặt quan trọng trong lịch sử Việt Nam,
              kết thúc cuộc chiến tranh dành lại độc lập dân tộc kéo dài suốt 30
              năm.
            </p>

            <div
              data-aos="fade-up"
              data-aos-delay="400"
              className="flex gap-4 justify-center md:justify-start"
            >
              <button
                onClick={handlePrimaryClick}
                className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-red-800  font-bold rounded-lg transition-all duration-300 shadow-lg flex items-center hover:shadow-red-800/50 hover:shadow-lg hover:-translate-y-1 hover:scale-105"
              >
                <Heart
                  className="w-5 h-5 mr-2 transition-transform duration-300 hover:scale-125 hover:rotate-12"
                  fill="red"
                  color="red"
                />
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  Yêu Thương Việt Nam
                </span>
              </button>
              <button className="px-6 py-3 bg-transparent hover:bg-red-700 text-white border-2 border-white font-medium rounded-lg transition-all duration-300 flex items-center hover:border-yellow-400 hover:text-yellow-400 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-800/50">
                <Star
                  className="w-5 h-5 mr-2 transition-transform duration-300 hover:scale-125 hover:rotate-12"
                  fill="yellow"
                  color="yellow"
                />
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  Học Tập - Cống Hiến
                </span>
              </button>
            </div>
          </div>

          {/* Vietnam flag SVG */}
          <div
            data-aos="zoom-in"
            data-aos-delay="300"
            className="w-full md:w-1/2 flex justify-center md:justify-end"
          >
            <div className="relative w-64 h-64 cursor-pointer transition-all duration-500 hover:scale-110 group">
              <div className="absolute inset-0 bg-red-600 rounded-full flex items-center justify-center transition-all duration-500 group-hover:shadow-xl group-hover:shadow-yellow-400/30">
                <img
                  src={vnflag}
                  alt="Vietnam Flag"
                  className="w-64 h-64 rounded-full object-cover transition-transform duration-500 group-hover:rotate-12"
                />
              </div>
              <div
                data-aos="fade-down-left"
                data-aos-delay="600"
                className="absolute -top-4 -right-4 bg-white/10 w-20 h-20 rounded-full backdrop-blur-sm transition-all duration-500 group-hover:scale-125 group-hover:bg-white/20"
              ></div>
              <div
                data-aos="fade-up-right"
                data-aos-delay="700"
                className="absolute -bottom-6 -left-6 bg-white/10 w-16 h-16 rounded-full backdrop-blur-sm transition-all duration-500 group-hover:scale-125 group-hover:bg-white/20"
              ></div>
            </div>
          </div>
        </div>

        {/* Anniversary badge */}
        <div
          data-aos="flip-left"
          data-aos-delay="800"
          className="animate-bounce hover:animate-none absolute top-4 right-4 md:top-8 md:right-8 bg-yellow-400 text-red-800 rounded-full w-16 h-16 flex items-center justify-center font-bold shadow-lg cursor-pointer transition-all hover:scale-125 hover:bg-white hover:shadow-xl hover:shadow-yellow-400/50"
        >
          <div className="text-center leading-tight transition-all">
            <div className="text-2xl">{handleCalculateYear()}</div>
            <div className="text-xs">NĂM</div>
          </div>
        </div>
      </div>
    </div>
  );
}
