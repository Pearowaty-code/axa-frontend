import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import type { InsuranceFormInputs } from "../types/types";

const statuses = ["OPEN", "PROCESSING", "CLOSED"];

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: InsuranceFormInputs) => void;
  defaultValues?: InsuranceFormInputs;
  isLoading?: boolean;
}

const InsuranceModal: React.FC<Props> = ({
  open,
  onClose,
  onSubmit,
  defaultValues,
  isLoading = false,
}) => {
  const { control, handleSubmit, reset } = useForm<InsuranceFormInputs>({
    defaultValues: defaultValues || {
      clientName: "",
      policyNumber: "",
      description: "",
      status: "OPEN",
    },
  });

  useEffect(() => {
    if (!open) return;
    reset(
      defaultValues || {
        clientName: "",
        policyNumber: "",
        description: "",
        status: "OPEN",
      }
    );
  }, [open, defaultValues, reset]);

  const handleFormSubmit = (data: InsuranceFormInputs) => {
    onSubmit(data);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {defaultValues ? "Edit Insurance" : "New Insurance"}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Controller
            name="clientName"
            control={control}
            rules={{ required: "Client Name is required" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Client Name"
                fullWidth
                margin="normal"
                required
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="policyNumber"
            control={control}
            rules={{ required: "Policy Number is required" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Policy Number"
                fullWidth
                margin="normal"
                required
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            rules={{ required: "Description is required" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Description"
                fullWidth
                multiline
                rows={3}
                margin="normal"
                required
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Status"
                select
                fullWidth
                margin="normal"
              >
                {statuses.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          <Box mt={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Submit"}
            </Button>
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InsuranceModal;
