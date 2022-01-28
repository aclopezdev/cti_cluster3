import Rapp from '../../../../vendor/relast.js';

import Header from '../../header/';
import Body from '../../body/';
import Main_menu from '../../main_menu/';

import './main.css';

export default class Default extends Rapp
{
	constructor(args)
	{
		super(args);


		this.add_comp("Header", Header);
		this.add_comp("Body", Body);
		this.add_comp("Main-menu", Main_menu);
	};
	run = function(props) {
		// THIS METHOD RUN WHEN THE RENDER FINISH
		// this.call_action("nav", "/sales");
	};
	states = function(props) {};
	actions = function(props) {
		this.action('load_default', ()=>
		{
			this.get_comp('BODY').call_action('set_title', 'Products Management');
			this.nav('/products');
		})
	};
	draw = function(props) {
		this.dom("main", () => {
			return `<section>
                        <div id='Header' classComp='header'></div>
                        <section class='body-panel'>
                            <div id='Main-menu' classComp='${Rapp.isMobile() ? 'main-menu-mobile' : 'main-menu'}' class='${Rapp.isMobile() && 'Template-main-menu-mobile-hidden'}'></div>
                            <div id='Body' classComp='body'></div>
                        <section>
                    </section>`;
		});
	};
}