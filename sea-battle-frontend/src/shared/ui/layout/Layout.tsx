import CountDownTimer from "src/features/timer/CountDownTimer";
import "./Layout.css";

import React, { ReactNode } from "react";
import Button from "../button/Button";

type LayoutProps = {
    children?: ReactNode; 
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="layout">
            <header className="layout__header">
            <React.StrictMode>
                <Button
                className={"button"}
                onClick={() => {
                    alert("You've returned to some page");
                }}
                disabled={false}
                >
                {"Back"}
                </Button>
            </React.StrictMode>

            <a href="battleground">battleground</a>
                
            <div className="timer-turn">
                <CountDownTimer minutes={1} seconds={0}/>
                <p className="player-turn">You turn</p>
            </div>

            <a href="testpage">testpage</a>

            <React.StrictMode>
                <Button
                className={"button"}
                onClick={() => {
                    alert("I need help you");
                }}
                disabled={false}
                >
                {"Help"}
                </Button>
            </React.StrictMode>

            </header>
            <main className="layout__main">
                {children}
            </main>
        </div>
    )
}

export default Layout;