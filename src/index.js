import buffer from 'buffer';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

window.Buffer = buffer.Buffer;

ReactDOM.render(<App />, document.getElementById('root'));
