interface SelectElementProps {
    options: { id?: string }[];
    selectedOption: string;
    onSelectChange: (value: string) => void;
}

export default function SelectElement({
    options,
    selectedOption,
    onSelectChange,
}: SelectElementProps) {
    return (
        <select>
            <h1></h1>
        </select>
    );
}
