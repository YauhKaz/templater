import React from 'react';
import './WarningMessage.css';

export const WarningMessage = ({ message }) => {
    if (!message) return null;

    return (
        <div className="warning">
        {message}
        </div>
    );
};
