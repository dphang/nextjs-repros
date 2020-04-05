import React from "react";
import Button from "@material-ui/core/Button";
import fetch from "isomorphic-unfetch";

function HomePage(): JSX.Element {
    const handleClickButton = async (): Promise<void> => {
        await fetch("https://api.github.com/", {
            method: "GET"
        });
    };

    return (
        <Button variant="contained" color="primary" data-cy="button" onClick={handleClickButton}>
            Test Button
        </Button>
    );
}

export default HomePage;