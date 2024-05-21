import Image from "next/image";
import Card from "../atoms/card";
import { useState } from 'react';
import SSHPanel from "../molecules/ssh-panel";

const tabNames = ['SSH', 'MANAGE_HOSTS', 'AI'];

const App = () => {
    const [activeTab, setActiveTab] = useState(0);

    const changeTab = (index: number) => {
        setActiveTab(index);
    };

    return (
        <div className="max-w-5xl mx-auto">
            <Card className="bg-[#212a38] p-6">
                <div className="flex justify-center">
                    {tabNames.map((tab, index) => (
                        <button
                            key={index}
                            onClick={() => changeTab(index)}
                            className={`${
                            index === activeTab
                                ? 'border-b-2 border-blue-500 text-blue-500'
                                : 'text-white border-b-2'
                            } py-2 px-4 focus:outline-none transition duration-300 ease-in-out`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="p-4 mt-2">
                    {
                        activeTab === 0 &&
                        <SSHPanel className=""/>
                    }
                </div>

            </Card>
        </div>
    )
}


export default App;