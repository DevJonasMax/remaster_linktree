"use client";
import { CiEdit } from "react-icons/ci";
import Image from "next/image";
import TextArea from "@/components/textArea";
import { useState } from "react";
import DisplayIcon from "@/context/iconsContext";
import Modal from "@/components/modal";
import FormUpdateProfile from "@/components/forms/formUpdateProfile";
import { IoMdAddCircleOutline } from "react-icons/io";
import {
    FaFacebook,
    FaInstagram,
    FaPen,
    FaTelegram,
    FaTwitter,
} from "react-icons/fa";
import { socialFormSchema } from "@/schema/socialForm.schema";
import FormSocial from "@/components/forms/FormSocial";
import { link } from "fs";
const defaultValues = {
    username: "@usuario",
    name: "Nome Completo",
    password: "",
    confirmPassword: "",
};

export default function AdminProfilePage() {
    const imageUrl = "/eu.jpg";
    const [modalProfile, setModalProfile] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [sociaisSelected, setSociaisSelected] = useState<socialFormSchema[]>([
        {
            url: "https://twitter.com",
            icon: {
                type: "icon",
                icon: "FaTwitter",
                size: 24,
                color: "black",
            },
        },
        {
            url: "https://instagram.com",
            icon: {
                type: "icon",
                icon: "FaInstagram",
                size: 24,
                color: "blue",
            },
        },
    ]);

    return (
        <div className="w-full flex flex-col max-w-6xl mx-auto  p-5">
            <section
                id="profile"
                className="relative w-full flex p-5 md:flex-row flex-col gap-5  items-center justify-center"
            >
                <div className="relative lg:w-48 lg:h-48 md:w-32 md:h-32 w-24 h-24 rounded-full overflow-hidden bg-neutral-600 border-2 border-gray-500">
                    <div className=" flex-1 max-w-64 border flex items-center justify-center">
                        {imageUrl ? (
                            <Image
                                src={imageUrl}
                                alt="Foto de perfil"
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-neutral-500 text-white text-xl font-bold">
                                ?
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-full  flex-1 flex items-center justify-center flex-col  gap-3">
                    <h2 className="text-2xl font-bold">@usuario</h2>
                </div>
                <button
                    onClick={() => setModalProfile(true)}
                    className="group absolute top-2 right-5 hover:bg-neutral-600/20 p-2 rounded-full flex items-center justify-center cursor-pointer"
                >
                    <CiEdit className="w-6 h-6 text-neutral-400 group-hover:text-neutral-700" />
                </button>
            </section>
            <section id="container-bio" className="w-full flex flex-col py-5">
                <div className=" w-full text-left px-5 my-2">
                    <p className="text-xl">Fale um pouco sobre você!</p>
                    <p className="text-[2ren]  ">
                        isso vai aparecer na pagina principal dos seus links.
                    </p>
                </div>
                <div className="py-2 px-5 w-full flex flex-col gap-5">
                    <TextArea />
                </div>
            </section>
            <section className="w-full flex flex-col p-5">
                <div className="relative border border-neutral-600/20 w-full p-5 rounded-sm">
                    {sociaisSelected.length > 0 ? (
                        <div className="w-full flex flex-wrap gap-3 items-center justify-center">
                            {sociaisSelected.map((i, idx) => {
                                return (
                                    <div key={idx} className="relative ">
                                        <div className=" p-2 bg-neutral-600/20 rounded-full flex items-center justify-center">
                                            {i.icon?.type === "icon" ? (
                                                <DisplayIcon
                                                    size={24}
                                                    icon={i.icon.icon}
                                                    color={
                                                        i.icon?.color || "white"
                                                    }
                                                />
                                            ) : i.icon?.type === "emoji" ? (
                                                <DisplayIcon
                                                    size={24}
                                                    icon={i.icon.emoji}
                                                />
                                            ) : i.url ? (
                                                <img
                                                    src={`https://www.google.com/s2/favicons?domain=${
                                                        i.url?.split("://")[1]
                                                    }&sz=64`}
                                                    alt={i.url?.split("://")[1]}
                                                    width={24}
                                                    height={24}
                                                />
                                            ) : null}
                                        </div>
                                    </div>
                                );
                            })}
                            {sociaisSelected.length < 5 && (
                                <button
                                    onClick={() => setOpenModal(true)}
                                    className="group bg-neutral-500/20 p-2 rounded-full cursor-pointer "
                                >
                                    <IoMdAddCircleOutline
                                        size={25}
                                        className="group-hover:text-blue-500 transition-colors duration-200"
                                    />
                                </button>
                            )}
                            <span className="absolute -top-3.5 left-4  bg-white font-semibold">
                                principais redes
                            </span>
                            <button className="group absolute top-1 right-1.5  hover:bg-neutral-500/20 font-semibold p-2 rounded-full cursor-pointer">
                                <CiEdit className="w-6 h-6 text-neutral-400 group-hover:text-neutral-700" />
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="flex gap-2 w-full h-full items-center justify-center opacity-60 mt-7 mb-5">
                                <FaFacebook
                                    size={35}
                                    className=" rounded-sm p-2"
                                />
                                <FaInstagram
                                    size={35}
                                    className="  rounded-sm p-2"
                                />
                                <FaTwitter
                                    size={35}
                                    className=" rounded-sm p-2"
                                />
                                <FaTelegram
                                    size={35}
                                    className="  rounded-sm p-2"
                                />
                            </div>
                            <button
                                className="absolute flex flex-col items-center justify-center left-0 top-0 w-full h-full bg-neutral-200/50  cursor-pointer hover:bg-gray-400/40 text-xl
                            font-semibold text-neutral-600 hover:text-blue-700/80"
                                aria-label="Adicionar redes"
                                onClick={() => setOpenModal(true)}
                            >
                                <IoMdAddCircleOutline size={35} />
                                <span>adicionar redes</span>
                            </button>
                        </>
                    )}
                </div>
            </section>

            <Modal
                isOpen={modalProfile}
                onClose={() => setModalProfile(false)}
                title="Editar Perfil"
                textBtnRight="Salvar"
                textBtnLeft="Cancelar"
                bgColorBtnRight="blue"
                emphasis="right"
                typeButton="submit"
                idForm="formUpdateProfile"
            >
                <FormUpdateProfile
                    defaultValues={defaultValues}
                    closeModal={setModalProfile}
                />
            </Modal>
            <Modal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                title="Adicionar Redes Sociais"
                textBtnRight="Adicionar"
                textBtnLeft="Cancelar"
                bgColorBtnRight="blue"
                emphasis="right"
                typeButton="submit"
                idForm="formAddSociais"
            >
                <FormSocial
                    defaultValues={sociaisSelected}
                    closeModal={() => setOpenModal(false)}
                />
            </Modal>
        </div>
    );
}
