// "use strict"

// var express = require('express');
// var app = express();
// var path = require('path');

// app.use(express.static('public'))

// app.get('/', function(req, res) {
//     res.sendFile(path.resolve(_dirname, 'public', 'index.html'))
// })

// app.listen(3001, function() {
//     console.log('app is listening with 3001');
// })
// const express = require('express');
// const path = require('path');

// const app = express();

// // Server routes...
// app.get('*', (req, res) => res.send({ hi: 'there' }));

// if (process.env.NODE_ENV !== 'production') {
//   const webpackMiddleware = require('webpack-dev-middleware');
//   const webpack = require('webpack');
//   const webpackConfig = require('./webpack.config.js');
//   app.use(webpackMiddleware(webpack(webpackConfig)));
// } else {
//   app.use(express.static('dist'));
//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist/index.html'));
//   });
// }

// app.listen(process.env.PORT || 3050, () => console.log('Listening'));
const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, 'public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log('Server is up!');
});





// const express = require('express');
// const port = process.env.PORT || 8080;
// const app = express();

// app.use(express.static(__dirname + '/'));
// app.listen(port);