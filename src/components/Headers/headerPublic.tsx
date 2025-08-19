import Link from "next/link";
import Image from "next/image";

export default function HeaderPublic() {
    return (
        <div className="w-full  sticky top-0 right-0 ">
            <div className="w-full max-w-6xl gap-5 m-auto h-16 flex items-center px-5">
                <div className="flex-1">
                    <Link href="/">
                        <div className="w-35 h-35 relative">
                            <Image
                                src="/logo_500x500_black_01.webp"
                                alt="logo"
                                fill
                                style={{ objectFit: "contain" }}
                                priority
                            />
                        </div>
                    </Link>
                </div>
                <Link href="/login">
                    <span className="text-md font-medium">login</span>
                </Link>
                <Link href="/register">
                    <span className="text-md font-medium">register</span>
                </Link>
            </div>
        </div>
    );
}
