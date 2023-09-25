import Image from "next/image";
import {navItems} from "@/lib/data";
import {AiOutlineBell, AiOutlineSearch} from "react-icons/ai";
import useNavbarBackgroundOpacity from "@/hooks/navbar-background-opacity-hook";

type NavbarProps = {
    toggleBrowseMenu: () => void;
    toggleAccountMenu: () => void;
}

export default function Navbar({toggleBrowseMenu, toggleAccountMenu}: NavbarProps) {
    const {pageYOffset} = useNavbarBackgroundOpacity();
    return (
        <nav className={`fixed top-0 w-screen py-6 bg-zinc-900 z-10 transition-all duration-300 ${pageYOffset >= 66 ? "bg-opacity-80" : "bg-opacity-0"}`}>
            <div className={"container mx-auto px-5 flex justify-between"}>
                <div className={"flex gap-x-3 sm:gap-x-6 items-center"}>
                    <Image src={"/images/logo.png"} alt={"netflix logo"} width={192 / 2} height={51.9 / 2}/>
                    <div className={"hidden lg:flex gap-x-4"}>
                        {
                            navItems.map(item => (
                                <div key={item.path} role={"button"} className={"nav-item"}>{item.name}</div>
                            ))
                        }
                    </div>
                    <div className={"lg:hidden flex gap-x-2"}>
                        <div onClick={toggleBrowseMenu} role={"button"} className={"nav-item text-sm"}>
                            Browse
                        </div>
                    </div>
                </div>
                <div className={`flex items-center gap-x-3 sm:gap-x-6`}>
                    <AiOutlineSearch role={"button"} className={`nav-item text-2xl`}/>
                    <AiOutlineBell role={"button"} className={`nav-item text-2xl`}/>
                    <Image onClick={toggleAccountMenu} role={"button"} src={'/images/default-blue.png'} alt={"profile-photo"} width={25} height={25}/>
                </div>
            </div>
        </nav>
    )
}