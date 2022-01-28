import Rapp from '../vendor/relast';
import Router, {New_router} from '../vendor/relast_router.js';
import Routes from './routes';
import Login from './components/login/index';
import Session from './components/session/index';
import Main from './view/templates/default/';

import LoadingIMG from '../assets/preloaders/points.gif';
import '../assets/fonts/abel-regular-webfont.woff2';

import '../assets/preloaders/windows8_2.svg';
import '../assets/images/logo.svg';

export default class App extends Rapp
{
    constructor(args)
    {
        super(args);
        MyAPI.headers = false;
        this._router = New_router({container: this});

        this._router.add(Routes.dashboard, this);
        this._router.add(Routes.users, this);
        this._router.add(Routes.products, this);
        this._router.add(Routes.sales, this);

        this.add_comp('Session', Session, {props:{response: 'session_response'}});
        this.add_comp('Login', Login, {css: 'components/login/main.css', props: {response: 'session_response', Session:'Session'}});
        this.add_comp('Template', Main, {css: 'view/templates/default/main.css', props:{Session:'Session'}});
    }
    run = function(props)
    {
        // // THIS METHOD RUN WHEN THE RENDER FINISH
        this.call_action('show_intro');
        this.render({
            dom: 'no_logged',
            bbox: 'main-content'
        });
        this.get_comp('Session').call_action('check_session');
    }
    states = function(props)
    {
        this.state('logged', false);
        this.state('loaded', false);
    }
    actions = function(props)
    {
        this.action('show_intro', ()=>{
            this.render({
                dom: 'loading',
                bbox: 'main-loader'
            });
        })
        this.action('session_response', (args)=>
        {
            this.reset('main-loader');
            // if(args)
            // {
            this.render({
                dom: `${args ? 'logged' : 'no_logged'}`,
                bbox: 'main-content'
            });
            // }
            this.state('loaded', true);
            this.state('logged', args);

            if(args)
            {
                this.get_comp('TEMPLATE').call_action('load_default');
            }
        });
    }
    draw = function(props)
    {
        this.dom('loading', ()=>
        {
            return (
                `<div class='loading-lbox'>
                    <div>
                        <div><img src='./assets/images/logo.svg' class='intro-logo' /></div>
                        <div><img src='./assets/preloaders/points.gif' /></div>
                    </div>
                </div>`
            );
        });
        
        this.dom('no_logged', ()=>
        {
            return (`<section id='Login'></section>`);
        });

        this.dom('logged', ()=>
        {
            return (`<section id='Template'></section>`);
        });

        this._dom.main = () =>
        {
            return (
                `<section>
                    <div id='Session'></div>
                    <div id='main-content' class='main-content'></div>
                    <div id='main-loader'></div>
                </section>`
            );
        }


        this._dom.style =`
            @font-face {
                font-family: 'aaarghnormal';
                src: url('assets/fonts/aaargh-webfont.woff2') format('woff2'),
                    url('assets/fonts/aaargh-webfont.woff') format('woff');
                font-weight: normal;
                font-style: normal;
            }
            @font-face {
                font-family: 'abelregular';
                src: url('assets/fonts/abel-regular-webfont.woff2') format('woff2'),
                    url('assets/fonts/abel-regular-webfont.woff') format('woff');
                font-weight: normal;
                font-style: normal;
            }
            button{font-size: 14px;}
            .intro-logo
            {
                height: 50px;
            }
            ${Rapp.isMobile() && '.title{  text-align: center;  }'}`;
    }
}
