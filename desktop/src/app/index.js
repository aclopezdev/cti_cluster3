const elec = require('electron');
const App = require('./App').App;


new App({
    name: 'Main',
    bbox: document.getElementById('root'),
    electron: elec,
}).start().render();