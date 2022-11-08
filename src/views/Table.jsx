import { Suspense } from "react";
import { useUsers } from "../hooks/useUsers";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Swal from "sweetalert2";
import moment from "moment";
import styles from "../sass/Table.module.sass";
import Spinner from "../components/Spinner";

const Table = () => {
  const { users, setUsers } = useUsers();
  const navigate = useNavigate();

  // Function to navigate to the details of a user
  const handleView = (e, row) => {
    e.stopPropagation();
    navigate(`/usuarios/${row.id}`);
  };

  // Function to delete a user
  const handleDelete = (e, row) => {
    e.stopPropagation();
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Estás a punto de eliminar al usuario "${row.email}". No podrás revertir esta acción`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5e5b9d",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then(result => {
      if (result.isConfirmed) {
        const filteredUsers = users.filter(user => user.id !== row.id);
        setUsers(filteredUsers);
        Swal.fire("Eliminado", "El usuario ha sido eliminado", "success");
      }
    });
  };

  // Function to update the user data
  const handleUpdate = (e, row) => {
    e.stopPropagation();
    console.log(row);
    navigate(`/usuarios/${row.id}/editar`);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 200, hide: true, sortable: false },
    { field: "email", headerName: "Correo", width: 277 },
    { field: "password", headerName: "Contraseña", width: 100 },
    {
      field: "createdAt",
      headerName: "Fecha de creación",
      width: 170,
      valueFormatter: params => moment(params?.value).format("DD/MM/YYYY hh:mm A")
    },
    {
      field: "updatedAt",
      headerName: "Fecha de actualización",
      width: 170,
      valueFormatter: params => moment(params?.value).format("DD/MM/YYYY hh:mm A")
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 200,
      sortable: false,
      filterable: false,
      renderCell: params => {
        return (
          <>
            <Tooltip title="Ver usuario" arrow>
              <Button onClick={e => handleView(e, params.row)}>
                <VisibilityIcon />
              </Button>
            </Tooltip>
            <Tooltip title="Editar" arrow>
              <Button onClick={e => handleUpdate(e, params.row)}>
                <EditIcon color="secondary" />
              </Button>
            </Tooltip>
            <Tooltip title="Eliminar" arrow>
              <Button onClick={e => handleDelete(e, params.row)}>
                <DeleteForeverIcon sx={{ color: "red" }} />
              </Button>
            </Tooltip>
          </>
        );
      }
    }
  ];

  const NoUsers = () => {
    return (
      <>
        <h4>No hay ningún usuario</h4>
        <p>Registra un usuario para poder verlo en la lista</p>
        <Button variant="contained" color="primary" onClick={() => navigate("/usuarios/crear")}>
          Crear usuario
        </Button>
      </>
    );
  };

  return (
    <main className={styles.main}>
      <Suspense fallback={<Spinner />}>
        <h1>Lista de usuarios registrados</h1>
        {users.length > 0 ? (
          <div style={{ height: 500, width: "100%", maxWidth: "920px" }}>
            <DataGrid
              rows={users}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              sx={{
                borderColor: "primary.light",
                "& .MuiDataGrid-cell:hover": {
                  color: "primary.main"
                }
              }}
            />
          </div>
        ) : (
          <NoUsers />
        )}
      </Suspense>
    </main>
  );
};
export default Table;
