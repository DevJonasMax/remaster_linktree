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
                {...props}
                {...register(name, rules)}
                className={`p-2 rounded border border-gray-300 
                focus:outline-none 
                w-80 
                ${inputError ? "border-red-700 text-red-400" : ""}
                ${className || ""}`.trim()}
                placeholder={props.placeholder}
            />
            {error && <p>{error}</p>}
        </div>
    );
}
