import { Box } from "@mui/material";
import CaseProfileCard from "../components/CaseProfileCard";
import FilterBar from "../components/FilterBar";
import MovementHistory from "../components/MovementHistory";
const CaseDetailsPage: React.FC = () => {
  return (
    <Box display={"flex"} flexDirection={"column"} gap={2} bgcolor={"#2D3250"}>
      <Box border={"solid"} maxWidth={"full"}>
        <h1>top</h1>
      </Box>
      {/* Details Card */}
      <CaseProfileCard />
      <FilterBar />
      <MovementHistory />
    </Box>
  );
};

export default CaseDetailsPage;
