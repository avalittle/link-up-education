import CourseCard from './CourseCard';

import '../../styles/browse.css';

export default function CourseList({ classes }) {

    return (
        <ul className='course-list'>
            {classes.map(course =>
                <CourseCard key={course.classId} course={course}/>
            )
            }
        </ul>
    )
}