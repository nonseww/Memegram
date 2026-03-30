import { StyledCard } from "@/ui/StyledCard";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import type { UpsertPost as UpsertPostInterface } from "@/types/upsertPost";
import { MultilineTextField } from "@/ui/MultilineTextField";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Typography from "@mui/material/Typography";
import { Overlay } from "@/ui/Overlay";
import { useRef } from "react";

interface UpsertPostProps {
  data?: UpsertPostInterface;
}

const MAXLENGTH = 3000;

export const UpsertPost = ({ data }: UpsertPostProps) => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Box sx={{ width: { xs: "85vw", sm: "500px" }, mx: "auto" }}>
      <StyledCard>
        <CardContent
          sx={{
            px: { xs: "15px", sm: "25px" },
            pt: 3,
            "&:last-child": { pb: 1 },
            gap: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TextField
            label="Заголовок"
            fullWidth
            sx={{ boxShadow: 2 }}
            defaultValue={data?.title || ""}
          />

          <Box
            sx={{
              position: "relative",
              width: "100%",
              mx: "auto",
              cursor: "pointer",
              overflow: "hidden",
            }}
            onClick={() => inputRef.current?.click()}
          >
            <input type="file" hidden ref={inputRef} accept="image/*" />
            {data?.meme ? (
              <>
                <Box
                  component="img"
                  src={data?.meme}
                  sx={{ width: "100%", objectFit: "cover", boxShadow: 4 }}
                />
                <Overlay>
                  <PhotoCamera />
                  <Typography>Загрузить мем</Typography>
                </Overlay>
              </>
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: "350px",
                  bgcolor: "grey.300",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  mx: "auto",
                  cursor: "pointer",
                  boxShadow: 4,
                  "&:hover": {
                    bgcolor: "grey.400",
                  },
                }}
              >
                <PhotoCamera />
                <Typography>Загрузить мем</Typography>
              </Box>
            )}
          </Box>

          <MultilineTextField
            maxLength={MAXLENGTH}
            initValue={data?.description}
          />
        </CardContent>

        <CardActions
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            mb: 2,
            mr: 1,
            gap: 2,
          }}
        >
          <Button
            size="large"
            variant="outlined"
            color="primary"
            onClick={() => navigate(-1)}
          >
            Отмена
          </Button>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={() => {}}
          >
            Сохранить
          </Button>
        </CardActions>
      </StyledCard>
    </Box>
  );
};
