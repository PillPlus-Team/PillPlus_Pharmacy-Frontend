import PillRowDisplay from './PillRowDisplay';
import PillRowEditor from './PillRowEditor';

const PillRow = ({ index, pill }) => {
    return (
        <>
            {!pill.editing && <PillRowDisplay index={index} pill={pill} />}
            {pill.editing && <PillRowEditor index={index} pill={pill}/>}
        </>
    );
};

export default PillRow;
