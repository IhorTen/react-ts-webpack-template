import React from 'react'
import { RouteComponentProps } from "react-router"

import "styles/views/homepage"

export interface HomepageProps extends RouteComponentProps<any> {}

export interface HomepageState {}

export default
class Homepage
extends React.Component<HomepageProps, HomepageState> {
    state = {
        isRotate: false
    }

    handleRotate = () => {
        this.setState({isRotate: !this.state.isRotate})
    }

    render() {
        let { isRotate } = this.state
        return <>
            <main className="v-homepage">
                <p className="homepage-title">
                    Hi User!
                </p>
                <div className="container">
                    <button 
                        className="u-button"
                        onClick={this.handleRotate}
                    >
                        Click Me to {isRotate ? "stop" : "start"} logo anomation!
                    </button>
                    <div className="homepage-content">
                        This is Template for React + Typescript + SASS + Webpack projects
                        <br/>
                        <span>
                            To add routes go to: <code>src/App.tsx</code>
                        </span>
                        <br/>
                        <span>
                            To create new component go to: <code>src/views/</code>
                        </span>
                        <br/>
                    </div>
                    <div className="img-container">
                        <img
                            className={`${isRotate ? "rotate" : ""}`} 
                            src="/static/images/logo.png"
                        />
                    </div>
                    <div className="wish">
                        Happy coding!!
                    </div>
                </div>
            </main>
        </>
    }
}