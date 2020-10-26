import React, { useEffect } from "react";

// fake key
// const apiKey = process.env.REACT_APP_GOOGLE_KEY
const apiKey = '32tq340t9j340t34958240942'

function MainMap({ id, options, onMapLoad, results }) {
    const { google } = window;

    const onScriptLoad = () => {
        const map = new window.google.maps.Map(
            document.getElementById(id),
            options
        );

        onMapLoad(map);
    };

    useEffect(() => {
        if (results && Array.isArray(results)) {
            console.log('results are here>>>>>>>>>>>>>>>>')
            if (!google) {
                const script = document.createElement("script");
                script.type = "text/javascript";
                script.src = `https://maps.google.com/maps/api/js`;

                const x = document.getElementsByTagName("script")[0];
                x.parentNode.insertBefore(script, x);

                script.addEventListener("load", () => onScriptLoad());
            } else {
                onScriptLoad();
            }
        }
    }, [results]);

    return <div style={{ width: '100%', height: '100%' }} id={id} />;
}

export default MainMap;
