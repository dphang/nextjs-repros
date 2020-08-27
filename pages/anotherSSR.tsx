import React from "react";
import {Typography} from "@material-ui/core";
import {NextPageContext} from "next";

type AnotherPageProps = {
    test: string;
}

function AnotherPage(): JSX.Element {
    return (
        <React.Fragment>
            <Typography>
                {"This is an SSR Page"}
            </Typography>
        </React.Fragment>
    );
}

AnotherPage.getInitialProps = async (
    ctx: NextPageContext
): Promise<AnotherPageProps> => {
    throw Error("error");
}

export default AnotherPage;