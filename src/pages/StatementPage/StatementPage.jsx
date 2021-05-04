import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import ReactPaginate from 'react-paginate';

import { PageLayout, TableRowSlot, RowEmpty, SearchBar, InputDropdown } from '../../components';

import StatementRowTitle from './components/StatementRowTitle';
import StatementRowDisplay from './components/StatementRowDisplay';

import { statementsFetchByMonth, statementsFilter } from '../../actions/statementsAction';

const buildYearList = () => {
    const nowYear = new Date().getFullYear();

    let startYear = 2020;
    let years = [];
    while (startYear <= nowYear) {
        years.push(startYear);
        startYear += 1;
    }

    return years;
};

const itemPerPage = 7;

const monthList = ['ม.ค.', 'ก.พ.', 'มี.ค', 'เม.ย', 'พ.ค', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค', 'พ.ย', 'ธ.ค.'];
const yearList = buildYearList();

const StatementPage = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    const menuList = useSelector((state) => state.menuList);
    const statements = useSelector((state) => state.statements);

    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());

    const [currentPage, setCurrentPage] = useState(0);

    let statementsFiltered_id = [];
    try {
        statementsFiltered_id = statements.list.map((statement) => {
            if (statement.show) {
                return statement._id;
            }
        });
        statementsFiltered_id = statementsFiltered_id.filter((_id) => _id != null);
    } catch (err) {
        statementsFiltered_id = [];
    }

    const isEmpty = statementsFiltered_id.length === 0;

    useEffect(() => {
        dispatch(statementsFetchByMonth({ month: month, year: year }));
    }, [month, year]);

    useEffect(() => {
        if (statementsFiltered_id.length / itemPerPage <= currentPage) {
            setCurrentPage(Math.floor(statementsFiltered_id.length / (itemPerPage + 1)));
        }
    }, [statementsFiltered_id]);

    return (
        <PageLayout pageTitle="เช็คยอดร้านขายยา" userInfo={user} menuList={menuList}>
            <div className="relative">
                <div className="flex w-full justify-end absolute -top-14 min-w-max">
                    <p className="flex justify-center items-center mr-6 text-white text-lg min-w-max">
                        ทั้งหมด {statementsFiltered_id.length.toLocaleString('th-TH')} รายการ
                    </p>
                    <div className="flex justify-center items-center w-28 mr-2">
                        <InputDropdown
                            id={`InputDropdown-month`}
                            name="month"
                            optionList={monthList}
                            selectedIndex={month - 1}
                            onValueChange={(state) => {
                                setMonth(monthList.indexOf(state) + 1);
                            }}
                        />
                    </div>
                    <div className="flex justify-center items-center w-28 mr-2">
                        <InputDropdown
                            id={`InputDropdown-year`}
                            name="year"
                            optionList={yearList}
                            selectedIndex={yearList.indexOf(year)}
                            onValueChange={(state) => {
                                setYear(state);
                            }}
                        />
                    </div>
                    <SearchBar
                        onSearchClick={(keyword) => {
                            dispatch(statementsFilter({ keyword: keyword, month: month, year: year }));
                        }}
                    />
                </div>
                <TableRowSlot>
                    <StatementRowTitle />
                    {isEmpty && <RowEmpty colSpan="6" text="ไม่มีข้อมูล" />}
                    {statements.list.map((invoiceHistory) => {
                        const isInShowRange =
                            currentPage * itemPerPage <= statementsFiltered_id.indexOf(invoiceHistory._id) &&
                            statementsFiltered_id.indexOf(invoiceHistory._id) < currentPage * itemPerPage + itemPerPage;
                        return (
                            <>
                                {invoiceHistory.show && isInShowRange && (
                                    <StatementRowDisplay
                                        index={statementsFiltered_id.indexOf(invoiceHistory._id) + 1}
                                        invoiceHistory={invoiceHistory}
                                    />
                                )}
                            </>
                        );
                    })}
                </TableRowSlot>

                <div className="flex flex-row items-center mt-4">
                    <div className="flex flex-row justify-center items-center py-2 px-4 space-x-4 text-gray-500 bg-white rounded-lg shadow-md">
                        <p>💰 ยอดรวมทั้งสิ้น</p>
                        <p className="text-lg underline">
                            {Number(statements.balanced).toLocaleString('th-TH', {
                                style: 'currency',
                                currency: 'THB',
                                minimumFractionDigits: 2,
                            })}
                        </p>
                    </div>
                    <ReactPaginate
                        pageCount={statementsFiltered_id.length / itemPerPage}
                        initialPage={currentPage}
                        forcePage={currentPage}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        containerClassName="flex flex-row max-w-min text-gray-500 rounded-lg shadow-md ml-auto"
                        pageClassName="flex justify-center items-center w-10 h-12 bg-white hover:bg-gray-200 cursor-pointer"
                        pageLinkClassName="flex justify-center items-center w-full h-full "
                        previousClassName="flex justify-center items-center w-10 h-12 bg-white rounded-l-lg hover:bg-gray-200 cursor-pointer"
                        previousLinkClassName="flex justify-center items-center w-full h-full "
                        nextClassName="flex justify-center items-center w-10 h-12 bg-white rounded-r-lg hover:bg-gray-200 cursor-pointer"
                        nextLinkClassName="flex justify-center items-center w-full h-full "
                        breakClassName="flex justify-center items-center w-10 h-12 bg-white hover:bg-gray-200 cursor-pointer"
                        breakLinkClassName="flex justify-center items-center w-full h-full "
                        activeClassName="flex justify-center items-center w-10 h-12 bg-gray-200 hover:bg-gray-200 cursor-pointer"
                        previousLabel={<span aria-hidden="true">&laquo;</span>}
                        nextLabel={<span aria-hidden="true">&raquo;</span>}
                        breakLabel="..."
                        onPageChange={(page) => {
                            setCurrentPage(page.selected);
                        }}
                    />
                </div>
            </div>
        </PageLayout>
    );
};
export default StatementPage;
