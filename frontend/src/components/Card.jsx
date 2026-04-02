import React from 'react';

const Card = ({ title, children, className = '', ...rest }) => {
    return (
        <div className={`card-neo p-6 ${className}`} {...rest}>
            {title && (
                <h3 className="section-title text-xl font-semibold mb-4">
                    {title}
                </h3>
            )}
            {children}
        </div>
    );
};

export default Card;