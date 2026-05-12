import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.sass';
import App from './App';
// import reportWebVitals from './reportWebVitals';
const container = document.getElementById('root');
if (!container) {
    throw new Error('Root container not found');
}
const root = ReactDOM.createRoot(container);
root.render(_jsx(React.StrictMode, { children: _jsx(App, {}) }));
//# sourceMappingURL=index.js.map