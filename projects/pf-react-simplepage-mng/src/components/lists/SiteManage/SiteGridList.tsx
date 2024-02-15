import React from 'react';
import { SiteBlockCard, WorkspaceCardSkeleton } from '../..';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { Pagination, PaginationProps } from 'antd';
import { setCurrentPage, setPageSize } from '../../../features/siteSlice';

const SiteGridList = ({ isLoading }: { isLoading: boolean }) => {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const dispatch = useAppDispatch();

  const { siteBlockList, total, currentPage, pageSize, selectedRowKeys } = useAppSelector(
    (state) => state.siteReducer
  );

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  const handlePageChange: PaginationProps['onChange'] = (page) => {
    console.log('page :>> ', page);
    dispatch(setCurrentPage(page));
  };

  const handlePageSizeChange: PaginationProps['onShowSizeChange'] = (current, size) => {
    console.log('size :>> ', size);
    console.log(current);
    dispatch(setPageSize(size));
  };

  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  if (isLoading) {
    return (
      <div className="flex flex-wrap gap-2">
        <div className="w-[200px] h-[250px]">
          <WorkspaceCardSkeleton />
        </div>
        <div className="w-[200px] h-[250px]">
          <WorkspaceCardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {siteBlockList.map((block) => (
          <div key={block.id} className="">
            <SiteBlockCard block={block} />
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-2">
        <Pagination
          size="small"
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
  );
};

export default SiteGridList;
