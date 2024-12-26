import { Outlet } from "react-router-dom";

const LayoutWeb = () => {
    return (
        <>
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default LayoutWeb;
