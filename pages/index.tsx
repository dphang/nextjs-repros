import React from "react";
import Button from "@material-ui/core/Button";
import fetch from "isomorphic-unfetch";

function HomePage(): JSX.Element {
    const handleClickButton = async (): Promise<void> => {
        await fetch("https://www.mocky.io/v2/5185415ba171ea3a00704eed?mocky-delay=5000ms", {
            method: "POST"
        });
    };

    return (
        <Button variant="contained" color="primary" data-cy="button" onClick={handleClickButton}>
            Test Button
        </Button>
    );
}

export default HomePage;