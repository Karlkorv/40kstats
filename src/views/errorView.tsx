import React from "react";

export default function ErrorView() {
    return (
        <div>
            <h1>Oops! Something went wrong.</h1>
            <button onClick={() => { window.location.replace("/") }}>Return to home</button>
        </div >
    )
}