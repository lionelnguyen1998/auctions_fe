import React from 'react';

function StatusTab ({tabs, status, setStatus, t}) {
    return (
        <>
        {
            tabs.map(tab => (
                <li 
                    key={tab}
                    style={status === tab ? {
                        color: '#7FAD39',
                    } : {}}
                    onClick={() => setStatus(tab)}
                >
                    <b>{t(`status.${tab}`)}</b>
                </li>
            ))
        }
        </>
    )
}

export default StatusTab;