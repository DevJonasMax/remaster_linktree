"use client";
import DisplayLinks from "@/components/displayLinks";
import DisplayIcons, { useIconContext } from "@/context/iconsContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { schema, formData } from "@/schema/formLinks.schema";
import FormLinks from "@/components/forms/formLinks";

import { UserServices } from "@/services/userServices";

export default function AddLinks() {
    const {
        colorIcon,
        iconSelected,
        setIconSelected,
        setColorIcon,
        removeIcon,
    } = useIconContext();
    const userServices = useMemo(() => new UserServices(), []);
    const form = useForm<formData>({
        resolver: zodResolver(schema),
        mode: "onChange",
        defaultValues: {
            url: "",
            name: "",
            icon: null,
            colorName: "#000000",
            bgColor: "#ffffff",
            hideIcon: false,
        },
    });

    useEffect(() => {
        if (iconSelected) {
            setIconSelected("");
            setColorIcon("#000000");
        }
    }, []);

    const { watch, reset } = form;
    const linkName = watch("name");
    const url = watch("url");
    const hideIcon = watch("hideIcon");

    const domain = useMemo(() => {
        try {
            return url ? new URL(url).hostname.replace("www.", "") : null;
        } catch {
            return null;
        }
    }, [url]);

    const onSubmit = (data: formData) => {
        // const uid = uuidv4();
        const uid = "4f02c665-c8cb-4bce-9794-f32861873abd";
        userServices
            .addUserLinks(uid, data)
            .then(() => {
                console.log("Novo link criado:", data);
            })
            .catch((error: any) => {
                console.error("Erro ao criar link:", error);
            });

        console.log("Novo link criado:", data);
        removeIcon();
        reset();
    };
    return (
        <div className="w-full flex flex-wrap gap-5">
            {/* Formulário */}
            <div className="flex-[2] flex-col">
                <div className="flex my-5 items-center justify-start">
                    <h1 className="text-2xl font-bold">Adicione seus links</h1>
                </div>

                <section className="flex flex-col border-1 border-neutral-600/20 pt-10 pb-5 px-5 gap-5 rounded-lg">
                    <FormLinks
                        form={form}
                        mode="create"
                        onSubmit={onSubmit}
                        textButton="Adicionar"
                    />
                </section>
            </div>

            {/* Preview */}
            <div className="flex-1 flex-col gap-3 min-w-[450px] max-w-full">
                <div className="flex my-5.5 items-center justify-start">
                    <h1 className="text-lg font-bold">
                        Veja como está ficando!
                    </h1>
                </div>

                <section className="w-full border-1 border-neutral-600/20 p-5 rounded-lg">
                    {linkName && url ? (
                        <DisplayLinks
                            linkName={linkName}
                            colorName={watch("colorName")}
                            icon={
                                watch("icon.emoji") ? (
                                    <DisplayIcons
                                        size={24}
                                        emoji={watch("icon.emoji")}
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
                            backgrounColor={watch("bgColor")}
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
