import heroImage from "figma:asset/5b5fab7a89bbbf8d984c7bb6949c1dabd7bf3350.png";
import { motion } from "motion/react";

const customStyles = {
  displayFont: {
    fontFamily: "'Anton', sans-serif",
    letterSpacing: "-0.02em",
  },
};

interface AnimatedNameProps {
  text: string;
  style: React.CSSProperties;
  startDelay: number;
  /** Per-letter styles (e.g. gradient text) that must live on each span */
  letterStyle?: React.CSSProperties;
}

const AnimatedName = ({ text, style, startDelay, letterStyle }: AnimatedNameProps) => {
  const letters = text.split("");
  return (
    <h1
      style={{
        ...style,
        display: "flex",
        justifyContent: "center",
      }}
      aria-label={text}
    >
      {letters.map((letter, i) => (
        <motion.span
          key={`${letter}-${i}`}
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.5,
            delay: startDelay + i * 0.04,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{ display: "inline-block", ...letterStyle }}
        >
          {letter}
        </motion.span>
      ))}
    </h1>
  );
};

export const Hero = () => {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: "600px",
        overflow: "hidden",
        backgroundColor: "#111",
      }}
    >
      {/* Full-cover background image — scaled down 20% */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <img
          src={heroImage}
          alt="Ruben Christoffer Damsgaard"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 20%",
            filter: "brightness(0.95) contrast(1.05)",
            transform: "scale(0.8)",
            transformOrigin: "center center",
          }}
        />
      </div>

      {/* Grain overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E\")",
          pointerEvents: "none",
          zIndex: 25,
          opacity: 0.6,
        }}
      />

      {/* Left shadow vignette */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "40%",
          height: "100%",
          background:
            "linear-gradient(to right, rgba(20,20,18,0.85) 0%, rgba(40,40,35,0.6) 30%, rgba(100,100,90,0.3) 60%, transparent 100%)",
          zIndex: 22,
          pointerEvents: "none",
        }}
      />
      {/* Right shadow vignette */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "40%",
          height: "100%",
          background:
            "linear-gradient(to left, rgba(20,20,18,0.85) 0%, rgba(40,40,35,0.6) 30%, rgba(100,100,90,0.3) 60%, transparent 100%)",
          zIndex: 22,
          pointerEvents: "none",
        }}
      />
      {/* Top shadow vignette */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "30%",
          background: "linear-gradient(to bottom, rgba(20,20,18,0.4) 0%, transparent 100%)",
          zIndex: 22,
          pointerEvents: "none",
        }}
      />
      {/* Bottom gradient overlay */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "40%",
          background: "linear-gradient(to top, #FAFAF8 0%, transparent 100%)",
          zIndex: 22,
          pointerEvents: "none",
        }}
      />

      {/* Name */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 0,
          zIndex: 30,
          pointerEvents: "none",
          userSelect: "none",
          width: "100%",
          paddingLeft: "3rem",
          paddingRight: "3rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            lineHeight: "0.85",
            textAlign: "center",
            opacity: 0.9,
            mixBlendMode: "multiply",
          }}
        >
          <AnimatedName
            text="RUBEN"
            startDelay={0.3}
            style={{
              ...customStyles.displayFont,
              fontSize: "clamp(60px, 13vw, 13vw)",
              letterSpacing: "-0.05em",
              lineHeight: 0.85,
              width: "100%",
              margin: 0,
              padding: 0,
            }}
            letterStyle={{
              background: "linear-gradient(to bottom, #1a1a1a, #6b7280)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          />
          <AnimatedName
            text="CHRISTOFFER"
            startDelay={0.5}
            style={{
              ...customStyles.displayFont,
              fontSize: "clamp(60px, 13vw, 13vw)",
              color: "#1a1a1a",
              letterSpacing: "-0.05em",
              lineHeight: 0.85,
              width: "100%",
              margin: 0,
              marginTop: "-2vw",
              padding: 0,
            }}
          />
          <AnimatedName
            text="DAMGAARD"
            startDelay={0.95}
            style={{
              ...customStyles.displayFont,
              fontSize: "clamp(60px, 13vw, 13vw)",
              color: "#9ca3af",
              letterSpacing: "-0.05em",
              lineHeight: 0.85,
              width: "100%",
              margin: 0,
              marginTop: "-2vw",
              marginBottom: "2vw",
              padding: 0,
            }}
          />
        </div>
      </div>
    </section>
  );
};
