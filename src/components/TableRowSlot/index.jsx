const TableRowSlot = ({ children }) => {
    return (
        <div className="min-w-min bg-white shadow-md border-b rounded-lg">
            <table className="table-fixed w-full min-w-full divide-y divide-gray-200">{children}</table>
        </div>
    );
};

export default TableRowSlot;
