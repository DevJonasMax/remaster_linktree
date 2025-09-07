import Inputs from "@/components/inputs";
import SimplePalette from "@/components/colorPalette/simplePalette";
import SkeletonPreviewLinks from "@/components/skeleton/skeletonPreviewLinks";
import DisplayLinks from "@/components/displayLinks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import EmojisPikers from "@/components/emojisPikers";
import { useState } from "react";
import { FaRainbow } from "react-icons/fa";
import PaginationIcons from "@/components/pagination/paginationIcons";

const schema = z.object({
    url: z.url({
        message: "URL inválida",
        protocol: /^https?$/,
        hostname: /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*$/,
        normalize: true,
    }),
    name: z.string().min(1, {
        message: "Campo obrigatório",
    }),
});

type formData = z.infer<typeof schema>;

export default function AddLinks() {
    const [openEmoji, setOpenEmoji] = useState<boolean>(false);
    const [openIcons, setOpenIcons] = useState<boolean>(false);
    const [emoji, setEmoji] = useState<string>("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<formData>({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    const onSubmit = (data: formData) => {
        console.log(data);
    };

    const handleOpenIcons = () => {
        if (openEmoji) {
            setOpenEmoji(false);
        }
        setOpenIcons(!openIcons);
    };
    const handleOpenEmoji = () => {
        if (openIcons) {
            setOpenIcons(false);
        }
        setOpenEmoji(!openEmoji);
    };

    return (
        <div className="w-full flex gap-5 flex-wrap">
            {/* adicionar links  --- */}
            <div className="flex-2 flex-col ">
                <div className="flex my-5 items-center justify-start">
                    <h1 className="text-2xl font-bold">Adicione seus links</h1>
                </div>
                <section className="flex flex-col border-1 pt-10 pb-5 px-5 gap-5 rounded-lg ">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="w-full flex flex-col gap-5"
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
                        <div>
                            <label htmlFor="name">Nome do link</label>

                            <Inputs
                                placeholder="exemplo: Meu canal do Youtube"
                                type="text"
                                className="w-full"
                                name="name"
                                register={register}
                                rules={{
                                    required: "Campo obrigatório",
                                }}
                                inputError={!!errors.name?.message}
                                error={errors.name?.message}
                            />
                        </div>

                        <div className="w-full flex items-center justify-start gap-2">
                            <button
                                className="p-1 rounded-full bg-gray-700/10 cursor-pointer"
                                onClick={handleOpenEmoji}
                            >
                                &#x1F60A;
                            </button>
                            <button
                                className="p-2 rounded-full bg-gray-700/10 cursor-pointer"
                                onClick={handleOpenIcons}
                            >
                                <FaRainbow size={20} />
                            </button>
                        </div>

                        {openEmoji && <EmojisPikers setEmoji={setEmoji} />}
                        {openIcons && <PaginationIcons />}
                        <div className="flex items-center justify-between pr-5">
                            <SimplePalette />

                            <div>
                                <button className="bg-cyan-600 p-2 rounded-lg font-medium text-amber-50 cursor-pointer hover:bg-cyan-500">
                                    Personalizar
                                </button>
                            </div>
                        </div>
                        <div className="w-full flex">
                            <button className="flex-1 bg-cyan-600 p-2 rounded-lg font-medium text-amber-50 cursor-pointer hover:bg-cyan-500">
                                Adicionar
                            </button>
                        </div>
                    </form>
                </section>
            </div>

            {/* preview */}
            <div className="flex-1 flex-col gap-3 min-w-[450px] max-w-full">
                <div className="flex my-5.5 items-center justify-start">
                    <h1 className="text-lg font-bold">
                        Veja como esta ficando!
                    </h1>
                </div>
                <section className="w-full border-1 p-5 rounded-lg ">
                    <SkeletonPreviewLinks>
                        <DisplayLinks
                            linkName="Meu canal do Youtube"
                            colorName="red"
                            icon="Y"
                            colorDisplay="blue"
                        />
                    </SkeletonPreviewLinks>
                </section>
            </div>
        </div>
    );
}
