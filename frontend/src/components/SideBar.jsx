import { useNavigate } from 'react-router-dom';

const SideBar = ({ open, handleDrawerToggle, drawerStyles, menuItems, MenuItem, listItemTextStyles, CustomDrawer }) => {
  const navigate = useNavigate();
  console.log('menuItems:', menuItems);
  

  // Función para manejar el clic en un ítem del menú
  const handleClickItem = (path) => {
    console.log('Navegando a:', path);
    navigate(path); // Redirige a la ruta especificada
  };

  return (
    <CustomDrawer open={open} onClose={handleDrawerToggle} sx={drawerStyles} >
      {menuItems.map((item) => (
        <MenuItem
          key={item.text}
          text={item.text}
          icon={item.icon}
          sx={listItemTextStyles}
          children={item.children}
          path={item.path}
          onClickItem={handleClickItem} // Pasa la función handleClickItem como prop
        />
      ))}
    </CustomDrawer>
  );
};

export default SideBar;