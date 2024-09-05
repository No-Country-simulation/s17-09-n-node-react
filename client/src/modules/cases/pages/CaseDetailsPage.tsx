import { Box } from "@mui/material";
import MovementHistory from "../components/MovementHistory";
import NavTest from "../components/NavTest";
const CaseDetailsPage: React.FC = () => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={3}
      bgcolor={"#2D3250"}
      width={"100%"}
      height={"100vh"}
    >
      <NavTest />
      <MovementHistory />
    </Box>
  );
};

export default CaseDetailsPage;
