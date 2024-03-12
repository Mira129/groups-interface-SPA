import React from 'react';

export default function Expander ({title, children, view}) {
    const [expanded, setExpanded] = React.useState(false);
    const handleHeaderClick = () => {
    	setExpanded(expanded => !expanded);
    };

    if (view){
        return (
        <div className="expanderStyle">
            <div className="headerStyle" onClick={handleHeaderClick}>
            <div className="titleStyle">{title}</div>
            <div className="spacerStyle"/>
            </div>
            <div className={expanded ? "contentExpandedStyle" : "contentCollapsedStyle"}>
                {children}
            </div>
        </div>
        );
    } else {
        return;
    }
};