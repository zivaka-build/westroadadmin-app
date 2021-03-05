import React from "react";
import background from '../../assets/img/404bg.png';


function Error() {

    return (
        <>

            <div id="error-page">
                <div class="content">
                    <h2 class="header" data-text="404">
                        404</h2>
                    <h4 data-text="Opps! Page not found">
                        Opps! Page not found</h4>
                    <p style={{ color: '#000' }}>
                        <b>Sorry, the page you're looking for doesn't exist. If you think something is broken, report a problem.</b></p>
                    <div class="btns">
                        <a href="/">return home</a>
                    </div>
                </div>
            </div>
        </>);
}

export default Error;