const InvoiceInfoMonitor = ({ invoice }) => {
    return (
        <div className="flex w-full h-full p-4 bg-white border rounded-lg overflow-y-auto">
            <table className="table-fixed w-full min-w-full divide-y divide-gray-200">
                <tr>
                    <td className="font-bold w-36 py-2">รหัสใบเสร็จ</td>
                    <td className="w-96 py-2">{invoice._id}</td>
                </tr>

                <tr>
                    <td className="font-bold w-36 py-2">รหัส HN</td>
                    <td className="w-96 py-2">{invoice.hn}</td>
                </tr>

                <tr>
                    <td className="font-bold w-36 py-2">ชื่อ</td>
                    <td className="w-96 py-2">{invoice.name}</td>
                </tr>
                <tr>
                    <td className="font-bold w-36 py-2">เลขประจำตัวประชาชน</td>
                    <td className="w-96 py-2">{invoice.identificationNumber}</td>
                </tr>
                <tr>
                    <td className="font-bold w-36 py-2">แพทย์ผู้รับผิดชอบ</td>
                    <td className="w-96 py-2">{invoice.doctor}</td>
                </tr>
                <tr>
                    <td className="font-bold w-36 py-2">สถานที่รับยา</td>
                    <td className="w-96 py-2">
                        <div className="flex flex-col">
                            <p>{invoice.pillStore.pharmacy}</p>
                            <p className="text-sm text-gray-400 break-words">{invoice.pillStore.location}</p>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className="font-bold w-36 py-2 align-top">รายการยาที่ได้รับ</td>
                    <td className="w-96 align-top space-y-2 divide-y divide-gray-200">
                        {invoice.pills.map((pill, index) => {
                            return (
                                <div className="flex flex-row py-2">
                                    <p className=" mr-1">{index + 1}.</p>
                                    <div className="flex flex-col w-full">
                                        <p className="w-80 break-all">{pill.name}</p>
                                        <p className="w-80 text-sm text-gray-400 break-all">
                                            {pill.description.split('\n').map((subString) => {
                                                return (
                                                    <>
                                                        {subString}
                                                        <br />
                                                    </>
                                                );
                                            })}
                                        </p>
                                        <div className="flex flex-row justify-between">
                                            <p>
                                                {pill.amount} {pill.unit}
                                            </p>
                                            <p>
                                                {Number(pill.totalPrice).toLocaleString('th-TH', {
                                                    style: 'currency',
                                                    currency: 'THB',
                                                    minimumFractionDigits: 2,
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </td>
                </tr>
                <tr>
                    <td className="font-bold w-36 py-2">ค่าบริการ</td>
                    <td className="w-96 py-2 text-right">
                        {Number(invoice.serviceCharge).toLocaleString('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 2 })}
                    </td>
                </tr>
                <tr>
                    <td className="font-bold w-36 py-2">รวมทั้งสิ้น</td>
                    <td className="w-96 py-2 text-right">
                        {Number(invoice.totalPay).toLocaleString('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 2 })}
                    </td>
                </tr>
            </table>
        </div>
    );
};

export default InvoiceInfoMonitor;
