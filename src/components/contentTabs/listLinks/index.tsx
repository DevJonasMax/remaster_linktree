import Link from "next/link";
export default function ListLinks() {
    return (
        <div className="flex flex-col align-center justify-center w-full h-full  ">
            <div className="w-full flex items-center justify-start py-5 ">
                <h2 className="text-2xl font-bold">Links cadastrados</h2>
            </div>
            <section className="p-5 flex border-1 border-neutral-600 rounded-lg flex-wrap gap-5">
                <ul className="felx-3 mx-4 my-8 flex flex-col gap-5 ">
                    <Link href="#">
                        <div className="flex items-center justify-start gap-2 bg-cyan-600 rounded-2xl px-4 py-2 ">
                            <div className="min-w-5 w-5 h-5 rounded-full bg-gray-600"></div>

                            <p>Meu canal do Youtube</p>
                        </div>
                    </Link>
                    <Link href="#">
                        <div className="flex items-center justify-start gap-2 bg-cyan-600 rounded-2xl px-4 py-2 ">
                            <div className="min-w-5 w-5 h-5 rounded-full bg-gray-600"></div>

                            <p>Meu canal do Youtube</p>
                        </div>
                    </Link>
                    <Link href="#">
                        <div className="flex items-center justify-start gap-2 bg-cyan-600 rounded-2xl px-4 py-2 ">
                            <div className="min-w-5 w-5 h-5 rounded-full bg-gray-600"></div>

                            <p>Meu canal do Youtube</p>
                        </div>
                    </Link>
                    <Link href="#">
                        <div className="flex items-center justify-start gap-2 bg-cyan-600 rounded-2xl px-4 py-2 ">
                            <div className="min-w-5 w-5 h-5 rounded-full bg-gray-600"></div>

                            <p>Meu canal do Youtube</p>
                        </div>
                    </Link>
                    <Link href="#">
                        <div className="flex items-center justify-start gap-2 bg-cyan-600 rounded-2xl px-4 py-2 ">
                            <div className="min-w-5 w-5 h-5 rounded-full bg-gray-600"></div>

                            <p>Meu canal do Youtube</p>
                        </div>
                    </Link>
                    <Link href="#">
                        <div className="flex items-center justify-start gap-2 bg-cyan-600 rounded-2xl px-4 py-2 ">
                            <div className="min-w-5 w-5 h-5 rounded-full bg-gray-600"></div>

                            <p>Meu canal do Youtube</p>
                        </div>
                    </Link>
                </ul>
                <div className="flex-1 p-5 flex flex-col border-1 border-neutral-600 rounded-lg">
                    <div className="w-full flex items-center justify-start mb-2 ">
                        <h2 className="text-2xl font-bold">Editar Link</h2>
                    </div>
                    <div className="w-full flex-1 flex items-center justify-center py-2 px-1 ">
                        <div className="w-full h-full flex items-center justify-center bg-neutral-600/20 rounded-lg">
                            <h2 className="text-2xl font-bold text-gray-100 text-shadow-gray-700 m-5 text-center">
                                Selecione ao lado o link que deseja editar
                            </h2>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
