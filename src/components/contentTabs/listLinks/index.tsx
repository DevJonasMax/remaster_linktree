"use client";
import { useState, useEffect } from "react";
import DisplayLinks from "@/components/displayLinks";
import DisplayIcons from "@/context/iconsContext";
import { CiEdit } from "react-icons/ci";
import { SkeletonLinksRealTime } from "@/components/skeleton/skeletonLinks";
import Button from "@/components/button";
import { schema, formData } from "@/schema/formLinks.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


const exemploLinks = [
    {
        url: "https://www.npmjs.com/package/emoji-picker-react",
        name: "teste 01",
        colorName: "#2563EB",
        bgColor: "#ba9b29",
        hideIcon: false,
    },
    {
        url: "https://fontawesome.com/search?q=close&ic=free&o=r",
        name: "teste 02",
        icon: {
            emoji: "😆",
            unicode: "1f606",
            name: "laughing",
        },
        colorName: "#DC2626",
        bgColor: "#9CA3AF",
        hideIcon: false,
    },
    {
        url: "https://www.youtube.com/results?search_query=mask+figma",
        name: "teste 03",
        icon: {
            icon: "FaYoutube",
            color: "#ba9b29",
            size: 24,
        },
        colorName: "#c325eb",
        bgColor: "#16A34A",
        hideIcon: false,
    },
    {
        url: "https://www.npmjs.com/package/emoji-picker-react",
        name: "teste 04",
        icon: null,
        colorName: "#b3b3b3",
        bgColor: "#9333EA",
        hideIcon: true,
    },
];

export default function ListLinks() {
    const [selectedLink, setSelectedLink] = useState<any | null>(null);

    // estados do formulário
    const [url, setUrl] = useState("");
    const [name, setName] = useState("");
    const [colorName, setColorName] = useState("");
    const [bgColor, setBgColor] = useState("");

    // quando trocar link, popular o formulário
    useEffect(() => {
        if (selectedLink) {
            setUrl(selectedLink.url || "");
            setName(selectedLink.name || "");
            setColorName(selectedLink.colorName || "");
            setBgColor(selectedLink.bgColor || "");
        }
    }, [selectedLink]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const updatedLink = {
            ...selectedLink,
            url,
            name,
            colorName,
            bgColor,
        };

        console.log("Salvando link atualizado:", updatedLink);

        // aqui você poderia atualizar seu estado global / fazer requisição API
    };

    return (
        <div className="flex flex-col align-center justify-center w-full h-full">
            <div className="w-full flex items-center justify-start py-5">
                <h2 className="text-2xl font-bold">Links cadastrados</h2>
            </div>

            <section className="p-5 flex border-1 border-neutral-600 rounded-lg flex-wrap gap-5">
                {/* LISTA DE LINKS */}
                <div className="max-w-[300px] w-full flex flex-col flex-wrap gap-5">
                    <SkeletonLinksRealTime>
                        {exemploLinks.map((link: any) => (
                            <button
                                key={link.name}
                                className={`relative w-full flex items-center justify-center rounded-2xl p-1 cursor-pointer ${
                                    selectedLink?.name === link.name
                                        ? "bg-[#98E3E3]/60"
                                        : "bg-transparent"
                                }`}
                                onClick={() => setSelectedLink(link)}
                            >
                                <DisplayLinks
                                    linkName={link.name}
                                    colorName={link.colorName}
                                    icon={
                                        link.icon?.emoji ? (
                                            <DisplayIcons
                                                size={24}
                                                emoji={link.icon.emoji}
                                            />
                                        ) : link.icon?.icon ? (
                                            <DisplayIcons
                                                size={24}
                                                icon={link.icon.icon}
                                                color={link.icon.color}
                                            />
                                        ) : !link.hideIcon ? (
                                            <img
                                                src={`https://www.google.com/s2/favicons?domain=${link.url}&sz=64`}
                                                alt={link.name}
                                                width={24}
                                                height={24}
                                            />
                                        ) : null
                                    }
                                    backgrounColor={link.bgColor}
                                />
                                <CiEdit className="absolute right-5 top-4 text-gray-300 text-[25px]" />
                            </button>
                        ))}
                    </SkeletonLinksRealTime>
                </div>

                {/* FORMULÁRIO */}
                <div className="p-5 flex-1 flex flex-col border-1 border-neutral-600 rounded-lg">
                    <div className="w-full flex items-center justify-start mb-2">
                        <h2 className="text-2xl font-bold">Editar Link</h2>
                    </div>

                    {selectedLink ? (
                        <form
                            onSubmit={handleSubmit}
                            className="w-full flex flex-col gap-5 p-2"
                        >
                            <div>
                                <label className="block text-sm mb-1">
                                    Nome
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>

                            <div>
                                <label className="block text-sm mb-1">
                                    URL
                                </label>
                                <input
                                    type="text"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>

                            <div className="flex gap-5">
                                <div>
                                    <label className="block text-sm mb-1">
                                        Cor Nome
                                    </label>
                                    <input
                                        type="color"
                                        value={colorName}
                                        onChange={(e) =>
                                            setColorName(e.target.value)
                                        }
                                        className="w-12 h-10"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm mb-1">
                                        Cor Fundo
                                    </label>
                                    <input
                                        type="color"
                                        value={bgColor}
                                        onChange={(e) =>
                                            setBgColor(e.target.value)
                                        }
                                        className="w-12 h-10"
                                    />
                                </div>
                            </div>

                            <Button type="submit">Salvar</Button>
                        </form>
                    ) : (
                        <div className="w-full flex-1 items-center justify-center py-2 px-1">
                            <div className="w-full h-full flex items-center justify-center bg-neutral-600/20 rounded-lg">
                                <h2 className="text-2xl font-bold text-gray-100 text-center m-5">
                                    Selecione ao lado o link que deseja editar
                                </h2>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
