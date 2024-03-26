import { useEffect, useState } from 'react';

const UseAltWheelScroll = () => {
    const [altPressed, setAltPressed] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.altKey) {
                setAltPressed(true);
            }
        };

        const handleKeyUp = (event) => {
            if (!event.altKey) {
                setAltPressed(false);
            }
        };

        const handleWheel = (event) => {
            if (altPressed) {
                if (event.deltaY < 0) {
                    console.log('вверх');
                } else if (event.deltaY > 0) {
                    console.log('вниз');
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener('wheel', handleWheel);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('wheel', handleWheel);
        };
    }, [altPressed]);

    return altPressed;
};

export default UseAltWheelScroll;