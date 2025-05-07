import { Outlet } from 'react-router-dom';

const RootLayout = () => {
    return (
        <div className="App">
            <header className="p-4">
                <h1 className="text-3xl font-semibold">Personal Finance Tracker</h1>
            </header>
            <main>
                {/* This is where the nested routes will be rendered */}
                <Outlet />
            </main>
        </div>
    );
};

export default RootLayout;
