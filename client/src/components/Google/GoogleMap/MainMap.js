import React, { useEffect } from "react";

function MainMap({ id, options, setMap }) {
    const onScriptLoad = () => {
        const map = new window.google.maps.Map(
            document.getElementById(id),
            options
        );

        setMap(map);
    };

    useEffect(() => {
        onScriptLoad();
    }, []);

    return <div style={{ width: '100%', height: '100%' }} id={id} />;
}

export default MainMap;
