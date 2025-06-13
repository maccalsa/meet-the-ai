export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6">
        {/* Div elow used to limit the width */}
        <div className="mx-auto w-full max-w-sm md:max-w-3xl">
            {children}
        </div>

    </div>;
}