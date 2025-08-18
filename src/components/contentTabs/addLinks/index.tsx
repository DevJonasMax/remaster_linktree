import Inputs from "@/components/inputs";
import SimplePalette from "@/components/colorPalette/simplePalette";
import SkeletonPreviewLinks from "@/components/skeleton/skeletonPreviewLinks";

export default function AddLinks() {
    return (
        <div className="w-full flex gap-5 flex-wrap">
            {/* adicionar links  --- */}
            <div className="flex-2 flex-col ">
                <div className="flex my-5 items-center justify-start">
                    <h1 className="text-2xl font-bold">Adicione seus links</h1>
                </div>
                <section className="flex flex-col border-1 pt-10 pb-5 px-5 gap-5 rounded-lg ">
                    <div>
                        <label htmlFor="url">URL do link</label>

                        <Inputs
                            type="url"
                            className="w-full"
                            placeholder="https://www.exemplo.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="name">Nome do link</label>

                        <Inputs
                            placeholder="exemplo: Meu canal do Youtube"
                            type="text"
                            className="w-full"
                        />
                    </div>
                    <div className="flex items-center justify-between pr-5">
                        <SimplePalette />

                        <div>
                            <button className="bg-cyan-600 p-2 rounded-lg font-medium text-amber-50 cursor-pointer hover:bg-cyan-500">
                                Personalizar
                            </button>
                        </div>
                    </div>
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
                    <SkeletonPreviewLinks />
                </section>
            </div>
        </div>
    );
}
