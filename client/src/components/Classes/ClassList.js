import React from 'react'
import PropTypes from 'prop-types'
import ClassCard from './ClassCard'
import NewClassCard from './NewClassCard'

const ClassList = props => {
  const { classSet } = props

  return (
    <React.Fragment>
      {props.classSet.length > 0
        ? classSet.map((classItem, index) => {
          return (
            <ClassCard
              key={index}
              classItem={classItem} />
          )
        })
        : null}
      <NewClassCard />
    </React.Fragment>
  )
}

ClassList.propTypes = {
  classSet: PropTypes.array
}

export default ClassList

// class Classes extends Component {
//   constructor () {
//     super()
//     this.state = {}
//   }

//   render () {
//     return (
//       <div className='classes_container'>
//         <h1>Add Classes</h1>
//         <Query query={GET_CLASSES_INFORMATION} variables={{ token: localStorage.getItem('token') }}>
//           {({ loading, error, data }) => {
//             if (loading) return 'Getting your classes...'
//             if (error) return `Error: ${error.message}`
//             const classSet = data.teacher[0].classSet

//             return (
//               <ul>
//                 {classSet.length > 0
//                   ? classSet.map((classItem, index) => {
//                     return (
//                       <ClassCard
//                         key={index}
//                         classItem={classItem} />
//                     )
//                   })
//                   : null}
//                 <NewClassCard />
//               </ul>
//             )
//           }}
//         </Query>
//       </div>
//     )
//   }
// }
