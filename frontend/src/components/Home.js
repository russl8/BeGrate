import React, { useState, useEffect } from "react";

export default function Home() {
    const [currentText, setCurrentText] = useState("");
    useEffect(() => {
        fetch("http://localhost:3001/")
            .then((res) => {
                if (res.ok) {
                    return res.json(); // Parse the response body as JSON
                } else {
                    throw new Error("Error fetching data.");
                }
            })
            .then((jsonResponse) => {
                setCurrentText(jsonResponse.message);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);


    return (
        <div>
            <h1>{currentText}</h1>
        </div>
    );
}
