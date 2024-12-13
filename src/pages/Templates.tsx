import React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import DataTable from '../components/DataTable';
import { useQuery } from '@tanstack/react-query';
import { fetchCommentTemplate } from '../api/ApiCollection';
import toast from 'react-hot-toast';
import AddData from '../components/AddData';

const Templates = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { isLoading, isError, isSuccess, data, refetch } = useQuery({
    queryKey: ['allproducts'],
    queryFn: fetchCommentTemplate,
  });

   const reloadUsersList = () => {
    refetch();
  };


  const columns: GridColDef[] = [
{
  field: 'attachment_url',
  headerName: 'Image',
  width: 150, // Tetapkan lebar spesifik
  renderCell: (params) => {
    return (
      <div className="flex items-center space-x-3 p-2">
        <div className="w-24 h-24 overflow-hidden flex justify-center items-center border rounded-lg">
          <img
            src={params.row.attachment_url || '/attachmenttemplate.png'}
            alt="product-picture"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    );
  },
},
{
  field: 'content',
  type: 'string',
  headerName: 'Content',
  flex: 1, 
  minWidth: 250,
}
  ];

  React.useEffect(() => {
    if (isLoading) {
      toast.loading('Loading...', { id: 'promiseProducts' });
    }
    if (isError) {
      toast.error('Error while getting the data!', {
        id: 'promiseProducts',
      });
    }
    if (isSuccess) {
      toast.success('Got the data successfully!', {
        id: 'promiseProducts',
      });
    }
  }, [isError, isLoading, isSuccess]);

  return (
    <div className="w-full p-0 m-0">
      <div className="w-full flex flex-col items-stretch gap-3">
        <div className="w-full flex justify-between xl:mb-5">
          <div className="flex gap-1 justify-start flex-col items-start">
            <h2 className="font-bold text-2xl xl:text-4xl mt-0 pt-0 text-base-content dark:text-neutral-200">
              Comment Templates 
            </h2>
            {data && data.length > 0 && (
              <span className="text-neutral dark:text-neutral-content font-medium text-base">
                {data.length} Templates Found
              </span>
            )}
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className={`btn ${
              isLoading ? 'btn-disabled' : 'btn-primary'
            }`}
          >
            Add New Template +
          </button>
        </div>

        {isLoading ? (
          <DataTable
            slug="templates"
            columns={columns}
            rows={[]}
            includeActionColumn={true}
          />
        ) : isSuccess ? (
          <DataTable
            slug="templates"
            columns={columns}
            rows={data}
            includeActionColumn={true}
          />
        ) : (
          <>
            <DataTable
              slug="templates"
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
            slug={'template'}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            reloadUsersList={reloadUsersList} // Add this empty function to satisfy TypeScript
          />
        )}
      </div>
    </div>
  );
};

export default Templates;