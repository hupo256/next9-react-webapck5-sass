import axios from 'axios'
import Link from 'next/link'
import _ from 'lodash'

const dummyDomain = 'http://localhost:3000' //for demo

export const getServerSideProps = async context => {
  const { data } = await axios.get(dummyDomain + '/api/getCommonList?object=case') //todo... 使用 index.js 相似的获取接口数据的方法

  return {
    props: { data }, // will be passed to the page component as props
  }
}

const CaseComp = ({ data }) => {
  return (
    <>
      {_.map(data, (item, index) => (
        <p key={index}>
          <Link href={`/cases/${item.name}`}>
            <a>{item.name}</a>
          </Link>
        </p>
      ))}
    </>
  )
}

export default CaseComp
