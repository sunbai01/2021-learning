import React from 'react';
// 对应的node版
const {renderToString } = require('react-dom/server');
const {staticRouter} = require('react-router-dom');

const App = require('./src/app').default;
