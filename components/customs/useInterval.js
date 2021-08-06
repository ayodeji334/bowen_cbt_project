import React from "react";

export default function useInterval(callback, delay){
    const saveCallback = React.useRef();

    React.useEffect(() => {
        saveCallback.current = callback;
    });

    React.useEffect(() => {

        function decreaseTimer() {
            saveCallback.current();
        }

        let setTimeInterval = setInterval(decreaseTimer, 1000);

        return () => clearInterval(setTimeInterval);
    }, [delay]);
}