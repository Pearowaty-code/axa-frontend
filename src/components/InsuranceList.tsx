import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Insurance } from "../types/types";

interface Props {
  insurances: Insurance[];
  onEdit: (insurance: Insurance) => void;
  onDelete: (id: number) => void;
  isDeleting?: boolean;
}

const InsuranceList: React.FC<Props> = ({
  insurances,
  onEdit,
  onDelete,
  isDeleting = false,
}) => {
  return (
    <Paper sx={{ overflowX: "auto" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Client Name</TableCell>
            <TableCell>Policy Number</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {insurances.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No insurances found.
              </TableCell>
            </TableRow>
          ) : (
            insurances.map((insurance) => (
              <TableRow key={insurance.id}>
                <TableCell>{insurance.clientName}</TableCell>
                <TableCell>{insurance.policyNumber}</TableCell>
                <TableCell>{insurance.description}</TableCell>
                <TableCell>{insurance.status}</TableCell>
                <TableCell>
                  <IconButton onClick={() => onEdit(insurance)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => onDelete(insurance.id)}
                    disabled={isDeleting}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default InsuranceList;
