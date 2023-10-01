import {useState} from "react";

export default function useOverlayMenu() {
    const [visibleBrowse, setVisibleBrowse] = useState(false);
    const [visibleAccount, setVisibleAccount] = useState(false);

    const toggleBrowseMenu = () => {
        setVisibleBrowse(prevState => !prevState);
    }

    const toggleAccountMenu = () => {
        setVisibleAccount(prevState => !prevState);
    }

    return {
        visibleBrowse,
        visibleAccount,
        toggleBrowseMenu,
        toggleAccountMenu
    }
}