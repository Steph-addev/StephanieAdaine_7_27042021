import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

export default function CustomizedSnackbars() {
  const [open, setOpen] = React.useState(false);
  const [transition, setTransition] = React.useState(undefined);

  const handleClick = (Transition) => {
    setTransition(() => Transition);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Button onClick={handleClick(TransitionUp)}>Up</Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} TransitionComponent={transition} key={transition ? transition.name : ""}>
        <Alert severity="error">Le message ne peut pas être vide!</Alert>
      </Snackbar>
    </Stack>
  );
}
