import { CiEdit } from "react-icons/ci";
import Image from "next/image";
import TextArea from "@/components/textArea";

export default function AdminProfilePage() {
    const imageUrl = "/eu.jpg";
    return (
        <div className="w-full flex flex-col max-w-6xl mx-auto border">
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
                <div className="w-full  flex-1 flex items-center justify-center flex-col border gap-3">
                    <h2 className="text-2xl font-bold">@usuario</h2>
                    <p className="text-neutral-400">email@example.com</p>
                </div>
                <button className="group absolute top-2 right-5 hover:bg-neutral-600/20 p-2 rounded-full flex items-center justify-center cursor-pointer">
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
        </div>
    );
}
