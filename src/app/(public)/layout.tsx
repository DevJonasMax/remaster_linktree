import HeaderPublic from "@/components/Headers/headerPublic";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col border-1">
            <HeaderPublic />
            <main className="container-padrao flex-1">{children}</main>
        </div>
    );
}
