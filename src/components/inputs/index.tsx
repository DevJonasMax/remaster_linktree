import { InputProps } from "@/types/index.d";

export default function Inputs({
    inputError,
    width,
    className,
    name,
    register,
    rules,
    error,
    ...props
}: InputProps) {
    return (
        <div>
            <input
                {...(register && register(name, rules))}
                {...props}
                className={` p-2 rounded border border-gray-300 
                focus:outline-none 
                w-full
                ${inputError ? "border-red-700 text-red-400" : ""}
                ${className || ""}`.trim()}
                placeholder={props.placeholder}
            />
            {error && <p className="text-red-400">{`*${error}`}</p>}
        </div>
    );
}
