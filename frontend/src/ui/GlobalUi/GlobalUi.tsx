import { useTypedDispatch, useTypedSelector } from "@/store/hooks";
import { closeErrorModal } from "@/store/slices/settingsSlice";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Loader } from "@/ui/Loader";

export const GlobalUi = () => {
  const dispatch = useTypedDispatch();
  const { isGlobalLoading, isErrorModalOpen, errorMessage } = useTypedSelector(
    (state) => state.setting,
  );

  return (
    <>
      {isGlobalLoading && (
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            zIndex: 2000,
            backgroundColor: "rgba(0,0,0,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loader />
        </Box>
      )}

      <Modal
        open={isErrorModalOpen}
        onClose={() => dispatch(closeErrorModal())}
      >
        <Box
          sx={{
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 3,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography variant="h6" mb={2}>
            Ошибка
          </Typography>

          <Typography mb={3}>
            {errorMessage || "Something went wrong"}
          </Typography>

          <Button
            variant="contained"
            onClick={() => dispatch(closeErrorModal())}
          >
            Закрыть
          </Button>
        </Box>
      </Modal>
    </>
  );
};
