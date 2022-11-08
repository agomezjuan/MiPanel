import { useNavigate, useParams } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";
import { Button, Tooltip } from "@mui/material";
import Spinner from "../components/Spinner";
import Swal from "sweetalert2";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForever from "@mui/icons-material/DeleteForever";
import _ from "lodash";
import moment from "moment/moment";
import styles from "../sass/ViewUser.module.sass";
import banner from "../assets/images/male.png";
import { avatars } from "../assets/avatars";

const ViewUser = () => {
  // Get the users from the global context
  const { users, loading, setLoading, setUsers } = useUsers();
  const { id } = useParams();
  const navigate = useNavigate();

  // Get the user information
  const user = users.find(user => user.id === id);
  const { email, password, createdAt, updatedAt } = user;

  if (user.email) {
    setLoading(false);
  } else {
    navigate("/not-found");
  }

  // Function to redirect to the edit user page
  const handleEditUser = () => {
    navigate(`/usuarios/${id}/editar`);
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
    <main className={styles.main}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className={styles.banner}>
            <img src={banner} alt="New user" />
          </div>
          <div className={styles.userData}>
            <h1>Editar usuario</h1>
            <div className={styles.avatar}>
              <img src={_.sample(avatars)} alt="" />
            </div>
            <div className={styles.userData_details}>
              <h5>Correo:</h5>
              <span>{email}</span>
              <h5>Contraseña:</h5>
              <span>{password}</span>
              <h5>Fecha de creación:</h5>
              <span>{moment(createdAt).format("DD/MM/YY hh:mm A")}</span>
              <h5>Última actualización:</h5>
              <span>{moment(updatedAt).format("DD/MM/YY hh:mm A")}</span>
            </div>
            <div className={styles.userData_actions}>
              <Tooltip title="Editar usuario" arrow>
                <Button className={styles.button} onClick={handleEditUser}>
                  <EditIcon color="secondary" />
                </Button>
              </Tooltip>
              <Tooltip title="Eliminar usuario" arrow>
                <Button className={styles.delete} onClick={deleteUser}>
                  <DeleteForever color="error" />
                </Button>
              </Tooltip>
            </div>
          </div>
        </>
      )}
    </main>
  );
};
export default ViewUser;
