import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";
import { Button, Tooltip, FormControl, TextField, Box } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import validator from "validator";
import Spinner from "../components/Spinner";
import Swal from "sweetalert2";
import DoneIcon from "@mui/icons-material/Done";
import DeleteForever from "@mui/icons-material/DeleteForever";
import BackspaceIcon from "@mui/icons-material/Backspace";
import _ from "lodash";
import moment from "moment/moment";
import banner from "../assets/images/male.png";
import { avatars } from "../assets/avatars";
import styles from "../sass/EditUser.module.sass";

const EditUser = () => {
  // Get the users from the global context
  const { users, loading, setLoading, setUsers } = useUsers();
  // States to control errors in the form
  const [userEmailError, setUserEmailError] = useState(false);
  const [userPasswordError, setUserPasswordError] = useState(false);

  // Get the id from the URL
  const { id } = useParams();
  const navigate = useNavigate();

  const user = users.find(user => user.id === id);
  console.log("user", user);

  if (user === undefined) {
    navigate("/not-found");
  }

  const { email, password, createdAt, updatedAt } = user;

  // useForm hook to control the form
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email,
      password
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

    // If there are no errors, update the user
    if (validator.isEmail(data.email)) {
      if (data.password.length >= 6 && data.password.length <= 12) {
        const newUser = {
          email: data.email,
          password: data.password,
          createdAt,
          updatedAt: new Date()
        };

        const newArr = _.map(users, function (user) {
          return user.id === id ? { id, ...newUser } : user;
        });

        setUsers(newArr);

        // Show a success message
        Swal.fire("Usuario actualizado", "El usuario ha sido actualizado correctamente", "success");

        // Navigate to the users list
        navigate("/usuarios");

        setLoading(false);
      }
    }
  };

  // Function to delete the user
  const deleteUser = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Estás a punto de eliminar al usuario "${email}". No podrás revertir esta acción`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5e5b9d",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then(result => {
      if (result.isConfirmed) {
        const filteredUsers = users.filter(user => user.id !== id);
        setUsers(filteredUsers);
        Swal.fire("Eliminado", "El usuario ha sido eliminado", "success");
        navigate("/usuarios");
      }
    });
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <main className={styles.main}>
          <div className={styles.banner}>
            <img src={banner} alt="New user" />
          </div>
          <div className={styles.userData}>
            <h1>Editar usuario</h1>
            <div className={styles.avatar}>
              <img src={_.sample(avatars)} alt="" />
            </div>
            <div className={styles.userData_details}>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { my: 1, width: "300px" }
                }}
                noValidate
                onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                  <Controller
                    name="email"
                    control={control}
                    style={{ margin: "8px 0", width: "100%" }}
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
                          userPasswordError
                            ? "La contraseña debe tener entre 6 y 12 caracteres"
                            : ""
                        }
                      />
                    )}
                  />
                </FormControl>

                <h5>Fecha de creación:</h5>
                <span>{moment(createdAt).format("DD/MM/YY hh:mm A")}</span>
                <h5>Última actualización:</h5>
                <span>{moment(updatedAt).format("DD/MM/YY hh:mm A")}</span>

                <div className={styles.userData_actions}>
                  <Tooltip title="Confirmar cambios" arrow>
                    <Button type="submit" className={styles.button}>
                      <DoneIcon color="secondary" />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Cancelar" arrow>
                    <Button
                      onClick={() => navigate("/usuarios")}
                      className={styles.button}
                      style={{ backgroundColor: "#b5b4c7" }}>
                      <BackspaceIcon color="secondary" />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Eliminar usuario" arrow>
                    <Button
                      className={styles.delete}
                      onClick={deleteUser}
                      style={{ backgroundColor: "#FF000033" }}>
                      <DeleteForever color="error" />
                    </Button>
                  </Tooltip>
                </div>
              </Box>
            </div>
          </div>
        </main>
      )}
    </>
  );
};
export default EditUser;
