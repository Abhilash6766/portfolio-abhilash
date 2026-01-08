import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { personalDetails } from "../Details";

function Home() {
  const { name, img } = personalDetails;

  const h11 = useRef(null);
  const h12 = useRef(null);
  const h13 = useRef(null);
  const myimageref = useRef(null);

  const roles = ["Full Stack Java Developer", "AI / ML Engineer", "Software Engineer"];
  const [currentRole, setCurrentRole] = useState(0);
  const [fade, setFade] = useState(true);
  const [introDone, setIntroDone] = useState(false);

  // ✅ GSAP entrance animation
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const tl = gsap.timeline({
      onComplete: () => setIntroDone(true),
    });

    tl.from(h11.current, {
      xPercent: -100,
      delay: 0.6,
      opacity: 0,
      duration: 1.6,
      ease: "power3.out",
    })
      .from(
        h12.current,
        {
          xPercent: -100,
          opacity: 0,
          duration: 1.6,
          ease: "power3.out",
        },
        "<0.15"
      )
      .from(
        h13.current,
        {
          xPercent: -100,
          opacity: 0,
          duration: 1.6,
          ease: "power3.out",
        },
        "<0.15"
      )
      .from(
        myimageref.current,
        isMobile
          ? {
              opacity: 0,
              duration: 1.2,
              ease: "power3.out",
            }
          : {
              xPercent: 120,
              opacity: 0,
              duration: 1.6,
              ease: "power3.out",
            },
        "<0.15"
      );

    return () => tl.kill();
  }, []);

  // ✅ Role rotation (starts after intro)
  useEffect(() => {
    if (!introDone) return;

    let timeoutId;
    const intervalId = setInterval(() => {
      setFade(false);
      timeoutId = setTimeout(() => {
        setCurrentRole((prev) => (prev + 1) % roles.length);
        setFade(true);
      }, 250);
    }, 2000);

    return () => {
      clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [introDone, roles.length]);

  return (
    <main
      className="
        container mx-auto max-width section
        flex flex-col md:flex-row md:flex-nowrap
        justify-between items-center gap-10
        overflow-x-hidden
      "
    >
      {/* Left text */}
      <div className="w-full md:w-auto">
        <h1
          ref={h11}
          className="text-2xl text-dark-heading dark:text-light-heading md:text-4xl xl:text-5xl xl:leading-tight font-bold"
        >
          Hi, 👋 <br />
          My Name is <br />
        </h1>

        <h1
          ref={h12}
          className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 md:text-4xl xl:text-5xl xl:leading-tight font-bold"
        >
          {name}
        </h1>

        <h2
          ref={h13}
          className={`text-2xl text-dark-heading dark:text-light-heading md:text-4xl xl:text-5xl xl:leading-tight font-bold transition-opacity duration-300
          ${fade ? "opacity-100" : "opacity-0"}
          inline-block min-h-[3.25rem] min-w-[28ch]`}
        >
          {roles[currentRole]}
        </h2>
      </div>

      {/* Right image (no clipping) */}
      <div className="w-full md:w-auto flex justify-center md:justify-end">
        <div
          ref={myimageref}
          className="
            w-44 h-44
            sm:w-52 sm:h-52
            md:w-60 md:h-60
            lg:w-72 lg:h-72
            rounded-full
            border-4 border-pink-500
            bg-white
            p-2
            flex-shrink-0
            overflow-hidden
          "
        >
          <img
            src={img}
            alt="Abhilash Reddy"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </main>
  );
}

export default Home;
