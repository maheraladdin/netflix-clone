import {ReactElement} from "react";
import {RxCross2} from "react-icons/rx";
import Image from "next/image";


type BrowseMenuProps = {
    visible: boolean;
    toggleMenu: () => void;
    navItems: {
        name: string;
        path: string;
        func: () => void;
    }[];
    account?: string;
}

export default function OverlayMenu({visible, toggleMenu, navItems,account}: BrowseMenuProps): ReactElement {
    return (
        <div className={`fixed top-0 text-xl w-screen lg:max-w-xs h-screen bg-black bg-opacity-80 flex justify-center items-center lg:justify-start lg:items-start lg:p-6 z-50 transition ${!visible && "hidden"}`}>
            <RxCross2 onClick={toggleMenu} className={"absolute top-6 right-4 text-2xl text-white cursor-pointer"}/>
            <div className={"flex flex-col gap-8"}>
                {account &&
                    <div className={'hidden lg:flex items-center gap-4 text-white text-xl w-full'}>
                        <Image src={'/images/default-blue.png'} alt={"profile-photo"} width={40} height={40}/> {account}
                    </div>
                }
                {
                    navItems.map(item => {
                        return (
                            <div onClick={item.func} role={"button"} key={item.path + "-Browse-menu"} className={"nav-item w-full"}>{item.name}</div>
                        )
                    })
                }
            </div>
        </div>
    )
}