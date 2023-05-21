import { useEffect, useState } from "react"
import IUsersModel from "../../Models/IUsersModel";
import usersService from "../../Services/UsersService";

function Users():JSX.Element{

    const [ users, setUsers ] = useState<IUsersModel[]>( [] );    

    useEffect( () => {
        // setTimeout(() => {
            usersService.getAllUsers()
                .then( data => setUsers( data ) )
                .catch( err => alert(err) )
        // }, 3 * 1000 );
    },[]);

    return (
        <div>
            { !users.length && <h2> Loading... </h2> }
            { users.map( u => <p key={u._id}> {u.name } ({u.age}) </p> )}
        </div>
    )
}

export default Users