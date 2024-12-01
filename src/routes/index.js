import LayoutDefault from "../layout/LayoutDefault";
import Dashboard from "../pages/Dashboard";
import Course from "../pages/Course";
import Category from "../pages/Category";
import Lesson from "../pages/Lesson";
import CreateCourse from "../pages/Course/CreateCourse";
import CreateLesson from "../pages/Lesson/CreateLesson";
import CreateCategory from "../pages/Category/CreateCategory";
import Instructor from "../pages/Instructor";
import CreateInstructor from "../pages/Instructor/CreateInstructor";
import Quiz from "../pages/Quiz";
import Question from "../pages/Quiz/Question";
import Certification from "../pages/Certification";
import CreateCertification from "../pages/Certification/CreateCertification";
import Answer from "../pages/Quiz/Answer";
import Login from "../pages/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import Logout from "../pages/Logout";
import Unauthorized from "../pages/Unauthorized";
import Error404 from "../pages/Error404";


 export const routes = [
    {
        path: "/",
        element: <LayoutDefault />,
        children: [
            {
                path: "/",
                element: <ProtectedRoute element={<Dashboard />} />
            },
            {
                path: "/course",
                element: <ProtectedRoute element={<Course />} />
            },
            {
                path: "/course/createCourse",
                element: <ProtectedRoute element={<CreateCourse />} />
            },
            {
                path: "/lesson",
                element: <ProtectedRoute element={<Lesson />} />  
            },
            {
                path: "/lesson/createLesson",
                element: <ProtectedRoute element={<CreateLesson />} />
            },
            {
                path: "/quiz",
                element: <ProtectedRoute element={<Quiz />} />
            },
            {
                path: "/quiz/question",
                element: <ProtectedRoute element={<Question />} />
            },
            {
                path: "/quiz/question/answer",
                element: <ProtectedRoute element={<Answer />} />
            },
            {
                path: "/category",
                element: <ProtectedRoute element={<Category />} />
            },
            {
                path: "/category/createCategory",
                element: <ProtectedRoute element={<CreateCategory />} />
            },
            {
                path: "/instructor",
                element: <ProtectedRoute element={<Instructor />} /> 
            },
            {
                path: "/instructor/createInstructor",
                element: <ProtectedRoute element={<CreateInstructor />} />
            },
            {
                path: "/certification",
                element: <ProtectedRoute element={<Certification />} />
            },
            {
                path: "/certification/createCertification",
                element: <ProtectedRoute element={<CreateCertification />} />
            },
            {
                path: "/logout",
                element: <Logout />
            },
        ],
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/unauthorized",
        element: <Unauthorized />
    },
    {
        path: "*",
        element: <Error404 />
    },
 ]; 