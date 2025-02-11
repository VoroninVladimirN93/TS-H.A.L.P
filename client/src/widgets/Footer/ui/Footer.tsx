import React from 'react';

export function Footer(): React.JSX.Element {
    return (
        <footer>{new Date().getFullYear()}</footer>
    );
}

