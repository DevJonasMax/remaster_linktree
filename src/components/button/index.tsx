interface ButtonProps {
    type?: "submit" | "reset" | "button";
    children?: React.ReactNode;
    className?: string;
    name?: string;
    text?: string;
    disabled?: boolean;
}

export default function Button({
    type,
    children,
    className,
    name,
    text,
    disabled = false,
}: ButtonProps) {
    return (
        <button
            type={type}
            disabled={disabled}
            className={`flex-1 bg-cyan-600 p-2 rounded-lg font-medium text-amber-50 cursor-pointer 
                        ${disabled ? "none" : "hover:bg-cyan-500"}
                        ${className}`}
            style={{
                cursor: disabled ? "not-allowed" : "pointer",
            }}
            name={name}
        >
            {text || children}
        </button>
    );
}
