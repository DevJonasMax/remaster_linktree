import HeaderPrivate from "@/components/Headers/headerPrivate";

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col">
            <HeaderPrivate />
            <main className="container-padrao flex-1">{children}</main>
        </div>
    );
}
