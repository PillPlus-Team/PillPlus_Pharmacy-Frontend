import PillStorehouseRowDisplay from './PillStorehouseRowDisplay';
import PillStorehouseRowEditor from './PillStorehouseRowEditor';

const PillStorehouseRow = ({ index, pillStorehouse }) => {
    return (
        <>
            {!pillStorehouse.editing && <PillStorehouseRowDisplay index={index} pillStorehouse={pillStorehouse} />}
            {pillStorehouse.editing && <PillStorehouseRowEditor index={index} pillStorehouse={pillStorehouse}/>}
        </>
    );
};

export default PillStorehouseRow;
