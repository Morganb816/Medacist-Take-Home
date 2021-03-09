import { useEffect, useState } from "react";

/**
 * @name useDimensions
 * @description returns the current dimensions of the window. will handle resize
 * @returns {object} Dimensions of the window.
 */
const useDimensions = () => {
    const [dimensions, setDimensions] = useState({
        width: null,
        height: null,
    });

    const handleResize = () => {
        setDimensions({
            width: window.innerWidth,
            height: window.innerHeight
        });
    }

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, []);

    return dimensions
};

export default useDimensions;