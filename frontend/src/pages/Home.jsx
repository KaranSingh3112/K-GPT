import SideBar from "../components/SideBar";
import ChatWindow from "../components/ChatWindow";
import { useState } from "react";

export default function Home() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="app">
            <SideBar
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />
            <ChatWindow
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />
        </div>
    );

}