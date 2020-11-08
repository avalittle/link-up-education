import Usercard from './Usercard'

import '../../styles/browse.css';

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