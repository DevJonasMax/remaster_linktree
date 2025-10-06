import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema, formData } from "@/schema/formLinks.schema";
import Inputs from "../inputs";
import { useEffect, useMemo, useState } from "react";
import { useIconContext } from "@/context/iconsContext";
import EmojisPikers from "@/components/emojisPikers";
import { EmojiClickData } from "@/types";
import CustomPallete from "@/components/colorPalette/customPallete";
import SimplePalette from "@/components/colorPalette/simplePalette";
import PaginationIcons from "@/components/pagination/paginationIcons";
import { FaRainbow, FaTrashAlt } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import Button from "@/components/button";
import { UseFormReturn } from "react-hook-form";

type LinkFormProps = {
    onSubmit: (data: formData) => void;
    defaultValues?: formData;
    mode: "create" | "edit";
    textButton: string;
    onChange?: (data: formData) => void;
    dasableButton?: boolean;
    form?: UseFormReturn<formData>;
};

export default function Form({
    onSubmit,
    defaultValues,
    mode,
    textButton = "Adicionar",
    onChange,
    dasableButton = false,
    form,
}: LinkFormProps) {
    const {
        colorIcon,
        removeIcon,
        setColorIcon,
        iconSelected,
        setIconSelected,
    } = useIconContext();
    const [hideIcon, setHideIcon] = useState<boolean>(false);
    const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
    const [openIcons, setOpenIcons] = useState<boolean>(false);
    const [openEmoji, setOpenEmoji] = useState<boolean>(false);

    // const {
    //     register,
    //     handleSubmit,
    //     setValue,
    //     watch,
    //     reset,
    //     formState: { errors },
    // } = useForm<formData>({
    //     resolver: zodResolver(schema),
    //     mode: "onChange",
    //     defaultValues,
    // });
    const internalForm = useForm<formData>({
        resolver: zodResolver(schema),
        mode: "onChange",
        defaultValues,
    });

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = form ?? internalForm;

    const values = watch();

    useEffect(() => {
        if (!onChange) return;
        const timeout = setTimeout(() => {
            onChange(values);
        }, 150);
        return () => clearTimeout(timeout);
    }, [values]);

    useEffect(() => {
        if (mode === "edit" && defaultValues) {
            reset(defaultValues);
        }
    }, [mode, defaultValues, reset]);

    const linkName = watch("name");
    const url = watch("url");

    const handleEmojiSelect = (emojiData: EmojiClickData) => {
        const emojiObj = {
            emoji: emojiData.emoji,
            unicode: emojiData.unified,
            name: emojiData.names[0],
        };
        setValue("icon", emojiObj, { shouldValidate: true });
        setSelectedEmoji(emojiData.emoji);
        setIconSelected(null);
        removeIcon();
    };

    const handleIconSelect = (iconName: string) => {
        const iconObj = { icon: iconName, color: colorIcon, size: 24 };
        setValue("icon", iconObj, { shouldValidate: true });
        setIconSelected(iconName);
        setSelectedEmoji(null);
    };

    const handleRemoveIcon = () => {
        setValue("icon", null, { shouldValidate: true });
        setSelectedEmoji(null);
        setIconSelected(null);
        removeIcon();
    };
    const handleClose = () => {
        setOpenEmoji(false);
        setOpenIcons(false);
    };

    const handleOpenEmoji = () => {
        if (openIcons) setOpenIcons(false);
        setOpenEmoji(!openEmoji);
    };
    const handleOpenIcons = () => {
        if (openEmoji) setOpenEmoji(false);
        setOpenIcons(!openIcons);
    };

    const handleSetColorIcon = (color: string) => setColorIcon(color);
    const handleOnSubmit = (data: formData) => {
        onSubmit(data);
    };

    return (
        <form
            className="w-full flex flex-col gap-5"
            onSubmit={handleSubmit(handleOnSubmit)}
        >
            <div>
                <label htmlFor="url">URL do link</label>
                <Inputs
                    type="url"
                    name="url"
                    className="w-full"
                    placeholder="https://www.exemplo.com"
                    register={register}
                    rules={{
                        required: "Campo obrigatório",
                        pattern: {
                            value: /https?:\/\/.+/,
                            message: "URL inválida",
                        },
                    }}
                    inputError={!!errors.url?.message}
                    error={errors.url?.message}
                />
            </div>

            {/* Nome do link */}
            <div>
                <label htmlFor="name">Nome do link</label>
                <Inputs
                    placeholder="exemplo: Meu canal do Youtube"
                    type="text"
                    className="w-full"
                    name="name"
                    register={register}
                    rules={{ required: "Campo obrigatório" }}
                    inputError={!!errors.name?.message}
                    error={errors.name?.message}
                />
            </div>
            {linkName && url ? (
                <section>
                    <div className="w-full flex flex-col gap-3 mt-2 mb-5">
                        <h2>Alterar cor do nome</h2>
                        <div className="w-full flex flex-row gap-10 items-center justify-between">
                            <SimplePalette
                                onSelectColor={(color) =>
                                    setValue("colorName", color)
                                }
                                sizePallete="small"
                                size="24px"
                            />
                            <CustomPallete
                                color={watch("colorName")}
                                onChange={(color) =>
                                    setValue("colorName", color)
                                }
                                size="small"
                            />
                        </div>
                    </div>

                    {/* Ocultar ícone */}
                    <div className="w-full flex items-center justify-end gap-4">
                        <label
                            htmlFor="hideDomainIcon"
                            className="text-lg font-sans"
                        >
                            não mostrar ícone
                        </label>
                        <input
                            type="checkbox"
                            id="hideDomainIcon"
                            {...register("hideIcon")}
                            checked={watch("hideIcon")}
                            onChange={(e) => {
                                setValue("hideIcon", e.target.checked);
                                handleClose();
                                handleRemoveIcon();
                            }}
                            className="w-5 h-5"
                        />
                    </div>

                    {/* Botões de emoji e ícone */}
                    <div className="w-full flex items-center justify-between">
                        <div className="w-fit px-4 py-2 flex items-center gap-5 bg-gray-400/8 rounded-full">
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    className={`p-1 rounded-full bg-gray-700/10  ${
                                        hideIcon
                                            ? "text-gray-400/60"
                                            : "text-black cursor-pointer"
                                    }`}
                                    onClick={handleOpenEmoji}
                                    disabled={hideIcon}
                                >
                                    &#x1F60A;
                                </button>
                                <button
                                    type="button"
                                    className={`p-2 rounded-full bg-gray-700/10 ${
                                        hideIcon
                                            ? "text-gray-400"
                                            : "text-black cursor-pointer"
                                    }`}
                                    onClick={handleOpenIcons}
                                    disabled={hideIcon}
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

                    {/* Painel de seleção */}
                    {openEmoji && <EmojisPikers setEmoji={handleEmojiSelect} />}
                    {openIcons && (
                        <div>
                            <div className="w-full px-10 flex items-center justify-between gap-10">
                                <SimplePalette
                                    sizePallete="small"
                                    onSelectColor={handleSetColorIcon}
                                />
                                <CustomPallete
                                    color={colorIcon}
                                    onChange={handleSetColorIcon}
                                    size="middle"
                                />
                            </div>
                            <PaginationIcons
                                size={25}
                                onIconClick={handleIconSelect}
                            />
                        </div>
                    )}

                    {/* Paleta e personalizar */}
                    <div className="w-full  p-2 bg-gray-400/8 rounded-lg">
                        <h2 className="text-lg font-sans my-2">
                            Cor de fundo do link
                        </h2>
                        <div className="flex  justify-between mb-2">
                            <SimplePalette
                                onSelectColor={(color) =>
                                    setValue("bgColor", color)
                                }
                            />

                            <CustomPallete
                                color={watch("bgColor")}
                                onChange={(color) => setValue("bgColor", color)}
                            />
                        </div>
                    </div>
                </section>
            ) : null}

            {/* Botão de adicionar */}
            <div className="w-full flex">
                <Button type="submit" disabled={dasableButton}>
                    {textButton}
                </Button>
            </div>
        </form>
    );
}
