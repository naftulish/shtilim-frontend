import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Grid, Box } from "@mui/material";
import userServise from "../../../Services/UserService";
import IUserModel from "../../../Models/IUserModel";

const AddUser = () => {
  
  const { register, handleSubmit } = useForm<IUserModel>();

  const save = (p:IUserModel) => {
    userServise.addUser( p ).then( d => console.log( d ) )
}

  return (
    <div>
      <h1>Add User</h1>
      <form onSubmit={handleSubmit(save)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="First name"
              {...register("firstName")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Last name"
              {...register("lastName")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              {...register("email")}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" type="submit">
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddUser;

// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { TextField, Button, Grid, Box } from "@mui/material";
// import userServise from "../../../Services/UserService";
// import IUserModel from "../../../Models/IUserModel";

// const AddUser = () => {
  
//   const { register, handleSubmit } = useForm<IUserModel>();

//   const save = (p:IUserModel) => {
//     userServise.addUser( p ).then( d => console.log( d ) )
// }

//   return (
//     <div>
//       <h1>Add User</h1>
//       <form onSubmit={handleSubmit(save)}>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <TextField
//               label="First name"
//               {...register("firstName")}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Last name"
//               {...register("lastName")}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Email"
//               {...register("email")}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Button variant="contained" type="submit">
//               Save
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
//       <div style={{ marginTop: 20 }}>
//         <h2>Login</h2>
//         <Login />
//       </div>
//     </div>
//   );
// };

// export default AddUser;
