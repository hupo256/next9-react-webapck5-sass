import React from 'react'
import BasicLayout from '@components/HomePageLayout'
import ErrPage from '@components/404'

export default function ErrView(props) {
  return (
    <BasicLayout headConfig={{ title: '页面已停用' }}>
      <ErrPage />
    </BasicLayout>
  )
}
