import React from 'react'

const CHN_NUM_CHAR = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '拾']

export default function RoomType(props) {
  const { bedroom, liveroom } = props

  return (
    <>
      {(!!bedroom || !!liveroom) && (
        <span>
          {`${!!bedroom ? CHN_NUM_CHAR[bedroom] + '室' : ''}`}
          {`${!!liveroom ? CHN_NUM_CHAR[liveroom] + '厅' : ''}`}
        </span>
      )}
    </>
  )
}
