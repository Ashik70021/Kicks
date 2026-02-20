
import { useState } from 'react';

const slides = [
    {
        bg: '/Images/Banner/image 14.png',
        thumb: '/Images/Banner/Rectangle 1.png',
    },
    {
        bg: '/Images/Banner/Rectangle 2.png',
        thumb: '/Images/Banner/Rectangle 2.png',
    },
];

const Banner = () => {
    const [active, setActive] = useState(0);

    return (
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
            {/* Do it Right text */}
            <div className="flex justify-center">
                <h1 className="text-[clamp(2rem,15vw,18.75rem)] font-bold whitespace-nowrap">
                    DO IT <span className="text-[#4A69E2]">RIGHT</span>
                </h1>
            </div>

            {/* Banner */}
            <div
                className="relative w-full rounded-[48px] overflow-hidden"
                style={{
                    backgroundImage: `url('${slides[active].bg}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '560px',
                }}
            >
                {/* Top-left vertical label */}
                <div className="absolute top-8 sm:top-12 left-0 z-10">
                    <div className="bg-black/80 text-white text-[8px] sm:text-[11px] font-medium tracking-widest uppercase px-1.5 sm:px-2 py-2 sm:py-3 rounded-tl-xl rounded-bl-xl"
                        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                        Nike product of the year
                    </div>
                </div>

                {/* Bottom-left content */}
                <div className="absolute bottom-3 sm:bottom-8 left-3 sm:left-8 z-10 text-white">
                    <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight">NIKE AIR MAX</h1>
                    <p className="mt-1 sm:mt-2 text-[11px] sm:text-[10px] sm:text-sm lg:text-base max-w-[130px] sm:max-w-xs text-[#E7E7E3]">
                        Nike introducing the new air max for everyone's comfort
                    </p>
                    <button className="my-8 sm:my-2 sm:mt-4 bg-[#4A69E2] hover:bg-[#3555c8] transition-colors text-white text-[10px] sm:text-sm font-semibold px-3 sm:px-6 py-1.5 sm:py-2.5 rounded-md">
                        SHOP NOW
                    </button>
                </div>

                {/* Bottom-right thumbnail slider buttons */}
                <div className="absolute bottom-11 sm:bottom-6 right-6  z-10 flex flex-col gap-3">
                    {slides.map((slide, i) => (
                        <button
                            key={i}
                            onClick={() => setActive(i)}
                            className={`w-20 h-16 sm:w-24 sm:h-18 rounded-lg overflow-hidden border-2 transition-all ${
                                active === i ? 'border-white scale-105 shadow-lg' : 'border-transparent opacity-70 hover:opacity-100'
                            }`}
                        >
                            <img
                                src={slide.thumb}
                                alt={`Slide ${i + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Banner;