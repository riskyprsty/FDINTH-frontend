import React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import DataTable from '../components/DataTable';
import { fetchUsers } from '../api/ApiCollection';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import AddData from '../components/AddData';

interface User {
  user_id: string; // or number, based on your API
  username: string;
  img?: string;
  token: string;
  cookies: string;
  user_agent: string;
  profile_pict?: string;
}


const Users = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { isLoading, isError, isSuccess, data, refetch } = useQuery<User[]>({
    queryKey: ['allusers'],
    queryFn: fetchUsers,
  });

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'User ID', width: 140 },
    {
      field: 'username',
      headerName: 'Name',
      minWidth: 220,
      flex: 1,
      renderCell: (params) => (
        <div className="flex gap-3 items-center">
          <div className="avatar">
            <div className="w-6 xl:w-9 rounded-full">
              <img
                src={params.row.profile_pict || '/Portrait_Placeholder.png'}
                alt="user-picture"
              />
            </div>
          </div>
          <span className="mb-0 pb-0 leading-none">
            {params.row.username}
          </span>
        </div>
      ),
    },
    {
      field: 'token',
      type: 'string',
      headerName: 'Token',
      minWidth: 200,
      flex: 1,
    },
    {
      field: 'cookies',
      type: 'string',
      headerName: 'Cookie',
      minWidth: 120,
      flex: 1,
    },
    {
      field: 'user_agent',
      headerName: 'User Agent',
      minWidth: 100,
      type: 'string',
      flex: 1,
    },
  ];

  React.useEffect(() => {
    if (isLoading) {
      toast.loading('Loading...', { id: 'promiseUsers' });
    }
    if (isError) {
      toast.error('Error while getting the data!', {
        id: 'promiseUsers',
      });
    }
    if (isSuccess) {
      toast.success('Got the data successfully!', {
        id: 'promiseUsers',
      });
    }
  }, [isError, isLoading, isSuccess]);

  // Transform the data to add an id field
  const transformedData = data?.map((row) => ({
    ...row,
    id: row.user_id, // Map user_id to id
  })) || [];

  const reloadUsersList = () => {
    refetch(); // Refetch the user data
  };

  return (
<div className="w-full p-0 m-0">
  <div className="w-full max-w-screen-2xl mx-auto flex flex-col items-stretch gap-3">
    <div className="w-full flex justify-between items-center mb-5">
      <div className="flex gap-1 justify-start flex-col items-start">
        <h2 className="font-bold text-2xl xl:text-4xl mt-0 pt-0 text-base-content dark:text-neutral-200">
          Users
        </h2>
            {data && data.length > 0 && (
              <span className="text-neutral dark:text-neutral-content font-medium text-base">
                {data.length} Users Found
              </span>
            )}
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className={`btn ${
              isLoading ? 'btn-disabled' : 'btn-primary'
            }`}
          >
            Add New User +
          </button>
        </div>
        {isLoading ? (
          <DataTable
            slug="users"
            columns={columns}
            rows={[]}
            includeActionColumn={true}
          />
        ) : isSuccess ? (
          <DataTable
            slug="users"
            columns={columns}
            rows={transformedData} 
            includeActionColumn={true}
          />
        ) : (
          <>
            <DataTable
              slug="users"
              columns={columns}
              rows={[]}
              includeActionColumn={true}
            />
            <div className="w-full flex justify-center">
              Error while getting the data!
            </div>
          </>
        )}

        {isOpen && (
          <AddData
            slug={'user'}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            reloadUsersList={reloadUsersList}
          />
        )}
      </div>
    </div>
  );
};

export default Users;
