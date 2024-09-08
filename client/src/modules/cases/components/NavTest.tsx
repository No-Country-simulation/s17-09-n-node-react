import { Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepOrange } from "@mui/material/colors";

const NavTest = () => {
  return (
    <Box maxWidth={"full"} display={"flex"} justifyContent={"end"} p={3}>
      <Stack direction="row" spacing={2}>
        <Avatar
          sx={{ bgcolor: deepOrange[500] }}
          alt="Remy Sharp"
          src="/broken-image.jpg"
        >
          B
        </Avatar>
      </Stack>
    </Box>
  );
};

export default NavTest;
