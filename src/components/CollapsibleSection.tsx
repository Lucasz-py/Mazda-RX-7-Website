import React, { useState } from 'react';
import './CollapsibleSection.css';

interface CollapsibleSectionProps {
    title?: string;
    imageClosed?: string;
    imageOpen?: string;
    isOpen?: boolean;
    children: React.ReactNode;
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
    title,
    imageClosed,
    imageOpen,
    isOpen = false,
    children
}) => {
    const [open, setOpen] = useState(isOpen);
    const hasImage = imageClosed && imageOpen;

    return (
        <div className={`collapsible-section ${hasImage ? 'has-image' : ''}`}>
            <button
                className="collapsible-header"
                onClick={() => setOpen(!open)}
            >
                {hasImage ? (
                    <img
                        src={open ? imageOpen : imageClosed}
                        alt={title || 'Section'}
                        className="collapsible-image"
                    />
                ) : (
                    <>
                        <span className="collapsible-title">{title}</span>
                        <span className={`collapsible-arrow ${open ? 'open' : ''}`}>
                            ▼
                        </span>
                    </>
                )}
            </button>
            <div className={`collapsible-content ${open ? 'open' : ''}`}>
                {children}
            </div>
        </div>
    );
};