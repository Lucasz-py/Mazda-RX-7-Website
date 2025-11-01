import React from 'react';
import './Footer.css';

export const Footer: React.FC = () => {
    return (
        <footer className="main-footer">
            <p className="footer-text">
                Dev by{' '}
                <a
                    href="https://github.com/Lucasz-py"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                >
                    Lucasz-py
                </a>
            </p>
        </footer>
    );
};