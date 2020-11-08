import CourseCard from './CourseCard';

import '../../styles/browse.css';

export default function CourseList({ classes }) {

    return (
        <ul className='course-list'>
            {classes.map(course =>
                <CourseCard key={course.title} course={course}/>
            )
            }
        </ul>
    )
}