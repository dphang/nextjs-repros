import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import fetch from "isomorphic-unfetch";
import {Typography} from "@material-ui/core";
import {NextPageContext} from "next";

type Another2PageProps = {
    test: string;
}

function Another2Page(): JSX.Element {
    const [response, setResponse] = useState("");

    const handleClickButton = async (): Promise<void> => {
        // Delay of 2 seconds
        const response = await fetch("https://www.mocky.io/v2/5185415ba171ea3a00704eed?mocky-delay=2000ms", {
            method: "POST"
        });

        setResponse(`Status: ${response.status} Body: ${JSON.stringify(await response.json())}`);
    };

    return (
        <React.Fragment>
            <Button variant="contained" color="primary" data-cy="button" onClick={handleClickButton}>
                Test Button
            </Button>

            <Typography>
                {response}
            </Typography>
        </React.Fragment>
    );
}

Another2Page.getInitialProps = async (
    ctx: NextPageContext
): Promise<Another2PageProps> => {
    return {"test": "test"};
}

export default Another2Page;