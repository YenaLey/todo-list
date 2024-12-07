"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();
  const [logoSrc, setLogoSrc] = useState("/images/logo_large.png");

  const handleLogo = () => {
    router.push("/");
  };

  useEffect(() => {
    const updateLogo = () => {
      if (window.innerWidth <= 450) {
        setLogoSrc("/images/logo_small.png");
      } else {
        setLogoSrc("/images/logo_large.png");
      }
    };

    updateLogo();

    window.addEventListener("resize", updateLogo);

    return () => {
      window.removeEventListener("resize", updateLogo);
    };
  }, []);

  return <img src={logoSrc} alt="logo" onClick={handleLogo} />;
};

export default Logo;
