import Matchescard from './matchescard';

import '../../styles/matches.css';

export default function Matcheslist({ matches }) {

    return (
        <ul className='match-list'>
            {matches.map(user =>
                <Matchescard key={matches.Title} user={user}/>
            )
            }
        </ul>
    )
}