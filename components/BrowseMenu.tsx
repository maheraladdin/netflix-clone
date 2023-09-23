import {navItems} from "@/lib/data";
import {ReactElement} from "react";
import {RxCross2} from "react-icons/rx";


type BrowseMenuProps = {
    visible: boolean,
    toggleMenu: () => void
}

export default function BrowseMenu({visible, toggleMenu}: BrowseMenuProps): ReactElement {
    return (
        <div className={`fixed top-0 text-xl w-screen h-screen bg-black bg-opacity-80 flex justify-center items-center z-20 lg:hidden ${!visible && "hidden"}`}>
            <RxCross2 onClick={toggleMenu} className={"absolute top-6 right-4 text-2xl text-white cursor-pointer"}/>
            <div className={"flex flex-col gap-8"}>
                {
                    navItems.map(item => {
                        return (
                            <div role={"button"} key={item.path + "-Browse-menu"} className={"nav-item w-full z-50"}>{item.name}</div>
                        )
                    })
                }
            </div>
        </div>
    )
}