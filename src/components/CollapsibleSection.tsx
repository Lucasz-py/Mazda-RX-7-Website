import React, { useState } from 'react';
import './CollapsibleSection.css';

interface CollapsibleSectionProps {
    title: string;
    isOpen?: boolean;
    children: React.ReactNode;
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
    title,
    isOpen = false,
    children
}) => {
    const [open, setOpen] = useState(isOpen);

    return (
        <div className="collapsible-section">
            <button
                className="collapsible-header"
                onClick={() => setOpen(!open)}
            >
                <span className="collapsible-title">{title}</span>
                <span className={`collapsible-arrow ${open ? 'open' : ''}`}>
                    ▼
                </span>
            </button>
            <div className={`collapsible-content ${open ? 'open' : ''}`}>
                {children}
            </div>
        </div>
    );
};