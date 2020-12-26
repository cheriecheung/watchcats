import React from 'react';
import { List } from 'antd';
import Card from './Card'

const pageSize = 10;

function Result({
  t,
  totalResults,
  paginatedResults,
  results,
  pagination,
  loading,
  onChangePage,
  currentPage,
  setHoveredResultId,
  screenWidth,
}) {
  const { from, to } = pagination

  console.log({ totalResults })

  return (
    <>
      {totalResults && paginatedResults &&
        <p style={{ textAlign: 'left', marginBottom: 20 }}>
          {t('find_sitter.showing', { from, to, totalResults })}
        </p>
      }

      {totalResults && totalResults === 0 &&
        <p
          style={{ textAlign: 'left', marginBottom: 20 }}>
          {t('find_sitter.no_results')}
        </p>
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
            t={t}
            item={item}
            setHoveredResultId={setHoveredResultId}
            screenWidth={screenWidth}
          />
        }
      />
    </>
  )
}

export default Result