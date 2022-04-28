import { styled } from "@mui/system";

const RoundedImage = styled<any>("img")(({ theme }: any) => ({
  borderRadius: theme.spacing(3),
}));

export default RoundedImage;
