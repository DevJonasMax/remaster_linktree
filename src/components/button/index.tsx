interface ButtonProps {
    type?: "submit" | "reset" | "button";
    children?: React.ReactNode;
    className?: string;
    name?: string;
    text?: string;
}

export default function Button({
    type,
    children,
    className,
    name,
    text,
}: ButtonProps) {
    return (
        <button
            type={type}
            className={`flex-1 bg-cyan-600 p-2 rounded-lg font-medium text-amber-50 cursor-pointer hover:bg-cyan-500
                        ${className}`}
            name={name}
        >
            {text || children}
        </button>
    );
}
