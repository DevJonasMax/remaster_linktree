import Inputs from "@/components/inputs";
import SimplePalette from "@/components/colorPalette/simplePalette";
import DisplayLinks from "@/components/displayLinks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import EmojisPikers from "@/components/emojisPikers";
import { useState, useMemo } from "react";
import { FaRainbow, FaTrashAlt } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import PaginationIcons from "@/components/pagination/paginationIcons";
import DisplayIcons, { useIconContext } from "@/context/iconsContext";
import { schema, formData } from "@/schema/formLinks.schema";
import CustomPallete from "@/components/colorPalette/customPallete";
import Button from "@/components/button";
import { EmojiClickData } from "@/types";

export default function AddLinks() {
    const [openEmoji, setOpenEmoji] = useState<boolean>(false);
    const [openIcons, setOpenIcons] = useState<boolean>(false);
    const [hideIcon, setHideIcon] = useState<boolean>(false);

    const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
    const [colorNameLink, setColorNameLink] = useState<string>("#FFFFFF");
    const [bgLinksColor, setBgLinksColor] = useState<string>("#ba9b29");

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
        watch,
        formState: { errors },
    } = useForm<formData>({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    const linkName = watch("name");
    const url = watch("url");

    const domain = useMemo(() => {
        try {
            return url ? new URL(url).hostname.replace("www.", "") : null;
        } catch {
            return null;
        }
    }, [url]);

    const handleOpenIcons = () => {
        if (openEmoji) setOpenEmoji(false);
        setOpenIcons(!openIcons);
    };

    const handleOpenEmoji = () => {
        if (openIcons) setOpenIcons(false);
        setOpenEmoji(!openEmoji);
    };

    const handleClose = () => {
        setOpenEmoji(false);
        setOpenIcons(false);
    };

    const resetForm = () => {
        setValue("url", "");
        setValue("name", "");
        setValue("icon", null);
        setBgLinksColor("#ba9b29");
        setColorNameLink("#FFFFFF");
        setOpenIcons(false);
        removeIcon();
    };

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
        const iconObj = {
            icon: iconName,
            color: colorIcon,
            size: 24,
        };
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

    const handleSetColorIcon = (color: string) => {
        setColorIcon(color);
    };

    const onSubmit = (data: formData) => {
        const dataLinks = {
            ...data,
            colorName: colorNameLink,
            bgColor: bgLinksColor,
            hideIcon: hideIcon,
        };
        alert("Adicionado com sucesso!");
        console.log(dataLinks);
        resetForm();
    };

    return (
        <div className="w-full flex flex-wrap gap-5">
            {/* Formulário de adicionar links */}
            <div className="flex-[2] flex-col">
                <div className="flex my-5 items-center justify-start">
                    <h1 className="text-2xl font-bold">Adicione seus links</h1>
                </div>
                <section className="flex flex-col border-1 pt-10 pb-5 px-5 gap-5 rounded-lg">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="w-full flex flex-col gap-5"
                    >
                        {/* URL */}
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
                                            onSelectColor={setColorNameLink}
                                            sizePallete="small"
                                            size="24px"
                                        />
                                        <CustomPallete
                                            color={colorNameLink}
                                            onChange={setColorNameLink}
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
                                        checked={hideIcon}
                                        onChange={(e) => {
                                            setHideIcon(e.target.checked);
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
                                                className={`p-1 rounded-full bg-gray-700/10 cursor-pointer ${
                                                    hideIcon
                                                        ? "text-gray-400"
                                                        : "text-black"
                                                }`}
                                                onClick={handleOpenEmoji}
                                                disabled={hideIcon}
                                            >
                                                &#x1F60A;
                                            </button>
                                            <button
                                                type="button"
                                                className={`p-2 rounded-full bg-gray-700/10 cursor-pointer ${
                                                    hideIcon
                                                        ? "text-gray-400"
                                                        : "text-black"
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
                                {openEmoji && (
                                    <EmojisPikers
                                        setEmoji={handleEmojiSelect}
                                    />
                                )}
                                {openIcons && (
                                    <div>
                                        <div className="w-full px-10 flex items-center justify-between gap-10">
                                            <SimplePalette
                                                sizePallete="small"
                                                onSelectColor={
                                                    handleSetColorIcon
                                                }
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
                                            onSelectColor={setBgLinksColor}
                                        />

                                        <CustomPallete
                                            color={bgLinksColor}
                                            onChange={setBgLinksColor}
                                        />
                                    </div>
                                </div>
                            </section>
                        ) : null}

                        {/* Botão de adicionar */}
                        <div className="w-full flex">
                            <Button type="submit">Adicionar</Button>
                        </div>
                    </form>
                </section>
            </div>

            {/* Preview */}
            <div className="flex-1 flex-col gap-3 min-w-[450px] max-w-full">
                <div className="flex my-5.5 items-center justify-start">
                    <h1 className="text-lg font-bold">
                        Veja como está ficando!
                    </h1>
                </div>
                <section className="w-full border-1 p-5 rounded-lg">
                    {linkName && url ? (
                        <DisplayLinks
                            linkName={linkName}
                            colorName={colorNameLink}
                            icon={
                                selectedEmoji ? (
                                    <DisplayIcons
                                        size={24}
                                        emoji={selectedEmoji}
                                    />
                                ) : iconSelected ? (
                                    <DisplayIcons
                                        size={24}
                                        icon={iconSelected}
                                        color={colorIcon}
                                    />
                                ) : domain && !hideIcon ? (
                                    <img
                                        src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
                                        alt={domain}
                                        width={24}
                                        height={24}
                                    />
                                ) : null
                            }
                            backgrounColor={bgLinksColor}
                        />
                    ) : (
                        <p className="text-center text-gray-500">
                            Adicione um link para ver a prévia
                        </p>
                    )}
                </section>
            </div>
        </div>
    );
}
