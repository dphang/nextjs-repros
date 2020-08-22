import React, {useState} from "react";
import {Typography} from "@material-ui/core";
import {NextPageContext} from "next";

function Another2Page(props: any): JSX.Element {
    return (
        <React.Fragment>

            <Typography>
                {"This is an SSG Page using props: " + props.test}
            </Typography>
        </React.Fragment>
    );
}

export async function getStaticProps(ctx: NextPageContext) {
    return {
        props: {"test": "blah"}, // will be passed to the page component as props
    }
}
export default Another2Page;