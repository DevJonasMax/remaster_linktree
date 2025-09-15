import { useIconContext } from "@/context/iconsContext";
import { useState } from "react";
import { IconType } from "react-icons";
import {
    FaWhatsapp,
    FaFacebook,
    FaInstagram,
    FaTelegram,
    FaYoutube,
    FaGithub,
    FaLinkedin,
    FaPinterest,
    FaTiktok,
    FaTwitch,
    FaTwitter,
} from "react-icons/fa";
import * as FaIcons from "react-icons/fa";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationIconsProps {
    onIconClick?: (iconName: string) => void;
    itemsPerPage?: number;
    size?: number | 35;
}
interface IconListItem {
    name: string;
    component: IconType;
}

export default function PaginationIcons({
    onIconClick,
    size = 35,
}: PaginationIconsProps) {
    const { setIconSelected, iconSelected } = useIconContext();

    const prioritizedIconComponents = [
        { name: "FaWhatsapp", component: FaWhatsapp },
        { name: "FaFacebook", component: FaFacebook },
        { name: "FaInstagram", component: FaInstagram },
        { name: "FaTelegram", component: FaTelegram },
        { name: "FaYoutube", component: FaYoutube },
        { name: "FaGithub", component: FaGithub },
        { name: "FaLinkedin", component: FaLinkedin },
        { name: "FaPinterest", component: FaPinterest },
        { name: "FaTiktok", component: FaTiktok },
        { name: "FaTwitch", component: FaTwitch },
        { name: "FaTwitter", component: FaTwitter },
    ];
    const prioritizedIconNames = new Set(
        prioritizedIconComponents.map((icon) => icon.name)
    );
    const remainingFaIconsList: IconListItem[] = Object.keys(FaIcons)
        .filter((iconName) => !prioritizedIconNames.has(iconName))
        .map((iconName) => {
            const IconComponent = FaIcons[iconName as keyof typeof FaIcons];
            return {
                name: iconName,
                component: IconComponent,
            };
        });
    const listIcons: IconListItem[] = [
        ...prioritizedIconComponents,
        ...remainingFaIconsList.slice(0, 80),
    ];

    // 📌 Paginação
    const itemsPerPage = 20;
    const totalPages = Math.ceil(listIcons.length / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(1);

    const paginatedIcons = listIcons.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
    const handleIconClick = (iconName: string) => {
        if (onIconClick) {
            onIconClick(iconName);
        }
        setIconSelected(iconName);
    };
    const getPageRange = () => {
        const maxVisiblePages = 5;
        let startPage = Math.max(currentPage - maxVisiblePages + 1, 1);
        let endPage = startPage + maxVisiblePages - 1;

        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(endPage - maxVisiblePages + 1, 1);
        }

        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className="w-full">
            <div className="grid grid-cols-5 gap-4 w-full mb-4 p-4">
                {paginatedIcons.map((Icon, idx) => {
                    const IconComponet = Icon.component;
                    return (
                        <span
                            key={idx}
                            onClick={() => handleIconClick(IconComponet.name)}
                            style={{ cursor: "pointer" }}
                            className={`flex w-full justify-center items-center hover:bg-cyan-300/20 p-2 rounded-sm ${
                                iconSelected === Icon.name
                                    ? "bg-cyan-300/20"
                                    : ""
                            }`}
                        >
                            <IconComponet size={size} />
                        </span>
                    );
                })}
            </div>

            {/* Paginação */}
            <Pagination className="w-full">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(currentPage - 1);
                            }}
                        />
                    </PaginationItem>

                    {/* Links numerados */}
                    {getPageRange().map((page) => (
                        <PaginationItem key={page}>
                            <PaginationLink
                                href="#"
                                isActive={currentPage === page}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlePageChange(page);
                                }}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    {/* Ellipsis (somente se tiver mais páginas após o range visível) */}
                    {getPageRange().at(-1)! < totalPages && (
                        <>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink
                                    href="#"
                                    isActive={currentPage === totalPages}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handlePageChange(totalPages);
                                    }}
                                >
                                    {totalPages}
                                </PaginationLink>
                            </PaginationItem>
                        </>
                    )}
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(currentPage + 1);
                            }}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
