import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { bootstrapSnowflakes } from './snowflakes'
import { bootstrapPopup } from './popup'

ReactDOM.render(<App />, document.getElementById('root'));

window.addEventListener('DOMContentLoaded', () => bootstrapSnowflakes())
window.addEventListener('DOMContentLoaded', () => bootstrapPopup())
