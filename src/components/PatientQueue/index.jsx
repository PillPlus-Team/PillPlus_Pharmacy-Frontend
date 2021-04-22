import QueueTitle from './QueueTitle';
import QueueList from './QueueList';

const PatientQueue = ({ patientQueueList = [], onSelected = () => {} }) => {
    return (
        <div className="flex flex-col h-full">
            <div className="bg-white shadow-md border-b-2 rounded-t-lg">
                <QueueTitle />
            </div>
            <div className="h-full bg-white shadow-md border-b rounded-b-lg overflow-y-auto">
                <QueueList patientQueueList={patientQueueList} onSelected={onSelected} />
            </div>
        </div>
    );
};

export default PatientQueue;
