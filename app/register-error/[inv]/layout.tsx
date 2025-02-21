const RegisterErrorLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <main className="h-full min-h-[100vh] w-full flex items-center justify-center flex-col py-5 px-2">
            {children}
        </main>
    );
};

export default RegisterErrorLayout;