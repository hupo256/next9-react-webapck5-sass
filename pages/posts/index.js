import axios from 'axios'
import Link from 'next/link'
import _ from 'lodash'

const dummyDomain = 'http://localhost:3000'

export const getServerSideProps = async context => {
  const { data } = await axios.get(dummyDomain + '/api/getCommonList?object=post')

  return {
    props: { data }, // will be passed to the page component as props
  }
}

const PostComp = ({ data }) => {
  return (
    <>
      {_.map(data, (post, index) => (
        <p key={index}>
          <Link href={`/posts/${post.name}`}>
            <a>{post.name}</a>
          </Link>
        </p>
      ))}
    </>
  )
}

export default PostComp
