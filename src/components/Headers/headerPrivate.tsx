"use client";

import Link from "next/link";
import Image from "next/image";

export default function HeaderPrivate() {
    return (
        <div className="w-full shadow-md sticky top-0 right-0 ">
            <div className="w-full max-w-6xl m-auto h-16 flex items-center  gap-5 justify-between px-2 overflow-hidden">
                <Link href="/">
                    <div className="relative h-30 w-30 cursor-pointer -translate-x-8 -translate-y-1.5">
                        <Image
                            src="/logo_500x500_black_01.webp"
                            alt="logo"
                            fill
                            style={{ objectFit: "contain" }}
                            priority
                        />
                    </div>
                </Link>
                <div className="flex items-center gap-5">
                    <span
                        className="text-md font-medium cursor-pointer"
                        onClick={() => (window.location.href = "/admin")}
                    >
                        Admin
                    </span>
                    <Link href="/admin/profile">
                        <span className="text-md font-medium">Perfil</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
