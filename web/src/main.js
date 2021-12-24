import App from './app/App.js';

window.onload = () =>
{
    new App({
        name: 'Main',
        bbox: document.getElementById('root')
    }).start().render().title('CTI Ecom');
}
