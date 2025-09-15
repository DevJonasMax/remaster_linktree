import { ReactNode } from "react";

interface displayLinksProps {
    linkName: string;
    colorName: string;
    icon: string | ReactNode;
    backgrounColor: string;
}

export default function DisplayLinks({
    linkName,
    icon,
    backgrounColor,
    colorName,
}: displayLinksProps) {
    return (
        <div
            className="w-full flex flex-row items-center justify-between px-4 py-3 rounded-2xl"
            style={{ backgroundColor: backgrounColor }}
        >
            <span className="text-2xl">{icon}</span>
            <div className="flex text-center w-full">
                <h1
                    style={{ color: colorName }}
                    className="w-full text-md font-semibold "
                >
                    {linkName}
                </h1>
            </div>
        </div>
    );
}
