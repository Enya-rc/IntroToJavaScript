/**
 * @copyright: (C) 2020 Vancouver Film School.  All Rights Reserved.
 * @author:    EnyaRodriguez{@link mailto:dd46enya@vfs.com}
 * @version:   1.0
 */
'use strict';

import App from './modules/App.js';
// import {App} from './modules/App.js';


(function Main() {
    console.log("Hello world!");


    // Wait for the DOM to finish loading (we don't want to reference things that don't exist)
    $(document).ready (event => {

        // Find out what we are running on
        const MOBILE = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test( navigator.userAgent );

        // Init the app and run it
        let appli = new App( MOBILE );
        appli.run();

       
    })
})()

