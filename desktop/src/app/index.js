const elec = require('electron');
const App = require('./App').App;
const test_App = require('./(testing)App').App;
const nocache = Rapp.uuid();

window.onload = () =>
{
    // const api = document.createElement('script');
    // api.src = `http://localhost/CTI/cti_cluster3/api/api.js?${nocache}`;
    // document.body.appendChild(api);
    // api.onload = () =>
    // {
        new App({
            name: 'Main',
            bbox: document.getElementById('root'),
            electron: elec,
        }).start().render();
        // new test_App({
        //     name: 'Main',
        //     bbox: document.getElementById('root'),
        //     electron: elec,
        // }).start().render();
    // }
}