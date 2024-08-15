import { React } from "react";
import "../styles/Footer.css"

function Footer() {

    return (
        <>
            <footer>
                <div className="py-1">
                    <a href="https://www.chatzakisdev.gr/" target="_blank">
                        <p className="m-0">© Chatzakis Michail {new Date().getFullYear()}</p>
                    </a>
                </div>
            </footer>

        </>
    );
}

export default Footer;