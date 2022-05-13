import buffer from 'buffer';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';

window.Buffer = buffer.Buffer;

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
