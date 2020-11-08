import Coursepage from './Coursepage';

import '../../styles/browse.css';

export default function UserList({ users }) {

    return (
        <ul className='user-list'>
            {users.map(user =>
                <Usercard key={user.userId} firstName={user.firstName} lastName={user.lastName}/>
            )
            }
        </ul>
    )
}