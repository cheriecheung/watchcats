import React from 'react';
import { List } from 'antd';
import Card from './Card'

const pageSize = 25;

function Result({
  totalResults,
  paginatedResults,
  results,
  pagination,
  loading,
  onChangePage,
  currentPage,
  setHoveredResultId
}) {
  return (
    <>
      {/* create display when none is found in bounds */}

      {totalResults && paginatedResults ?
        <p
          // ref={resultsRef}
          style={{ textAlign: 'left', marginBottom: 20 }}>
          Showing {pagination.from} - {pagination.to} of {totalResults} matches!
      </p>
        :
        []
      }
      {totalResults && totalResults === 0 ?
        <p
          // ref={resultsRef}
          style={{ textAlign: 'left', marginBottom: 20 }}>
          0 matches found
      </p>
        : []
      }
      <List
        itemLayout="vertical"
        size="large"
        loading={loading}
        pagination={{
          onChange: (current) => { onChangePage(current) },
          total: totalResults,
          pageSize,
          current: currentPage
        }}
        dataSource={results}
        renderItem={(item) =>
          <Card
            item={item}
            setHoveredResultId={setHoveredResultId}
          />
        }
      />
    </>
  )
}

export default Result