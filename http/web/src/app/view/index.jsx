import React, {Fragment, useState, useEffect} from 'react';
import Footer from './gui/footer.jsx';
import Header from './gui/header.jsx';
import Main_menu from './gui/main_menu';



export default function Main_view(props)
{
        const {} = props;
    // STATES:
    // -----------------------------------------------------------------
    // INTERNAL VARs / CONSTs:
    // -----------------------------------------------------------------
    // FUNCTIONS:
    // -----------------------------------------------------------------
        useEffect(()=>{}, []);
    // -----------------------------------------------------------------
        return (
            <>
                <Header />
                <Main_menu />
                <section>
                    Main
                </section>
                <Footer />
            </>
        );
};