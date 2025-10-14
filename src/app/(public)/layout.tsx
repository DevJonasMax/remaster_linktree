import HeaderPublic from "@/components/Headers/headerPublic";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col ">
            <HeaderPublic />
            <main className="container-padrao">{children}</main>
        </div>
    );
}
