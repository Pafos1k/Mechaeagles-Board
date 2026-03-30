import React from "react";

interface Logo {
  src: string;
  alt: string;
}

interface LogoCloudProps {
  logos: Logo[];
}

export const LogoCloud: React.FC<LogoCloudProps> = React.memo(({ logos }) => {
  // Duplicate the logos for a seamless loop (matches -50% marquee animation)
  const displayLogos = [...logos, ...logos];

  return (
    <div className="w-full overflow-hidden py-6">
      <div className="flex whitespace-nowrap animate-marquee w-max transform-gpu">
        <div className="flex items-center gap-16 md:gap-24 px-8 backface-hidden">
          {displayLogos.map((logo, i) => (
            <div 
              key={`${logo.alt}-${i}`} 
              className="flex items-center justify-center"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                decoding="async"
                className={`w-auto object-contain opacity-35 hover:opacity-100 transition-all duration-700 will-change-transform transform-gpu grayscale hover:grayscale-0 ${
                  logo.alt === "IGO'S" ? "h-6 md:h-8" : "h-8 md:h-12"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

LogoCloud.displayName = 'LogoCloud';
