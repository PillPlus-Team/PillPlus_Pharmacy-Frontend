const QueueTitle = () => {
    return (
        <div className="flex flex-row min-w-min">
            <p className="w-20 px-6 py-3 text-center font-medium text-gray-700 tracking-wider">ลำดับ</p>
            <p className="w-72 px-6 py-3 text-left font-medium text-gray-700 tracking-wider">ชื่อผู้ป่วย</p>
            <p className="w-44 px-6 py-3 text-center font-medium text-gray-700 tracking-wider">เวลาที่รอ</p>
            <p className="w-32 px-6 py-3 text-center font-medium text-gray-700 tracking-wider">เลขบัตรคิว</p>
        </div>
    );
};

export default QueueTitle;
