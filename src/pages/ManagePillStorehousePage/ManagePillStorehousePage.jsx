import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import ReactPaginate from 'react-paginate';

import { PageLayout, TableRowSlot, RowEmpty, SearchBar } from '../../components';

import PillStorehouseRowTitle from './components/PillStorehouseRowTitle';
import PillStorehouseRow from './components/PillStorehouseRow';

import { pillStorehousesFetch, pillStorehousesFilter } from '../../actions/pillStorehousesAction';

const itemPerPage = 6;

const ManagePillStorehousePage = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    const menuList = useSelector((state) => state.menuList);
    const pillStorehouses = useSelector((state) => state.pillStorehouses);

    const [currentPage, setCurrentPage] = useState(0);

    let pillStorehousesFiltered_id = [];
    try {
        pillStorehousesFiltered_id = pillStorehouses.list.map((pillStorehouse) => {
            if (pillStorehouse.show) {
                return pillStorehouse._id;
            }
        });
        pillStorehousesFiltered_id = pillStorehousesFiltered_id.filter((_id) => _id != null);
    } catch (err) {
        pillStorehousesFiltered_id = [];
    }

    const isEmpty = pillStorehousesFiltered_id.length === 0;

    useEffect(() => {
        dispatch(pillStorehousesFetch());
    }, []);

    useEffect(() => {
        if (pillStorehousesFiltered_id.length / itemPerPage <= currentPage) {
            setCurrentPage(Math.floor(pillStorehousesFiltered_id.length / (itemPerPage + 1)));
        }
    }, [pillStorehousesFiltered_id]);

    return (
        <PageLayout pageTitle="จัดการข้อมูลยา" userInfo={user} menuList={menuList}>
            <div className="relative">
                <div className="flex w-full justify-end absolute -top-14">
                    <p className="flex justify-center items-center mr-6 text-white text-lg min-w-max">
                        ทั้งหมด {pillStorehousesFiltered_id.length.toLocaleString('th-TH')} รายการ
                    </p>
                    <SearchBar
                        onSearchClick={(keyword) => {
                            dispatch(pillStorehousesFilter({ keyword: keyword }));
                        }}
                    />
                </div>
                <TableRowSlot>
                    <PillStorehouseRowTitle />
                    {isEmpty && <RowEmpty colSpan="9" text="ไม่มีข้อมูล" />}

                    {pillStorehouses.list.map((pillStorehouse) => {
                        const isInShowRange =
                            currentPage * itemPerPage <= pillStorehousesFiltered_id.indexOf(pillStorehouse._id) &&
                            pillStorehousesFiltered_id.indexOf(pillStorehouse._id) < currentPage * itemPerPage + itemPerPage;
                        return (
                            <>
                                {pillStorehouse.show && isInShowRange && (
                                    <PillStorehouseRow index={pillStorehousesFiltered_id.indexOf(pillStorehouse._id) + 1} pillStorehouse={pillStorehouse} />
                                )}
                            </>
                        );
                    })}
                </TableRowSlot>
                <div className="flex flex-row items-center mt-4">
                    <ReactPaginate
                        pageCount={pillStorehousesFiltered_id.length / itemPerPage}
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

export default ManagePillStorehousePage;
