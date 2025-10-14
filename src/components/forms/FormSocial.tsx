import { useState } from "react";
import { socialFormSchema, schema } from "@/schema/socialForm.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/inputs";
import { useIconContext } from "@/context/iconsContext";
import { FaRainbow, FaTrashAlt } from "react-icons/fa";
import EmojisPikers from "@/components/emojisPikers";
import { MdOutlineClose } from "react-icons/md";
import CustomPallete from "@/components/colorPalette/customPallete";
import SimplePalette from "@/components/colorPalette/simplePalette";
import PaginationIcons from "@/components/pagination/paginationIcons";
import { EmojiClickData } from "@/types";

interface FormSocialProps {
    defaultValues: socialFormSchema;
    closeModal: (close: boolean) => void;
}

export default function FormSocial({
    defaultValues,
    closeModal,
}: FormSocialProps) {
    const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
    const [openIcons, setOpenIcons] = useState<boolean>(false);
    const [openEmoji, setOpenEmoji] = useState<boolean>(false);
    const {
        colorIcon,
        removeIcon,
        setColorIcon,
        iconSelected,
        setIconSelected,
    } = useIconContext();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<socialFormSchema>({
        resolver: zodResolver(schema),
        mode: "onChange",
        defaultValues,
    });

    const handleOpenEmoji = () => {
        setOpenEmoji(true);
        setOpenIcons(false);
    };
    const handleOpenIcons = () => {
        setOpenIcons(true);
        setOpenEmoji(false);
    };
    const handleClose = () => {
        setOpenEmoji(false);
        setOpenIcons(false);
    };
    const handleRemoveIcon = () => {
        removeIcon();
        setSelectedEmoji(null);
    };
    const handleEmojiSelect = (emojiData: EmojiClickData) => {
        const emojiObj = {
            type: "emoji",
            emoji: emojiData.emoji,
            unicode: emojiData.unified,
            name: emojiData.names[0],
        } as const;
        setValue("icon", emojiObj, { shouldValidate: true });
        setSelectedEmoji(emojiData.emoji);
        setIconSelected(null);
        removeIcon();
    };

    const handleIconSelect = (iconName: string) => {
        const iconObj = {
            type: "icon",
            icon: iconName,
            color: colorIcon,
            size: 24,
        } as const;
        setValue("icon", iconObj, { shouldValidate: true });
        setIconSelected(iconName);
        setSelectedEmoji(null);
    };
    const handleSetColorIcon = (color: string) => {
        setColorIcon(color);
        setValue("icon.color", color, {
            shouldValidate: true,
            shouldDirty: true,
        });
    };

    const handleOnSubmit = (data: socialFormSchema) => {
        console.log(data);
        closeModal(true);
    };

    return (
        <form
            id="formSocialMedias"
            onSubmit={handleSubmit(handleOnSubmit)}
            className="w-full flex flex-col gap-5"
        >
            <div>
                <label htmlFor="url">URL</label>
                <Input
                    id="url"
                    name="url"
                    placeholder="Digite a URL"
                    register={register}
                    rules={{ required: "Campo obrigatório" }}
                    inputError={!!errors.url?.message}
                    error={errors.url?.message}
                />
            </div>
            <div className="w-full flex items-center justify-between">
                <div className="w-fit px-4 py-2 flex items-center gap-5 bg-gray-400/8 rounded-full">
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            className={`p-1 rounded-full bg-gray-700/10 `}
                            onClick={handleOpenEmoji}
                        >
                            &#x1F60A;
                        </button>
                        <button
                            type="button"
                            className={`p-2 rounded-full bg-gray-700/10 `}
                            onClick={handleOpenIcons}
                        >
                            <FaRainbow size={20} />
                        </button>
                    </div>
                    {(openEmoji || openIcons) && (
                        <button
                            type="button"
                            className="p-2 rounded-full bg-gray-700/10 cursor-pointer text-black font-bold hover:bg-gray-700/30"
                            onClick={handleClose}
                        >
                            <MdOutlineClose size={20} />
                        </button>
                    )}
                </div>

                {(iconSelected || selectedEmoji) && (
                    <button
                        type="button"
                        onClick={handleRemoveIcon}
                        className="w-fit p-2 flex items-center justify-center gap-2 bg-gray-700/10 rounded-full cursor-pointer"
                    >
                        <FaTrashAlt />
                    </button>
                )}
            </div>

            {/* Painel de seleção de icones*/}
            {openEmoji && <EmojisPikers setEmoji={handleEmojiSelect} />}
            {openIcons && (
                <div>
                    <PaginationIcons size={25} onIconClick={handleIconSelect} />
                    <div className="w-full px-10 flex items-center justify-between gap-10 mt-5 mb-3">
                        <SimplePalette
                            sizePallete="small"
                            onSelectColor={handleSetColorIcon}
                        />
                        <CustomPallete
                            color={colorIcon}
                            onChange={setColorIcon}
                            size="middle"
                        />
                    </div>
                </div>
            )}
            <hr className="my-4 border-gray-400/30" />
        </form>
    );
}
