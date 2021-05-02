const StatementRowTitle = () => {
    return (
        <thead className="text-md border-b-2 shadow-sm ">
            <tr>
                <th className="w-16 px-6 py-3 text-left font-medium text-gray-700 tracking-wider" scope="col">
                    ลำดับ
                </th>
                <th className="w-24 px-6 py-3 text-left font-medium text-gray-700 tracking-wider" scope="col">
                    รหัสใบเสร็จ
                </th>
                <th className="w-44 px-6 py-3 text-left font-medium text-gray-700 tracking-wider" scope="col">
                    ชื่อ
                </th>
                <th className="w-36 px-6 py-3 text-left font-medium text-gray-700 tracking-wider" scope="col">
                    วันที่รับยา
                </th>
                <th className="w-36 px-6 py-3 text-center font-medium text-gray-700 tracking-wider border-l-2 border-r-2" scope="col">
                    ยอดชำระรวม
                </th>
                <th className="w-20 relative px-6 py-3" scope="col">
                    <span class="sr-only">ยกเลิก</span>
                </th>
            </tr>
        </thead>
    );
};

export default StatementRowTitle;
