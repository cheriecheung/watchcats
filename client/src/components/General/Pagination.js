import React, { useState, useEffect } from 'react';
import { Pagination as AntPagination } from 'antd';

function Pagination({ itemComponent, eachPage, allItems }) {
  const itemsEachPage = eachPage;
  const totalItems = allItems.length;

  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(itemsEachPage);

  const handleChange = (pageNum) => {
    if (pageNum <= 1) {
      setMinValue(0);
      setMaxValue(itemsEachPage);
    } else {
      setMinValue(maxValue);
      setMaxValue(pageNum * itemsEachPage);
    }
  };

  //   useEffect(() => {
  //     console.log({ minValue, maxValue });
  //   }, [minValue, maxValue]);

  return (
    <>
      {allItems &&
        allItems.length > 0 &&
        allItems.slice(minValue, maxValue).map(() => itemComponent)}

      <AntPagination
        defaultCurrent={1}
        defaultPageSize={itemsEachPage}
        onChange={handleChange}
        total={totalItems}
      />
    </>
  );
}

export default Pagination;
