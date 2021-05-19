import React from 'react'

const CHN_NUM_CHAR = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']

export default function Footer(props) {
  const { bedroom, liveroom } = props

  return <> {(!!bedroom || !!liveroom) && <span>{`${CHN_NUM_CHAR[bedroom]}室${CHN_NUM_CHAR[liveroom]}厅`}</span>}</>
}
