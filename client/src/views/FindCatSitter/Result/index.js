import React from 'react';
import { List } from 'antd';
import Card from './Card'
import { themeColor } from '../../../style/theme'
import { ResponseDisplayTemplate } from '../../../components/UIComponents'

const pageSize = 10;

function Result({
  t,
  totalResults,
  paginatedResults,
  pagination,
  loading,
  onChangePage,
  currentPage,
  setHoveredResultId,
  screenWidth
}) {
  const { from, to } = pagination

  // console.log({ totalResults, paginatedResults })

  return (
    <>
      {totalResults > 0 && paginatedResults.length > 0 ?
        <p
          style={{ textAlign: 'left', marginBottom: 10 }}
        >
          {t('find_sitter.showing', { from, to, totalResults })}
        </p>
        : []
      }

      {totalResults === 0 && paginatedResults.length === 0 ?
        <ResponseDisplayTemplate
          icon={<i className="far fa-surprise fa-5x" style={{ color: themeColor.grey }} />}
          title={'Oops!'}
          text={t('find_sitter.no_results')}
        />
        : []
      }

      {loading ?
        <div style={{ paddingTop: 25 }}>
          <ResponseDisplayTemplate
            icon={<i className="fas fa-search fa-3x" style={{ color: themeColor.grey }} />}
            title={'Searching...'}
          />
        </div>
        :
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (current) => onChangePage(current),
            total: totalResults,
            pageSize,
            current: currentPage,
            hideOnSinglePage: true
          }}
          dataSource={paginatedResults}
          renderItem={(item) =>
            <Card
              item={item}
              setHoveredResultId={setHoveredResultId}
              screenWidth={screenWidth}
            />
          }
        />
      }

    </>
  )
}

export default Result