"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@heroui/skeleton";

export function SkeletonLinksRealTime({
    children,
}: {
    children: React.ReactNode;
}) {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const id = setTimeout(() => setLoaded(true), 3000);
        return () => clearTimeout(id);
    }, []);

    return loaded ? (
        children
    ) : (
        <div className="flex flex-col gap-4">
            <Skeleton className="w-full h-[40px] rounded bg-gray-300 pulse" />
            <Skeleton className="w-full h-[40px] rounded bg-gray-300 pulse" />
            <Skeleton className="w-full h-[40px] rounded bg-gray-300 pulse" />
            <Skeleton className="w-full h-[40px] rounded bg-gray-300 pulse" />
        </div>
    );
}
