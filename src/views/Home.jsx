import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";
import { Button } from "@mui/material";
import getUsers from "../services/getUsers";
import Spinner from "../components/Spinner";
import image from "../assets/images/users.png";
import styles from "../sass/Home.module.sass";
import Swal from "sweetalert2";

const Home = () => {
  const { users, loading, setLoading, setUsers } = useUsers();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
  }, [users, setLoading]);

  const handleClick = () => {
    setLoading(true);
    navigate("/usuarios/crear");
  };

  const fetchUsers = async () => {
    setLoading(true);

    Swal.fire({
      title: "¿Estás seguro?",
      text: `Esta acción cargará usuarios ficticios de una API externa`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#5e5b9d",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cargar",
      cancelButtonText: "Cancelar"
    }).then(result => {
      if (result.isConfirmed) {
        getUsers().then(data => {
          setUsers(data);
          setLoading(false);
          Swal.fire("Cargados", "Los usuarios han sido cargados", "success");
        });
      }
    });

    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <main className={styles.main}>
          <div className={styles.banner}>
            <img src={image} alt="Users" />
          </div>
          <div className={styles.welcome}>
            <div>
              <h1>Bienvenido al panel de administración de usuarios </h1>
              <div className={styles.totalUsers}>
                <p>
                  <span>{users.length}</span>
                  <br /> usuarios registrados
                </p>
              </div>
              <Button className={styles.button} onClick={handleClick}>
                Crear usuario
              </Button>
            </div>
            <span className={styles.testdata} onClick={fetchUsers}>
              Llenar tabla con 30 datos de prueba
            </span>
          </div>
        </main>
      )}
    </>
  );
};
export default Home;
