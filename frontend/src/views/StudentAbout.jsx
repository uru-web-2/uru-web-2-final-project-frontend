
import GridTable from "../components/GridTable";

const StudentAbout = () => { 

  const users = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", role: "User" },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "Editor" },
    { id: 4, name: "David Lee", email: "david@example.com", role: "Admin" },
    { id: 5, name: "Emma Watson", email: "emma@example.com", role: "User" },
    { id: 6, name: "Frank Miller", email: "frank@example.com", role: "User" },
    { id: 7, name: "Grace Kelly", email: "grace@example.com", role: "Editor" },
  ];
  const columns = ["name", "email", "role"];
  const actions = [
    {
      label: "Details",
      color: "primary",
      onClick: (user) => console.log("Detalles de:", user),
    },
    {
      label: "Delete",
      color: "error",
      onClick: (user) => console.log("Eliminar usuario:", user),
    },
  ];

  return <GridTable columns={columns} data={users} actions={actions} />;
};
  
  export default StudentAbout;
  