"use client";

import ContentPage from "@/components/contentTabs/contentPages";

import TabNavigation from "@/components/tabs/tabNavigation";
import { useState } from "react";
import { FaPlus, FaList, FaPager } from "react-icons/fa";
import AddLinks from "@/components/contentTabs/addLinks";
import ListLinks from "@/components/contentTabs/listLinks";

const tabs = [
    {
        name: "Adicionar Links",
        icon: FaPlus,
        content: <AddLinks />,
    },
    {
        name: "Lista de Links",
        icon: FaList,
        content: <ListLinks />,
    },
    {
        name: "Preview Page",
        icon: FaPager,
        content: <div>Conteúdo da Preview Page</div>,
    },
];

export default function AdminPage() {
    // const [selectedColor, setSelectedColor] = useState("");
    const [selectedTab, setSelectedTab] = useState("");

    return (
        <div className="flex w-full h-full mt-10 gap-5">
            <div className="w-15 h-full flex flex-col items-center gap-3 mt-18 rounded-lg">
                <TabNavigation
                    tabs={tabs}
                    selectedTab={selectedTab}
                    onTabSelect={setSelectedTab}
                />
            </div>
            <div className="w-full h-full">
                <ContentPage>
                    {selectedTab ? (
                        <div>
                            {
                                tabs.find((tab) => tab.name === selectedTab)
                                    ?.content
                            }
                        </div>
                    ) : (
                        <div>
                            <h1>conteudo principal</h1>
                        </div>
                    )}
                </ContentPage>
            </div>
        </div>
    );
}
