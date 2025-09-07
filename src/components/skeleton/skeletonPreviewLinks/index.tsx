"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@heroui/skeleton";

export default function SkeletonPreviewLinks({
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
        <Skeleton className="w-[200px] h-[20px] rounded bg-gray-300 pulse" />
    );
}
