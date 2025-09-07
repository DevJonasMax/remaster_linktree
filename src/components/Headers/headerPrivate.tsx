"use client";

import Link from "next/link";
import Image from "next/image";

export default function HeaderPrivate() {
    return (
        <div className="w-full shadow-md sticky top-0 right-0 z-50 bg-accent">
            <div className="w-full max-w-6xl m-auto h-16 flex items-center  gap-5 justify-between px-2 overflow-hidden">
                <Link href="/" className="w-16 h-full relative">
                    <Image
                        src="/logo_resized.webp"
                        alt="logo"
                        fill
                        style={{ objectFit: "contain" }}
                        priority
                    />
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
