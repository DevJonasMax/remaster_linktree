"use client";

import { useEffect, useMemo, useState } from "react";
import DisplayLinks from "@/components/displayLinks";
import DisplayIcons, { useIconContext } from "@/context/iconsContext";
import { CiEdit } from "react-icons/ci";
import { FaTrashAlt } from "react-icons/fa";
import { SkeletonLinksRealTime } from "@/components/skeleton/skeletonLinks";
import { formData } from "@/schema/formLinks.schema";
import FormLinks from "@/components/forms/formLinks";
import { UserServices } from "@/services/userServices";
import Modal from "@/components/modal";

// const exemploLinks = [
//     {
//         id: 1,
//         url: "https://www.npmjs.com/package/emoji-picker-react",
//         name: "teste 01",
//         colorName: "#2563EB",
//         bgColor: "#ba9b29",
//         hideIcon: false,
//     },
//     {
//         id: 2,
//         url: "https://fontawesome.com/search?q=close&ic=free&o=r",
//         name: "teste 02",
//         icon: {
//             emoji: "😆",
//             unicode: "1f606",
//             name: "laughing",
//         },
//         colorName: "#DC2626",
//         bgColor: "#9CA3AF",
//         hideIcon: false,
//     },
//     {
//         id: 3,
//         url: "https://www.youtube.com/results?search_query=mask+figma",
//         name: "teste 03",
//         icon: {
//             icon: "FaYoutube",
//             color: "#ba9b29",
//             size: 24,
//         },
//         colorName: "#c325eb",
//         bgColor: "#16A34A",
//         hideIcon: false,
//     },
//     {
//         id: 4,
//         url: "https://www.npmjs.com/package/emoji-picker-react",
//         name: "teste 04",
//         icon: null,
//         colorName: "#b3b3b3",
//         bgColor: "#9333EA",
//         hideIcon: true,
//     },
// ];

export default function ListLinks() {
    const [links, setLinks] = useState<any[]>([]);
    const [selectedLink, setSelectedLink] = useState<any | null>(null);
    const [unsavedChanges, setUnsavedChanges] = useState(false);
    const [originalLink, setOriginalLink] = useState<any | null>(null);
    const userServices = useMemo(() => new UserServices(), []);
    const [openModal, setOpenModal] = useState(false);
    const { setIconSelected, setColorIcon, iconSelected, colorIcon } =
        useIconContext();

    useEffect(() => {
        const UId = "4f02c665-c8cb-4bce-9794-f32861873abd";
        userServices
            .getUserLinks(UId)
            .then((userData) => {
                if (userData) {
                    setLinks(userData.data as formData[]);
                } else {
                    setLinks([]);
                }
            })
            .catch((error: any) => {
                console.error("Erro ao obter links:", error);
            });
    }, []);

    const handleLiveUpdate = (updatedData: formData) => {
        if (!selectedLink) return;

        const hasChanged =
            JSON.stringify(selectedLink) !== JSON.stringify(updatedData);
        if (!hasChanged) return;

        setLinks((prevLinks) =>
            prevLinks.map((link) =>
                link.id === selectedLink.id ? { ...link, ...updatedData } : link
            )
        );

        setSelectedLink((prev: any) =>
            prev ? { ...prev, ...updatedData } : prev
        );

        setUnsavedChanges(true);
    };

    // Seleciona um item e trata alterações não salvas
    const handleSelectLink = (link: { id: number } & formData) => {
        if (unsavedChanges && originalLink) {
            const confirmSave = window.confirm(
                "Você tem alterações não salvas. Deseja salvar antes de mudar de item?"
            );

            if (confirmSave) {
                handleSubmit(selectedLink); // salva somente se houver alteração
            } else {
                // descarta alterações
                setLinks((prev) =>
                    prev.map((l) =>
                        l.id === selectedLink?.id ? { ...originalLink } : l
                    )
                );
                setSelectedLink({ ...originalLink }); // restaura o formulário
            }
        }

        // Define o novo item selecionado
        if (link.icon?.type === "icon") {
            setIconSelected(link.icon.icon);
            setColorIcon(link.icon.color || "");
        } else {
            setIconSelected("");
            setColorIcon("");
        }
        setSelectedLink(link);
        setOriginalLink({ ...link }); // cópia do original

        setUnsavedChanges(false);
    };

    const handleSubmit = async (data: formData) => {
        if (!selectedLink) return;
        const UID = "4f02c665-c8cb-4bce-9794-f32861873abd";
        const currentWithId = { ...selectedLink, ...data };

        // Evita salvar se nada mudou
        if (JSON.stringify(currentWithId) === JSON.stringify(originalLink))
            return;

        try {
            // Atualiza visualmente primeiro (optimistic update)
            setLinks((prevLinks) =>
                prevLinks.map((link) =>
                    link.id === selectedLink.id ? { ...link, ...data } : link
                )
            );

            // Atualiza no Firestore
            const result = await userServices.updateUserLink(
                UID,
                selectedLink.id,
                data
            );

            if (!result.success) {
                alert("Erro ao atualizar link: " + result.error);
                return;
            }

            setSelectedLink((prev: any) =>
                prev ? { ...prev, ...data } : prev
            );
            setOriginalLink({ ...currentWithId });
            setUnsavedChanges(false);

            console.log("✅ Link atualizado com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar link:", error);
        }
    };

    const handleDeleteLink = async (id: string) => {
        const UID = "4f02c665-c8cb-4bce-9794-f32861873abd";
        try {
            const result = await userServices.deleteUserLink(UID, id);

            if (!result.success) {
                alert("Erro ao excluir link: " + result.error);
                return;
            }

            // Atualiza localmente (remove da lista)
            setLinks((prev) => prev.filter((link) => link.id !== id));

            // Se estava editando o link excluído, limpa o formulário
            if (selectedLink?.id === id) {
                setSelectedLink(null);
                setOriginalLink(null);
            }

            console.log(`🗑️ Link ${id} removido com sucesso!`);
        } catch (error) {
            console.error("Erro ao deletar link:", error);
        } finally {
            setOpenModal(false);
        }
    };

    return (
        <div className="flex flex-col align-center justify-center w-full h-full">
            <div className="w-full flex items-center justify-start py-5">
                <h2 className="text-2xl font-bold">Links cadastrados</h2>
            </div>

            <section className="p-5 flex border-1 border-neutral-600/20 rounded-lg flex-wrap gap-5">
                {/* LISTA DE LINKS */}
                {links.length > 0 ? (
                    <div className="w-full p-5 flex border-1 border-neutral-600/20 rounded-lg flex-wrap gap-5 ">
                        <div className="max-w-[300px] w-full flex flex-col flex-wrap gap-5">
                            <SkeletonLinksRealTime>
                                {links.map((link: any) => (
                                    <button
                                        key={link.id}
                                        className={`relative w-full flex items-center justify-center rounded-2xl p-1 cursor-pointer hover:bg-[#98E3E3]/60 ${
                                            selectedLink?.id === link.id
                                                ? "bg-[#98E3E3]/60"
                                                : "bg-transparent"
                                        }`}
                                        onClick={() => handleSelectLink(link)}
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
                                        <a
                                            onClick={() => setOpenModal(true)}
                                            className="flex items-center justify-center absolute right-5 top-3 cursor-pointer hover:bg-amber-50 p-2 hover:border-1 border-gray-500/40 rounded-full"
                                        >
                                            <FaTrashAlt className=" text-gray-600 text-[16px]" />
                                        </a>
                                    </button>
                                ))}
                            </SkeletonLinksRealTime>
                        </div>
                        {/* FORMULÁRIO */}
                        <div className="p-5 flex-1 flex flex-col border-1 border-neutral-600/20 rounded-lg">
                            <div className="w-full flex items-center justify-between mb-2">
                                <h2 className="text-2xl font-bold">
                                    Editar Link
                                </h2>
                                <CiEdit className=" text-black text-[25px]" />
                            </div>
                            {selectedLink ? (
                                <FormLinks
                                    onSubmit={handleSubmit}
                                    defaultValues={selectedLink}
                                    mode="edit"
                                    textButton="Salvar"
                                    onChange={handleLiveUpdate}
                                    disabledButton={!unsavedChanges}
                                />
                            ) : (
                                <div className="w-full flex-1 items-center justify-center py-2 px-1">
                                    <div className="w-full h-full flex items-center justify-center bg-neutral-600/20 rounded-lg">
                                        <h2 className="text-2xl font-bold text-gray-100 text-center m-5">
                                            Selecione ao lado o link que deseja
                                            editar
                                        </h2>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="w-full flex-1 items-center justify-center py-2 px-1">
                        <div className="w-full h-full flex-col items-center justify-center bg-neutral-600/20 rounded-lg gap-2 p-5">
                            <h2 className="text-lg font-semibold text-neutral-600 text-center ">
                                Nenhum link cadastrado
                            </h2>
                            <p className="text-sm text-black text-center ">
                                click em "{" "}
                                <span className="text-2xl font-bold text-black">
                                    +
                                </span>{" "}
                                Adicionar Link " para começar
                            </p>
                        </div>
                    </div>
                )}
            </section>
            <Modal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                saveData={() => handleDeleteLink(selectedLink.id)}
                title="Excluir Link"
                textBtnRight="Excluir"
                textBtnLeft="Cancelar"
                bgColorBtnRight="red"
                emphasis="right"
            >
                <p className="text-red-600">
                    Tem certeza que deseja excluir este link?
                </p>
            </Modal>
        </div>
    );
}
