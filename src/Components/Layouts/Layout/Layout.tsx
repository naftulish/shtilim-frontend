import react from "react";
import "./Layout.css"
import Main from "../Main/Main";
import Aside from "../Aside/Aside";
import { Button } from "@mui/material";

function Layout():JSX.Element {

    return (
        <div className="Layout">
            <header>
                header
                <Button variant="outlined">
                    Add to Cart
                </Button>
            </header>
            <Aside />
            <Main />
        </div>
    )

}

export default Layout;