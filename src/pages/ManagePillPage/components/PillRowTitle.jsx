const PillRowTitle = () => {
    return (
        <thead className="text-md border-b-2 shadow-sm ">
            <tr>
                <th className="w-10 px-6 py-3 text-left font-medium text-gray-700 tracking-wider" scope="col">
                    ลำดับ
                </th>
                <th className="w-32 px-6 py-3 text-left font-medium text-gray-700 tracking-wider" scope="col">
                    รหัส SN
                </th>
                <th className="w-52 px-6 py-3 text-left font-medium text-gray-700 tracking-wider" scope="col">
                    ชื่อยา
                </th>
                <th className="w-64 px-6 py-3 text-left font-medium text-gray-700 tracking-wider" scope="col">
                    คำอธิบาย
                </th>
                <th className="w-32 px-6 py-3 text-left font-medium text-gray-700 tracking-wider" scope="col">
                    จำนวน
                </th>
                <th className="w-36 px-6 py-3 text-left font-medium text-gray-700 tracking-wider" scope="col">
                    หน่วย
                </th>
                <th className="w-36 px-6 py-3 text-left font-medium text-gray-700 tracking-wider" scope="col">
                    ราคา/หน่วย
                </th>

                <th className="w-20 relative px-6 py-3" scope="col">
                    <span class="sr-only"></span>
                </th>
                <th className="w-20 relative px-6 py-3" scope="col">
                    <span class="sr-only"></span>
                </th>
            </tr>
        </thead>
    );
};

export default PillRowTitle;
