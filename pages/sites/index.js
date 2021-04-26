import axios from 'axios'
import Link from 'next/link'
import _ from 'lodash'

const dummyDomain = 'http://localhost:3000'

export const getServerSideProps = async context => {
  const { data } = await axios.get(dummyDomain + '/api/getCommonList?object=sites')

  return {
    props: { data }, // will be passed to the page component as props
  }
}

const CaseComp = ({ data }) => {
  return (
    <>
      {_.map(data, (item, index) => (
        <p key={index}>
          <Link href={`/sites/${item.name}`}>
            <a>{item.name}</a>
          </Link>
        </p>
      ))}
    </>
  )
}

export default CaseComp
