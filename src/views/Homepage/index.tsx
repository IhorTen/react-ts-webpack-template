import React from 'react'
import { RouteComponentProps } from "react-router"

import "styles/views/homepage"

export interface HomepageProps extends RouteComponentProps<any> {}

export interface HomepageState {}

export default
class Homepage
extends React.Component<HomepageProps, HomepageState> {
    render() {
        return <>
            <main className="v-homepage">
                <p className="homepage-title">
                    Hi User!
                </p>
                <div className="container">
                    <button className="u-button">
                        Click Me to start logo anomation!
                    </button>
                    <div className="homepage-content">
                        This is Template for React+Typescript projects
                    </div>
                    <div className="img-container">
                        <img src="/static/images/logo.png"/>
                    </div>
                </div>
            </main>
        </>
    }
}