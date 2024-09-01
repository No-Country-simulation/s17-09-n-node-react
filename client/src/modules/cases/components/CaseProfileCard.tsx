import { Typography, CardContent, Card, Box } from "@mui/material";

const CaseProfileCard: React.FC = () => {
  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Card sx={{ width: { xs: "300px", sm: "500px" } }}>
        <CardContent>
          <Box display={"flex"} flexDirection={"column"}>
            <Box border={"solid"} display={"flex"} justifyContent={"end"}>
              <Typography variant="body2">icono</Typography>
            </Box>
            <Box display={"flex"} flexDirection={"column"} px={2}>
              <Typography variant="h6">Nombre del caso</Typography>
              <Typography variant="subtitle2">Juzgado: </Typography>
              <Typography variant="subtitle2">Numero de Causa:</Typography>
              <Typography variant="body2">Demandante:</Typography>
              <Typography variant="body2">Demandado:</Typography>
              <Typography variant="body2">Tipo de proceso:</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CaseProfileCard;
