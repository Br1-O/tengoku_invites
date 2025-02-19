const RegisterLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="h-full w-full flex items-center justify-center flex-col py-5 px-2">
            <main className=''>
                {children}
            </main>
        </div>
    );
};

export default RegisterLayout;