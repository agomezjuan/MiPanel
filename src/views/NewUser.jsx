import { useState } from "react";
import { Button, FormControl, TextField, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useUsers } from "../hooks/useUsers";
import { v4 as uuidv4 } from "uuid";
import styles from "../sass/NewUser.module.sass";
import banner from "../assets/images/female.png";
import validator from "validator";
import Swal from "sweetalert2";

/**
 * Component to create a new user
 *
 * @returns {JSX.Element}
 */
const NewUser = () => {
  // Get the users from the global context
  const { users, setLoading, setUsers } = useUsers();
  // States to control errors in the form
  const [userEmailError, setUserEmailError] = useState(false);
  const [userPasswordError, setUserPasswordError] = useState(false);
  // Navigate to another route after the user is created
  const navigate = useNavigate();

  // useForm hook to control the form
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  // Function to create a new user
  const onSubmit = data => {
    setLoading(true);
    setUserEmailError(false);
    setUserPasswordError(false);

    // Validate the email
    if (!validator.isEmail(data.email)) {
      setUserEmailError(true);
    }

    // Validate the password
    if (data.password.length < 6 || data.password.length > 12) {
      setUserPasswordError(true);
    }

    // If there are no errors, create the user
    if (validator.isEmail(data.email)) {
      if (data.password.length >= 6 && data.password.length <= 12) {
        const newUser = {
          id: uuidv4(),
          email: data.email,
          password: data.password,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        setUsers([newUser, ...users]);

        // Show a success message
        Swal.fire("Usuario creado", "El usuario ha sido creado", "success");

        // Navigate to the users list
        navigate("/usuarios");

        setLoading(false);
      }
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.banner}>
          <img src={banner} alt="New user" />
        </div>
        <div className={styles.form}>
          <h1>Crear usuario</h1>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { my: 2, width: "350px", display: "flex", flexDirection: "column" }
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="outlined-basic"
                    label="Correo"
                    color="secondary"
                    variant="outlined"
                    required
                    {...field}
                    error={userEmailError}
                    helperText={userEmailError ? "Ingrese un correo válido" : ""}
                  />
                )}
              />
            </FormControl>
            <FormControl>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="outlined-basic"
                    label="Contraseña"
                    color="secondary"
                    variant="outlined"
                    required
                    {...field}
                    error={userPasswordError}
                    helperText={
                      userPasswordError ? "La contraseña debe tener entre 6 y 12 caracteres" : ""
                    }
                  />
                )}
              />
            </FormControl>
            <div className={styles.input}>
              <FormControl fullWidth>
                <Button type="submit" className={styles.button}>
                  Crear usuario
                </Button>
              </FormControl>
              <FormControl fullWidth>
                <Link to="/" className={styles.link}>
                  Cancelar
                </Link>
              </FormControl>
            </div>
          </Box>
        </div>
      </main>
    </div>
  );
};

export default NewUser;
