import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './Component/App';

// const container = document.getElementById('react_connect');
// if ( container ){
//     const root = createRoot(container);
//     root.render(<App/>)
// }

document.addEventListener('DOMContentLoaded', function (){
    const container = document.getElementById('react_connect');
    if ( container ){
        const root = createRoot(container);
        root.render(<App/>)
    }

});