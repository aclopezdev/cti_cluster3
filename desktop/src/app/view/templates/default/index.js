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
            this.call_action('nav', '/users');
        },
        states: function(props)
        {
        },
        actions: function(props)
        {
            this.action('nav', (args)=>
            {
                const body_comp = this.get_comp('Body');
                const mod = this.navigate(args, body_comp.get_DOM_id('Body-content'));
                if(mod)
                    if(mod.title)
                        body_comp.state('title', mod.title);
            });
        },
        draw: function(props)
        {
            this.dom('main', ()=>
            {
                return (
                    `<section>
                        <div id='Header' classComp='header'></div>
                        <section class='body-panel'>
                            <div id='Main-menu' classComp='main-menu'></div>
                            <div id='Body' classComp='body'></div>
                        <section>
                    </section>`
                );
            });
        }
    }
);