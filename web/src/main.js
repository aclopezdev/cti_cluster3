import App from './app/App.js';
console.log(1111);

window.onload = () =>
{
    new App({
        name: 'Main',
        bbox: document.getElementById('root')
    }).start().render().title('CTI Ecom');
}
