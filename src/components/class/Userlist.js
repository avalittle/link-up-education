import Usercard from './Usercard'

import '../../styles/coursepage.css';

export default function UserList({ users }) {
    console.log("User Lists");
    console.log(users);
    return (
        <ul className='user-list'>
            {users.map(user => 
                <Usercard key={user.name} user={user} />
            )}
        </ul>
    )
}