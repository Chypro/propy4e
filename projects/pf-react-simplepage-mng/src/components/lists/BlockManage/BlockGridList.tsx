import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { WorkspaceCardSkeleton } from '../..';
import { Pagination, PaginationProps } from 'antd';
import { setCurrentPage, setPageSize } from '../../../features/blockSlice';
type Props = {
  isLoading: boolean;
};
const BlockGridList = ({ isLoading }: Props) => {
  const dispatch = useAppDispatch();
  const { blockBlockList, total, currentPage, pageSize, selectedRowKeys } = useAppSelector(
    (state) => state.blockReducer
  );
  const handlePageChange: PaginationProps['onChange'] = (page) => {
    console.log('page :>> ', page);
    dispatch(setCurrentPage(page));
  };

  const handlePageSizeChange: PaginationProps['onShowSizeChange'] = (current, size) => {
    console.log('size :>> ', size);
    console.log(current);
    dispatch(setPageSize(size));
  };
  return (
    <>
      <div>
        <div className="grid grid-cols-6 gap-2">
          <div className="col-span-6 md:col-span-2 xl:col-span-1">
            <WorkspaceCardSkeleton />
          </div>
          <div className="col-span-6 md:col-span-2 xl:col-span-1">
            <WorkspaceCardSkeleton />
          </div>
        </div>

        <div className="flex justify-end">
          <Pagination
            total={total}
            current={currentPage}
            pageSize={pageSize}
            showQuickJumper
            showSizeChanger
            pageSizeOptions={[10, 25, 50, 100]}
            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
            onChange={handlePageChange}
            onShowSizeChange={handlePageSizeChange}
          />
        </div>
      </div>
    </>
  );
};

export default BlockGridList;
