import React from 'react';
import './ConfigOutput.css';

export const ConfigOutput = ({ config }) => {
    return (
        <div className="configOutput">
        <h4>Конфигурация:</h4>
        <pre>
            {config.map((item) => (
`<cell>
    <name> ${item.name} </name>${item.final ? '\n    <tags>uniqueNotification rare</tags>' : ''}
    <coordinates>
        <start>${item.start}</start>
        <end>${item.end}</end>
    </coordinates>
    <template> ${item.template} </template>
</cell>`
            )).join('')}
        </pre>
        </div>
    );
};
