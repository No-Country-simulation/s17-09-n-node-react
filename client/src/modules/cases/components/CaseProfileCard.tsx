import React from "react";
import {
  Typography,
  Paper,
  Box,
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";

import {
  InitialStateIcon,
  ProofStateIcon,
  VeredictStateIcon,
  ArchiveIcon,
} from "../assets";

interface CaseProfileProps {
  caseState: string;
  setCaseState: React.Dispatch<React.SetStateAction<string>>;
  caseName: string;
  jury: string;
  caseNumber: string;
  applicant: string;
  respondent: string;
  caseType: string;
}

const CaseProfileCard: React.FC<CaseProfileProps> = ({
  caseState,
  setCaseState,
  caseName,
  jury,
  caseNumber,
  applicant,
  respondent,
  caseType,
}) => {
  // Menu states
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuItemClick = (newState: string) => {
    setCaseState(newState);
    handleClose();
  };

  const renderIconForState = () => {
    switch (caseState) {
      case "initial":
        return <InitialStateIcon size={"30px"} color={"white"} />;
      case "proof":
        return <ProofStateIcon size={"30px"} color={"white"} />;
      case "veredict":
        return <VeredictStateIcon size={"30px"} color={"white"} />;
      case "archive":
        return <ArchiveIcon size={"30px"} color={"white"} />;
      default:
        return <InitialStateIcon size={"30px"} color={"white"} />;
    }
  };

  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Paper
        sx={{
          width: "400px",
          padding: "10px",
          backgroundColor: "#424769",
        }}
        elevation={5}
      >
        <Box display={"flex"} flexDirection={"column"}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            p={2}
          >
            <Box>
              <Typography variant="body1" color="white">
                {caseName}
              </Typography>
            </Box>

            <Box>
              <Box>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  {renderIconForState()}
                </Button>
              </Box>
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
                <MenuItem onClick={() => handleMenuItemClick("initial")}>
                  <ListItemIcon>
                    <InitialStateIcon size={"25px"} color={"white"} />
                  </ListItemIcon>
                  <ListItemText>Inicio</ListItemText>
                </MenuItem>
                <Divider
                  sx={{
                    backgroundColor: "white",
                  }}
                />
                <MenuItem onClick={() => handleMenuItemClick("proof")}>
                  <ListItemIcon>
                    <ProofStateIcon size={"25px"} color={"white"} />
                  </ListItemIcon>
                  <ListItemText>Prueba</ListItemText>
                </MenuItem>
                <Divider
                  sx={{
                    backgroundColor: "white",
                  }}
                />
                <MenuItem onClick={() => handleMenuItemClick("veredict")}>
                  <ListItemIcon>
                    <VeredictStateIcon size={"25px"} color={"white"} />
                  </ListItemIcon>
                  <ListItemText>Sentencia</ListItemText>
                </MenuItem>
                <Divider
                  sx={{
                    backgroundColor: "white",
                  }}
                />
                <MenuItem onClick={() => handleMenuItemClick("archive")}>
                  <ListItemIcon>
                    <ArchiveIcon size={"25px"} color={"white"} />
                  </ListItemIcon>
                  <ListItemText>Archivo</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          <Divider
            sx={{
              backgroundColor: "white",
            }}
          />
          <Box display={"flex"} flexDirection={"column"} p={2}>
            <Typography variant="body2" color="white">
              Juzgado: {jury}
            </Typography>
            <Typography variant="body2" color="white">
              Numero de expediente: {caseNumber}
            </Typography>
            <Typography variant="body2" color="white">
              Demandante: {applicant}
            </Typography>
            <Typography variant="body2" color="white">
              Demandado: {respondent}
            </Typography>
            <Typography variant="body2" color="white">
              Tipo de caso: {caseType}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default CaseProfileCard;
