import React from "react";
import {
  Box,
  ListItemIcon,
  ListItemText,
  Paper,
  Menu,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";
import AgendaTypeIcon from "../assets/AgendaTypeIcon";
import MenuIcon from "../assets/MenuIcon";
import AddIcon from "../assets/AddIcon";

const MovementHistory = () => {
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
    <Box p={3} borderRadius={2} bgcolor={"grey"}>
      <ul style={{ listStyle: "none", padding: "0px" }}>
        <li>
          <Paper sx={{ marginBottom: "10px" }}>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              px={2}
              gap={1}
              flexDirection={{ xs: "column", sm: "row", lg: "row" }}
            >
              {/* Fecha */}
              <Box display={"flex"} alignItems={"center"} gap={2}>
                <AgendaTypeIcon />
                <Typography variant="body1" color="initial">
                  Date
                </Typography>
              </Box>
              {/* Contenido */}

              <Box>
                <Typography variant="body1" color="initial">
                  Nombre de la tarea
                </Typography>
              </Box>
              {/* Menu */}
              <Box>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <MenuIcon />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <AgendaTypeIcon />
                    </ListItemIcon>
                    <ListItemText>Content</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
              </Box>
            </Box>
          </Paper>
        </li>
      </ul>

      <Box display={"flex"} justifyContent={"center"}>
        <Button
          startIcon={<AddIcon size={"20px"} color={"white"} />}
          sx={{
            color: "white",
            "&.Mui-selected": {
              color: "white",
            },
          }}
        >
          <Typography variant="body2">Agregar Tarea</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default MovementHistory;
