const RejectLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="min-h-[100vh] w-full flex items-center justify-center flex-col py-5 px-2">
            <main className=''>
                {children}
            </main>
        </div>
    );
};

export default RejectLayout;