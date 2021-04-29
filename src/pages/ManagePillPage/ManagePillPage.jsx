import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import ReactPaginate from 'react-paginate';

import { PageLayout, TableRowSlot, RowEmpty, SearchBar } from '../../components';

import PillRowTitle from './components/PillRowTitle';
import PillRow from './components/PillRow';

import { pillsFetch, pillsFilter } from '../../actions/pillsAction';

const itemPerPage = 6;

const ManagePillPage = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    const menuList = useSelector((state) => state.menuList);
    const pills = useSelector((state) => state.pills);

    const [currentPage, setCurrentPage] = useState(0);

    let pillsFiltered_id = [];
    try {
        pillsFiltered_id = pills.list.map((pill) => {
            if (pill.show) {
                return pill._id;
            }
        });
        pillsFiltered_id = pillsFiltered_id.filter((_id) => _id != null);
    } catch (err) {
        pillsFiltered_id = [];
    }

    const isEmpty = pillsFiltered_id.length === 0;

    useEffect(() => {
        dispatch(pillsFetch());
    }, []);

    useEffect(() => {
        if (pillsFiltered_id.length / itemPerPage <= currentPage) {
            setCurrentPage(Math.floor(pillsFiltered_id.length / (itemPerPage + 1)));
        }
    }, [pillsFiltered_id]);

    return (
        <PageLayout pageTitle="จัดการข้อมูลยา" userInfo={user} menuList={menuList}>
            <div className="relative">
                <div className="flex w-full justify-end absolute -top-14">
                    <p className="flex justify-center items-center mr-6 text-white text-lg min-w-max">
                        ทั้งหมด {pillsFiltered_id.length.toLocaleString('th-TH')} รายการ
                    </p>
                    <SearchBar
                        onSearchClick={(keyword) => {
                            dispatch(pillsFilter({ keyword: keyword }));
                        }}
                    />
                </div>
                <TableRowSlot>
                    <PillRowTitle />
                    {isEmpty && <RowEmpty colSpan="9" text="ไม่มีข้อมูล" />}

                    {pills.list.map((pill) => {
                        const isInShowRange =
                            currentPage * itemPerPage <= pillsFiltered_id.indexOf(pill._id) &&
                            pillsFiltered_id.indexOf(pill._id) < currentPage * itemPerPage + itemPerPage;
                        return (
                            <>
                                {pill.show && isInShowRange && (
                                    <PillRow index={pillsFiltered_id.indexOf(pill._id) + 1} pill={pill} />
                                )}
                            </>
                        );
                    })}
                </TableRowSlot>
                <div className="flex flex-row items-center mt-4">
                    <ReactPaginate
                        pageCount={pillsFiltered_id.length / itemPerPage}
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

export default ManagePillPage;
