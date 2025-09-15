import type { ColorPickerProps, GetProp } from "antd";
import { ColorPicker } from "antd";

interface CustomPalleteProps {
    color: string; // sempre string
    onChange: (color: string) => void;
}

export default function CustomPallete({ color, onChange }: CustomPalleteProps) {
    const handleChange: ColorPickerProps["onChange"] = (value) => {
        if (typeof value === "string") {
            onChange(value);
        } else {
            onChange(value.toHexString()); // força para HEX string
        }
    };

    return (
        <div>
            <ColorPicker value={color} onChange={handleChange} size="large" />
        </div>
    );
}
