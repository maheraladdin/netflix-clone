import {useEffect, useState} from "react";

export default function useNavbarBackgroundOpacity() {
    const [pageYOffset, setPageYOffset] = useState(0);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            setPageYOffset(window.scrollY);
        })
        return () => {
            window.removeEventListener("scroll", () => {
                setPageYOffset(window.scrollY);
            })
        }
    }, []);

    return {pageYOffset};
}