import { useEffect, useState } from "react"
import IUserModel from "../../../Models/IUserModel";

function Users():JSX.Element{

    const [ users, setUsers ] = useState<IUserModel[]>( [] );    

    

    return (
        <div>
            { !users.length && <h2> Loading... </h2> }
            { users.map( u => <p key={u._id}> {u.firstName} ({u.lastName}) {u.email} </p> )}
        </div>
    )

}

export default Users