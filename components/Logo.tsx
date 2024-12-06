"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();
  const [logoSrc, setLogoSrc] = useState("/images/logo_large.png");

  const handleLogo = () => {
    router.push("/todos");
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

  return (
    <Image
      src={logoSrc}
      alt="logo"
      width={100}
      height={40}
      priority
      onClick={handleLogo}
    />
  );
};

export default Logo;
