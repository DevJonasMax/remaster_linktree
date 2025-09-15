import HeaderPrivate from "@/components/Headers/headerPrivate";
import { ColorProvider } from "@/context/colorContext";
import { IconProvider } from "@/context/iconsContext";

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col">
            <IconProvider>
                <ColorProvider>
                    <HeaderPrivate />
                    <main className="container-padrao flex-1">{children}</main>
                </ColorProvider>
            </IconProvider>
        </div>
    );
}
