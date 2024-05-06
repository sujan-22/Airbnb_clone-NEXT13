"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "../../../public/logo.png";

const Logo = () => {
    const router = useRouter();
    return (
        <Image
            className="hidden md:block cursor-pointer"
            src={logo}
            alt="Airbnb"
            width={100}
            height={100}
            onClick={() => router.push("/")}
        />
    );
};

export default Logo;
