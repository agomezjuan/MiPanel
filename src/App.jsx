import { Route, Routes } from "react-router-dom";
import { Layout } from "./components";
import UsersProvider from "./contexts/UsersContext";
import styles from "./sass/App.module.sass";
import { Home, EditUser, NewUser, Table, ViewUser, Contact, NotFound } from "./views";

function App() {
  return (
    <div className={styles.App}>
      <UsersProvider>
        <Routes>
          <Route exact path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="usuarios" element={<Table />} />
            <Route path="usuarios/crear" element={<NewUser />} />
            <Route path="usuarios/:id/" element={<ViewUser />} />
            <Route path="usuarios/:id/editar" element={<EditUser />} />
            <Route path="usuarios/*" element={<NotFound />} />
            <Route path="contacto" element={<Contact />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UsersProvider>
    </div>
  );
}

export default App;
