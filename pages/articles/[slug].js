import { useRouter } from 'next/router'

const PostItemComp = () => {
  const {
    query: { slug },
  } = useRouter()

  return <>{slug}</>
}

export default PostItemComp
