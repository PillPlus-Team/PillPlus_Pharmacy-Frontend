import { useState, useEffect } from 'react';

import QueueDisplay from './QueueDisplay';
import QueueEmpty from './QueueEmpty';

const QueueList = ({ patientQueueList, onSelected = () => {} }) => {
    const [nowTimeStamp, setNowTimeStamp] = useState(Date.now());

    const isEmpty = patientQueueList.length === 0;

    useEffect(() => {
        setTimeout(() => {
            setNowTimeStamp(Date.now());
        }, 1000);
    }, [nowTimeStamp]);

    return (
        <div className="flex flex-col">
            {isEmpty && <QueueEmpty />}

            {patientQueueList.map((patient, index) => {
                return <QueueDisplay index={index + 1} patient={patient} nowTimeStamp={nowTimeStamp} onSelected={onSelected} />;
            })}
        </div>
    );
};

export default QueueList;
