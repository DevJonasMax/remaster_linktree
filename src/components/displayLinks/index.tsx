interface displayProps {
    linkName: string;
    colorName: string;
    icon: string;
    colorDisplay: string;
}

export default function DisplayLinks({
    linkName,
    icon,
    colorDisplay,
    colorName,
}: displayProps) {
    return (
        <div
            className="w-full flex flex-row items-center justify-between px-4 py-1 rounded-2xl"
            style={{ backgroundColor: colorDisplay }}
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
