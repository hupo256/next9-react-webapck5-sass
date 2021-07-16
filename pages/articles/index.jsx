import React, { useEffect, useState } from 'react'
import BasicLayout from '@components/HomePageLayout'
import Router from 'next/router'
import dynamic from 'next/dynamic'
import articleApi from '@service/articleApi'

const ArtComponents = dynamic(import('sample/artComponents'), { ssr: false })

export default function Article(props) {
  return (
    <BasicLayout headConfig={{ title: '装修攻略' }} pushType="article">
      <ArtComponents articleApi={articleApi} Router={Router} />
    </BasicLayout>
  )
}
