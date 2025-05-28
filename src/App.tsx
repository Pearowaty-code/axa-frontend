import React, { useState } from "react";
import { Container, Typography, Box, Button, Snackbar } from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import InsuranceList from "./components/InsuranceList";
import InsuranceModal from "./components/InsuranceModal";
import {
  fetchInsurances,
  addInsurance,
  deleteInsurance,
  updateInsurance,
} from "./api/insurance";
import type { Insurance, InsuranceFormInputs } from "./types/types";

const App: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingInsurance, setEditingInsurance] = useState<
    Insurance | undefined
  >(undefined);

  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
    open: false,
    message: "",
  });

  const queryClient = useQueryClient();

  const {
    data: insurances = [],
    isLoading,
    isError,
  } = useQuery<Insurance[]>(["insurances"], fetchInsurances);

  const addMutation = useMutation(addInsurance, {
    onSuccess: () => {
      queryClient.invalidateQueries(["insurances"]);
      setSnackbar({ open: true, message: "Insurance submitted" });
      handleCloseModal();
    },
    onError: () => {
      setSnackbar({ open: true, message: "Failed to submit insurance" });
    },
  });

  const deleteMutation = useMutation(deleteInsurance, {
    onSuccess: () => {
      queryClient.invalidateQueries(["insurances"]);
      setSnackbar({ open: true, message: "Insurance deleted" });
    },
    onError: () => {
      setSnackbar({ open: true, message: "Failed to delete insurance" });
    },
  });

  const updateMutation = useMutation(updateInsurance, {
    onSuccess: () => {
      queryClient.invalidateQueries(["insurances"]);
      setSnackbar({ open: true, message: "Insurance updated" });
      handleCloseModal();
    },
    onError: () => {
      setSnackbar({ open: true, message: "Failed to update insurance" });
    },
  });

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingInsurance(undefined);
  };

  const handleAddClick = () => {
    setEditingInsurance(undefined);
    setModalOpen(true);
  };

  const handleEdit = (insurance: Insurance) => {
    setEditingInsurance(insurance);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const handleSubmit = (data: InsuranceFormInputs) => {
    if (editingInsurance?.id) {
      updateMutation.mutate({ ...data, id: editingInsurance.id });
    } else {
      addMutation.mutate(data);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Insurance Manager
      </Typography>

      <Box mb={2} display="flex" justifyContent="center">
        <Button variant="contained" onClick={handleAddClick}>
          Add Insurance
        </Button>
      </Box>

      {isLoading && <Typography>Loading...</Typography>}
      {isError && (
        <Typography color="error">
          Failed to load insurances. Please try again.
        </Typography>
      )}
      {!isLoading && !isError && (
        <InsuranceList
          insurances={insurances}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isDeleting={deleteMutation.isLoading}
        />
      )}

      <InsuranceModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        defaultValues={editingInsurance}
        isLoading={addMutation.isLoading || updateMutation.isLoading}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        message={snackbar.message}
        onClose={() => setSnackbar({ open: false, message: "" })}
      />
    </Container>
  );
};

export default App;
