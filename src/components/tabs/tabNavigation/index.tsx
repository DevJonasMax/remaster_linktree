import { TabNavigationProps } from "@/types";

export default function TabNavigation({
    tabs,
    selectedTab,
    onTabSelect,
}: TabNavigationProps) {
    return (
        <div className="w-15 h-full flex flex-col items-center gap-3 px-5 py-2 border-1 border-neutral-700/20 rounded-lg">
            {/* 标签导航 */}
            {tabs.map((tab) => (
                <div
                    key={tab.name}
                    className={`relative w-10 h-10 flex items-center justify-center cursor-pointer
            hover:border border-neutral-700/20 rounded-lg
            group transition-colors duration-300`}
                    style={{
                        backgroundColor:
                            tab.name === selectedTab
                                ? "#98E3E3"
                                : "transparent",
                    }}
                    onClick={() => onTabSelect(tab.name)}
                >
                    <div className="w-full flex items-center justify-center">
                        <tab.icon size={20} />
                    </div>
                    <span className="absolute left-full ml-3 hidden group-hover:inline-block text-sm font-semibold text-neutral-600 whitespace-nowrap bg-[#98E3E3]/60 p-2 rounded-lg">
                        {tab.name}
                    </span>
                </div>
            ))}
        </div>
    );
}
