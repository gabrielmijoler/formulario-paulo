import { Button, Paper, TextField } from '@mui/material'
import {
  Add as AddIcon,
  Search as SearchIcon,
  LocalHospital as MedicalIcon,
} from '@mui/icons-material'
import Layout from '@/components/template/Layout'
import { Toast } from '@/components/Toast'
import { FPTable } from '@/components/TableCollapse'
import { ErrorComponent } from '@/components/Error'
import { parsePatholias } from '@/app/home/utils'
import { columnsPathologies } from '@/utils/table-columns'
import { usePatologiasController } from '../controller'
import { PatologiasModal } from '../component/modal'

export const PatologiasView = () => {
  const {
    pathologiesData,
    isModalOpen,
    pagination,
    search,
    methods,
    data,
    error,
    isLoading,
    isCreateSuccess,
    handleOpenModal,
    handleCloseModal,
    handleSubmit,
    handleSearchChange,
    handlePaginationChange,
  } = usePatologiasController()

  if (error) {
    return <ErrorComponent error={error} />
  }

  return (
    <Layout titulo="Cadastro de Patologias">
      {isCreateSuccess && (
        <Toast
          item={{ message: 'Patologia criada com sucesso!', type: 'success' }}
        />
      )}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <MedicalIcon className="text-blue-600 text-3xl" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Gerenciamento de Patologias
            </h1>
          </div>
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenModal}
          startIcon={<AddIcon />}
          className="shadow-md hover:shadow-lg transition-all duration-200 bg-blue-600 hover:bg-blue-700"
        >
          Nova Patologia
        </Button>
      </div>
      <PatologiasModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        methods={methods}
        onSubmit={handleSubmit}
      />
      <Paper className="p-6 shadow-sm border border-gray-100">
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <SearchIcon className="text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-700">
              Buscar Patologias
            </h2>
          </div>
          <TextField
            label="Buscar por nome ou código"
            variant="outlined"
            size="medium"
            fullWidth
            value={search ?? ''}
            onChange={(event) => handleSearchChange(event.target.value)}
            placeholder="Digite o nome ou código da patologia..."
            className="max-w-md"
            slotProps={{
              input: {
                startAdornment: (
                  <SearchIcon className="mr-2 text-gray-400" fontSize="small" />
                ),
              },
            }}
          />
        </div>

        <div className="border-t pt-4">
          <FPTable
            columns={columnsPathologies()}
            data={parsePatholias({
              ...data,
              data: pathologiesData,
            })}
            isLoading={isLoading}
            pagination={pagination}
            setPagination={handlePaginationChange}
            paginationItems={[10, 20, 30, 40]}
          />
        </div>
      </Paper>

      {data && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Paper className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {data.pagination?.total || 0}
            </div>
            <div className="text-sm text-gray-600">Total de Patologias</div>
          </Paper>
          <Paper className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {data.pagination?.current_page || 1}
            </div>
            <div className="text-sm text-gray-600">Página Atual</div>
          </Paper>
          <Paper className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {Math.ceil(
                (data.pagination?.total || 0) /
                (data.pagination?.per_page || 1),
              )}
            </div>
            <div className="text-sm text-gray-600">Total de Páginas</div>
          </Paper>
        </div>
      )}
    </Layout>
  )
}
