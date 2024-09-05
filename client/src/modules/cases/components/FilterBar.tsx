import { Box } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "../assets/SearchIcon";
import AgendaTypeIcon from "../assets/AgendaTypeIcon";
import ProceduralTypeIcon from "../assets/ProceduralTypeIcon";
import AllTypesIcon from "../assets/AllTypesIcon";
import CreationTypeIcon from "../assets/CreationTypeIcon";
import { useEffect } from "react";
const FilterBar = ({
  value,
  setValue,
  searchText,
  initialMovements,
  setMovements,
  setSearchText,
}: any) => {
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    console.log(value);

    if (newValue === "agenda") {
      // Filtrar por tipo "agenda"
      const movementsFilterdByAgenda = initialMovements.filter(
        (element: any) => element.type === "agenda"
      );
      setMovements(movementsFilterdByAgenda);
    } else if (newValue === "procedural") {
      // Filtrar por tipo "procedural"
      const movementsFilterdByProcedural = initialMovements.filter(
        (element: any) => element.type === "procedural"
      );
      setMovements(movementsFilterdByProcedural);
    } else {
      // Mostrar todos los movimientos si el valor es "all"
      setMovements(initialMovements);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    let filteredMovements = initialMovements;

    if (value !== "all") {
      filteredMovements = filteredMovements.filter(
        (movement: any) => movement.type === value
      );
    }

    if (searchText) {
      filteredMovements = filteredMovements.filter((movement: any) =>
        movement.content.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setMovements(filteredMovements);
  }, [value, searchText]);

  return (
    <Box
      display={"flex"}
      gap={2}
      flexDirection={{ xs: "column", sm: "row", lg: "row" }}
      justifyContent={"space-between"}
      alignItems={"center"}
      px={10}
    >
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: { sm: "50vw", xs: "100%" },
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          inputProps={{ "aria-label": "Search" }}
          value={searchText}
          onChange={handleSearchChange}
        />
        <IconButton type="button" sx={{ p: "5px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>

      <Box
        display={"flex"}
        justifyContent={"end"}
        sx={{ width: { sm: "50vw", xs: "100%" } }}
        bgcolor={"none"}
      >
        <BottomNavigation
          sx={{ width: 300, background: "none", color: "white" }}
          value={value}
          onChange={handleChange}
        >
          <BottomNavigationAction
            label="Agenda"
            value="agenda"
            icon={<AgendaTypeIcon />}
            sx={{
              color: "white",
              "&.Mui-selected": {
                color: "white",
                borderRadius: "200px",
              },
            }}
            disableRipple
          />
          <BottomNavigationAction
            label="Procesal"
            value="procedural"
            icon={<ProceduralTypeIcon color={"white"} />}
            sx={{
              color: "white",
              "&.Mui-selected": {
                color: "white",
              },
            }}
            disableRipple
          />
          <BottomNavigationAction
            label="Creación"
            value="creation"
            icon={<CreationTypeIcon />}
            sx={{
              color: "white",
              "&.Mui-selected": {
                color: "white",
              },
            }}
            disableRipple
          />
          <BottomNavigationAction
            label="Todos"
            value="all"
            icon={<AllTypesIcon />}
            sx={{
              color: "white",
              "&.Mui-selected": {
                color: "white",
              },
            }}
            disableRipple
          />
        </BottomNavigation>
      </Box>
    </Box>
  );
};

export default FilterBar;
