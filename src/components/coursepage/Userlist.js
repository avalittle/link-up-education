import Coursepage from './Coursepage';
import Usercard from './Usercard'

import '../../styles/coursepage.css';

export default function UserList({ users }) {

    return (
        <ul className='user-list'>
            {users.map(user =>
                <Usercard key={user.Title} user={user}/>
            )
            }
        </ul>
    )
}