// import {
//   Button,
//   Container,
//   Typography,
// } from '@mui/material'

// import {
//   Link,
//   useParams,
// } from 'react-router-dom'

// import { projects } from '../core/data/projects'

// function ProjectDetails() {
//   const { id } = useParams()

//   const project = projects.find(
//     (project) => project.id === Number(id)
//   )

//   if (!project) {
//     return (
//       <Container sx={{ py: 8 }}>
//         <Typography variant="h3">
//           Project not found
//         </Typography>

//         <Button
//           component={Link}
//           to="/projects"
//           sx={{ mt: 3 }}
//         >
//           Back to Projects
//         </Button>
//       </Container>
//     )
//   }

//   return (
//     <Container sx={{ py: 8 }}>
//       <Typography
//         variant="overline"
//         color="text.secondary"
//       >
//         {project.category}
//       </Typography>

//       <Typography
//         variant="h2"
//         component="h1"
//         gutterBottom
//       >
//         {project.name}
//       </Typography>

//       <Typography
//         variant="h5"
//         color="text.secondary"
//       >
//         {project.city}
//       </Typography>

//       <Button
//         component={Link}
//         to="/projects"
//         sx={{ mt: 4 }}
//       >
//         Back to Projects
//       </Button>
//     </Container>
//   )
// }

// export default ProjectDetails