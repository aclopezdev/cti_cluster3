const Header = require('../../header/index').Header;
const Body = require('../../body/index').Body;
const Main_menu = require('../../main_menu/index').Main_menu;


exports.Default = new Class(
    {
        Extends: Rapp,
        initialize: function(args)
        {
            this.parent(args, this);

            this.add_comp('Header', Header);
            this.add_comp('Body', Body);
            this.add_comp('Main-menu', Main_menu);
        },
        run: function(props)
        {
            // THIS METHOD RUN WHEN THE RENDER FINISH
        },
        states: function(props)
        {
        },
        actions: function(props)
        {
        },
        draw: function(props)
        {
            //this._dom.iterator.test = `<a href='javascript:;'>item [k]</a>`;

            this._dom.main = (
                `<section>
                    <div id='Header' classComp='header'></div>
                    <section class='body-panel'>
                        <div id='Main-menu' classComp='main-menu'></div>
                        <div id='Body' classComp='body'></div>
                    <section>
                </section>`
            );
        }
    }
);