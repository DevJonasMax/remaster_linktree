import type { ColorPickerProps, GetProp } from "antd";
import { ColorPicker } from "antd";

interface CustomPalleteProps {
    color: string; // sempre string
    onChange: (color: string) => void;
    size?: string;
}

export default function CustomPallete({
    color,
    onChange,
    size,
}: CustomPalleteProps) {
    const handleChange: ColorPickerProps["onChange"] = (value) => {
        if (typeof value === "string") {
            onChange(value);
        } else {
            onChange(value.toHexString()); // força para HEX string
        }
    };

    return (
        <div>
            <ColorPicker
                value={color}
                onChange={handleChange}
                size={(size as "large" | "middle" | "small") || "large"}
            />
        </div>
    );
}
