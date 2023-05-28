import { useEffect, useState } from "react"
import IUsersModel from "../../Models/IUserModel";

function Users():JSX.Element{

    const [ users, setUsers ] = useState<IUsersModel[]>( [] );    

    

    return (
        <div>
            { !users.length && <h2> Loading... </h2> }
            { users.map( u => <p key={u._id}> {u.name } ({u.age}) </p> )}
        </div>
    )
}

export default Users