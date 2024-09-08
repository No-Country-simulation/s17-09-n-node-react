import React from "react";

import {
  AgendaTypeIcon,
  ProceduralTypeIcon,
  DeleteIcon,
  DoneIcon,
  EditIcon,
  MenuIcon,
} from "../assets";

import {
  Box,
  Paper,
  Typography,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

const MovementCard = ({ movement }: any) => {
  // Menu states
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <li>
        <Paper
          sx={{
            marginBottom: "10px",
            backgroundColor: movement.type === "agenda" ? "#F6B17A" : "#7077A1",
            transition: "transform 0.1s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "scale(1.03)", // Efecto de escala al pasar el mouse
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)", // Sombra más intensa
            },
          }}
          elevation={5}
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            p={1}
            gap={1}
            flexDirection={{ xs: "column", sm: "row", lg: "row" }}
          >
            {/* Fecha */}
            <Box display={"flex"} alignItems={"center"} gap={2} px={1}>
              {movement.type === "agenda" ? (
                <AgendaTypeIcon size={"25px"} />
              ) : (
                <ProceduralTypeIcon size={"25"} color={"white"} />
              )}
              <Typography
                variant="body1"
                color={movement.type === "agenda" ? "initial" : "white"}
              >
                {movement.date}
              </Typography>
            </Box>

            {/* Contenido */}
            <Box display={"flex"} justifyContent={"center"}>
              <Button>
                <Typography
                  variant="body1"
                  color={movement.type === "agenda" ? "initial" : "white"}
                  sx={{ textTransform: "none" }}
                >
                  {movement.content}
                </Typography>
              </Button>
            </Box>

            {/* Menues */}
            <Box>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MenuIcon
                  size={"24px"}
                  color={movement.type === "agenda" ? "initial" : "white"}
                />
              </Button>
              {movement.type === "agenda" ? (
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                  sx={{
                    "& .MuiPaper-root": {
                      backgroundColor: "#7077A1",
                      color: "white",
                      paddingX: "10px",
                    },
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <DoneIcon size={"25px"} color={"white"} />
                    </ListItemIcon>
                    <ListItemText>Hecho</ListItemText>
                  </MenuItem>
                  <Divider
                    sx={{
                      backgroundColor: "white",
                    }}
                  />
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <EditIcon size={"25px"} color={"white"} />
                    </ListItemIcon>
                    <ListItemText>Editar</ListItemText>
                  </MenuItem>
                  <Divider
                    sx={{
                      backgroundColor: "white", // Cambia a tu color preferido
                    }}
                  />
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <DeleteIcon size={"25px"} color={"white"} />
                    </ListItemIcon>
                    <ListItemText>Eliminar</ListItemText>
                  </MenuItem>
                </Menu>
              ) : (
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                  sx={{
                    "& .MuiPaper-root": {
                      backgroundColor: "#7077A1", // Cambia a tu color preferido
                      color: "white",
                      paddingX: "10px",
                    },
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <EditIcon size={"25px"} color={"white"} />
                    </ListItemIcon>
                    <ListItemText>Editar</ListItemText>
                  </MenuItem>
                  <Divider
                    sx={{
                      backgroundColor: "white", // Cambia a tu color preferido
                    }}
                  />
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <DeleteIcon size={"25px"} color={"white"} />
                    </ListItemIcon>
                    <ListItemText>Eliminar</ListItemText>
                  </MenuItem>
                </Menu>
              )}
            </Box>
          </Box>
        </Paper>
      </li>
    </>
  );
};

export default MovementCard;
//  isCompleted ? "#A5D6A7" : "#F6B17A"
