import React from "react"
import ReactDom from "react-dom"
import { BrowserRouter } from "react-router-dom"

import Provider from "./Provider"

ReactDom.render(
    <BrowserRouter>
        <Provider/>
    </BrowserRouter>,
    document.getElementById("__root")
)