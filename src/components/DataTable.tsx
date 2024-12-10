import { useState } from 'react';
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridRowSelectionModel,
} from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import {
  HiOutlinePencilSquare,
  HiOutlineEye,
  HiOutlineTrash,
} from 'react-icons/hi2';
import toast from 'react-hot-toast';

interface DataTableProps<T extends { id?: string | number }> {
  columns: GridColDef[];
  rows: T[];
  slug: string;
  includeActionColumn: boolean;
  idMapper?: (row: T) => string | number; 
  onSelectedUsersChange?: (selectedUsers: T[]) => void;
}

const DataTable = <T extends { id?: string | number }>({
  columns,
  rows,
  slug,
  includeActionColumn,
  idMapper = (row) => row.id!, 
  onSelectedUsersChange,
}: DataTableProps<T>) => {
  const navigate = useNavigate();
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>([]);

  const handleSelectionModelChange = (newSelectionModel: GridRowSelectionModel) => {
    setSelectionModel(newSelectionModel);

    const selectedUsers = newSelectionModel
      .map((id) => rows.find((row) => idMapper(row) === id))
      .filter((user): user is T => user !== undefined); 

    if (onSelectedUsersChange) {
      onSelectedUsersChange(selectedUsers);
    }
  };

  const actionColumn: GridColDef = {
    field: 'action',
    headerName: 'Action',
    minWidth: 200,
    flex: 1,
    renderCell: (params) => (
      <div className="flex items-center">
        <button
          onClick={() => {
            navigate(`/${slug}/${params.row.id}`);
          }}
          className="btn btn-square btn-ghost"
        >
          <HiOutlineEye />
        </button>
        <button
          onClick={() => {
            toast('Jangan diedit!', {
              icon: '😠',
            });
          }}
          className="btn btn-square btn-ghost"
        >
          <HiOutlinePencilSquare />
        </button>
        <button
          onClick={() => {
            toast('Jangan dihapus!', {
              icon: '😠',
            });
          }}
          className="btn btn-square btn-ghost"
        >
          <HiOutlineTrash />
        </button>
      </div>
    ),
  };

  const transformedRows = rows.map((row) => ({
    ...row,
    id: idMapper(row), 
  }));

  const gridContent = (
    <DataGrid
      className="dataGrid p-0 xl:p-3 w-full bg-base-100 text-white"
      rows={transformedRows}
      columns={includeActionColumn ? [...columns, actionColumn] : columns}
      getRowHeight={() => 'auto'}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 10,
          },
        },
      }}
      slots={{ toolbar: GridToolbar }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
          quickFilterProps: { debounceMs: 500 },
        },
      }}
      pageSizeOptions={[5]}
      checkboxSelection
      disableRowSelectionOnClick
      disableColumnFilter
      disableDensitySelector
      disableColumnSelector
      onRowSelectionModelChange={handleSelectionModelChange}
      rowSelectionModel={selectionModel}
    />
  );

  return <div className="w-full bg-base-100 text-base-content">{gridContent}</div>;
};

export default DataTable;
