export interface LinksProps {
    id: number;
    name: string;
    url: string;
    backgroundUrl?: string;
    icon?: string;
    colorIcon: string;
    favicon_oficial?: string;
}

export interface setLinks extends LinksProps {
    setName: (name: string) => void;
    setUrl: (url: string) => void;
    setBackgroundUrl: (backgroundUrl: string) => void;
    setIcon: (icon: string) => void;
    setColorIcon: (colorIcon: string) => void;
    setFaviconOficial: (favicon: string) => void;
}

import { RegisterOptions, UseFormRegister } from "react-hook-form";
export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    inputError?: boolean;
    error?: string;
    width?: string;
    className?: string;
    placeholder?: string;
    register: UseFormRegister<any>;
    name: string;
    rules?: RegisterOptions;
}

export interface TabNavigationProps {
    tabs: Array<{
        name: string;
        icon: React.ComponentType<{ size: number }>;
        content: React.ReactNode;
    }>;
    selectedTab: string;
    onTabSelect: (tabName: string) => void;
}

export interface ModalProps {
    children?: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    saveData?: () => void;
    title?: string;
    textBtnRight?: string;
    textBtnLeft?: string;
    emphasis?: "right" | "left";
    bgColorBtnRight?: string;
    bgColorBtnLeft?: string;
}
interface EmojiClickData {
    emoji: string;
    unified: string;
    names: string[];
}
