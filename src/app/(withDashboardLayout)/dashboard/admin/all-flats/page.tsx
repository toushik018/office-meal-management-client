"use client";

import {
  Box,
  CircularProgress,
  IconButton,
  Pagination,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import {
  useDeleteFlatMutation,
  useGetAllFlatsQuery,
  useUpdateFlatMutation,
} from "@/redux/api/flatApi";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "sonner";
import { useDebounced } from "@/redux/hooks";
import { IFlat } from "@/types/flat/flat";
import UpdateFlatModal from "../../user/my-flats/components/updateFlatModal";

const AllFlats = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedFlat, setSelectedFlat] = useState<IFlat | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  const query: Record<string, any> = {};

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  query["page"] = page;
  query["limit"] = limit;

  if (!!debouncedTerm) {
    query["location"] = debouncedTerm;
  }

  const { data, isLoading } = useGetAllFlatsQuery({ ...query });
  const [deleteFlat] = useDeleteFlatMutation();
  const [updateFlat] = useUpdateFlatMutation();

  const flats = data?.flats;
  const meta = data?.meta;

  let pageCount: number;

  if (meta?.total) {
    pageCount = Math.ceil(meta.total / limit);
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteFlat(id).unwrap();
      if (res?.data.id) {
        toast.warning(res.message);
      }
    } catch (err: any) {
      toast.error("Error while deleting");
      console.error(err.message);
    }
  };

  const handleEdit = (flat: IFlat) => {
    setSelectedFlat(flat);
    setIsModalOpen(true);
  };

  const handleUpdate = async (data: Partial<IFlat>) => {
    if (selectedFlat) {
      try {
        const res = await updateFlat({ id: selectedFlat.id, ...data }).unwrap();
        if (res?.id) {
          toast.success("Flat updated successfully");
        }
        setIsModalOpen(false);
      } catch (err: any) {
        toast.error("Error while updating");
        console.error(err.message);
      }
    }
  };

  const columns: GridColDef[] = [
    { field: "location", headerName: "Location", flex: 1 },
    { field: "description", headerName: "Description", flex: 2 },
    { field: "rentAmount", headerName: "Rent Amount", flex: 0.5 },
    { field: "bedrooms", headerName: "Bedrooms", flex: 0.5 },
    { field: "amenities", headerName: "Amenities", flex: 2 },
    {
      field: "username",
      headerName: "Posted By",
      flex: 1,
      valueGetter: (params) => params.row.user.username,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Box>
            <IconButton
              onClick={() => handleDelete(row.id)}
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={() => handleEdit(row)} aria-label="edit">
              <EditIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <TextField
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          placeholder="Search Flats"
        ></TextField>
      </Stack>
      {!isLoading ? (
        <Box sx={{ height: 600, mt: 2 }}>
          <DataGrid
            rows={flats || []}
            columns={columns}
            hideFooterPagination
            slots={{
              footer: () => {
                return (
                  <Box
                    sx={{
                      mb: 2,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Pagination
                      color="primary"
                      count={pageCount}
                      page={page}
                      onChange={handleChange}
                    />
                  </Box>
                );
              },
            }}
          />
        </Box>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ height: 600 }}
        >
          <CircularProgress />
        </Box>
      )}
      {selectedFlat && (
        <UpdateFlatModal
          open={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
          flatData={selectedFlat}
        />
      )}
    </Box>
  );
};

export default AllFlats;
