"use client";

import Image from "next/image";
import pfp from "../../public/user.png";

interface AvatarProps {
    src: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
    return (
        <Image
            className="rounded-full"
            height="30"
            width="30"
            alt=""
            src={src || pfp}
        />
        // <div className="rounded-full"></div>
    );
};

export default Avatar;
