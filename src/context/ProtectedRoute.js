// // src/components/ProtectedRoute.js
// import { Navigate } from 'react-router-dom';
// import { useAuth } from './UserContext';

// const ProtectedRoute = ({ children, adminOnly = false }) => {
//   const { user } = useAuth();

//   // If user is not logged in, redirect to signin
//   if (!user) {
//     return <Navigate to="/auth/signin" />;
//   }

//   // If the route is for admin only and the user is not an admin, redirect to home
//   if (adminOnly && user.role !== 'admin') {
//     return <Navigate to="/" />;
//   }

//   // If all checks pass, render the child component
//   return children;
// };

// export default ProtectedRoute;
