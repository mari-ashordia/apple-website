import { useEffect, useState } from "react"

export const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

    useEffect(() => {
        const mediaQueryList = window.matchMedia(query);
        const listener = (event) => setMatches(event.matches);
        mediaQueryList.addEventListener('change', listener);
        return () => mediaQueryList.removeEventListener('change', listener);
    },[]);

    return matches;
}