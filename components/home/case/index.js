import { BtnMore } from '../btn'
import _ from 'lodash'

const CaseProjects = ({ data }) => {
  // 初版
  if (_.isEmpty(data)) return null
  const len = data.length

  const caseStyle = {}
  _.forEach(data, (item, index) => {
    caseStyle[`image${index}`] = {
      background: `url(${item.imgUrl}) no-repeat center center`,
      backgroundSize: 'cover',
      height: '100%',
    }
  })

  const OneImageLayout = () => {
    caseStyle.projectCasesWrapper = {
      display: 'flex',
    }
    caseStyle.caseItem = {
      flex: 1,
      height: '570px',
    }

    return (
      <>
        <div style={caseStyle.projectCasesWrapper}>
          <div style={caseStyle.caseItem}>
            <div style={caseStyle.image0}></div>
          </div>
        </div>
        <BtnMore />
      </>
    )
  }

  const TwoImageLayout = () => {
    caseStyle.projectCasesWrapper = {
      display: 'flex',
      gap: '18px',
    }
    caseStyle.caseItem = {
      flex: 1,
      height: '400px',
      background: 'pink',
    }

    return (
      <>
        <div style={caseStyle.projectCasesWrapper}>
          <div style={caseStyle.caseItem}>
            <div style={caseStyle.image0}></div>
          </div>
          <div style={caseStyle.caseItem}>
            <div style={caseStyle.image1}></div>
          </div>
        </div>
        <BtnMore />
      </>
    )
  }

  const ThreeImageLayout = () => {
    caseStyle.projectCasesWrapper = {
      display: 'flex',
      alignItems: 'stretch',
      gap: '18px',
      height: '620px',
    }
    caseStyle.left = {
      background: 'pink',
      flex: 1,
    }

    caseStyle.right = {
      flex: 1,
      display: 'flex',
      gap: '18px',
      flexDirection: 'column',
    }

    caseStyle.caseItem = {
      flex: 1,
      background: 'pink',
    }

    return (
      <>
        <div style={caseStyle.projectCasesWrapper}>
          <div style={caseStyle.left}>
            <div style={caseStyle.image0}></div>
          </div>
          <div style={caseStyle.right}>
            <div style={caseStyle.caseItem}>
              <div style={caseStyle.image1}></div>
            </div>
            <div style={caseStyle.caseItem}>
              <div style={caseStyle.image2}></div>
            </div>
          </div>
        </div>
        <BtnMore />
      </>
    )
  }

  const FourImageLayout = () => {
    caseStyle.projectCasesWrapper = {
      display: 'flex',
      gap: '18px',
      flexDirection: 'column',
    }
    caseStyle.caseWrapper = {
      height: '280px',
      display: 'flex',
      gap: '18px',
    }
    caseStyle.caseItem = {
      flex: 1,
      background: 'pink',
    }

    return (
      <>
        <div style={caseStyle.projectCasesWrapper}>
          <div style={caseStyle.caseWrapper}>
            <div style={caseStyle.caseItem}>
              <div style={caseStyle.image0}></div>
            </div>
            <div style={caseStyle.caseItem}>
              <div style={caseStyle.image1}></div>
            </div>
          </div>
          <div style={caseStyle.caseWrapper}>
            <div style={caseStyle.caseItem}>
              <div style={caseStyle.image2}></div>
            </div>
            <div style={caseStyle.caseItem}>
              <div style={caseStyle.image3}></div>
            </div>
          </div>
        </div>
        <BtnMore />
      </>
    )
  }

  const FiveImageLayout = () => {
    caseStyle.projectCasesWrapper = {
      display: 'flex',
      alignItems: 'stretch',
      gap: '18px',
      height: '620px',
    }
    caseStyle.left = {
      background: 'pink',
      flex: 1,
    }

    caseStyle.right = {
      flex: 1,
      display: 'flex',
      gap: '18px',
      flexDirection: 'column',
    }

    caseStyle.caseItem = {
      flex: 1,
      background: 'pink',
    }

    return (
      <>
        <div style={caseStyle.projectCasesWrapper}>
          <div style={caseStyle.left}>
            <div style={caseStyle.image0}></div>
          </div>
          <div style={caseStyle.right}>
            <div style={caseStyle.caseItem}>
              <div style={caseStyle.image1}></div>
            </div>
            <div style={caseStyle.caseItem}>
              <div style={caseStyle.image2}></div>
            </div>
          </div>
          <div style={caseStyle.right}>
            <div style={caseStyle.caseItem}>
              <div style={caseStyle.image3}></div>
            </div>
            <div style={caseStyle.caseItem}>
              <div style={caseStyle.image4}></div>
            </div>
          </div>
        </div>
        <BtnMore />
      </>
    )
  }

  switch (len) {
    case 1:
      return <OneImageLayout />
    case 2:
      return <TwoImageLayout />
    case 3:
      return <ThreeImageLayout />
    case 4:
      return <FourImageLayout />
    case 5:
      return <FiveImageLayout />
  }

  return null
}

export default CaseProjects
