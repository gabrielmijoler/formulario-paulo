import { Button, Paper, TextField } from '@mui/material'
import { Add as AddIcon, Search as SearchIcon } from '@mui/icons-material'
import Layout from '@/components/template/Layout'
import { FPTable } from '@/components/TableCollapse'
import { ErrorComponent } from '@/components/Error'
import { parsePatients } from '@/app/home/utils'
import { getColumns, subColumns } from '@/utils/table-columns'
import { usePacienteController } from '../controller'
import { PacienteModal } from '../components/modal'

export const PacienteView = () => {
  const {
    clientData,
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
    handleOpenRow,
    handleSearchChange,
    handlePaginationChange,
  } = usePacienteController()

  const columns = getColumns(handleOpenRow)

  if (error) {
    return <ErrorComponent error={error} />
  }

  return (
    <Layout titulo="Cadastro de Paciente" className="font-bold">
      {isCreateSuccess && null /* TODO: Implement success message */}


      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Gerenciamento de Pacientes
        </h1>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenModal}
          startIcon={<AddIcon />}
          className="shadow-md hover:shadow-lg transition-shadow"
        >
          Novo Paciente
        </Button>
      </div>

      <PacienteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        methods={methods}
        onSubmit={handleSubmit}
      />

      <Paper className="p-4 shadow-sm">
        <div className="mb-4">
          <TextField
            label="Buscar paciente"
            variant="outlined"
            size="medium"
            fullWidth
            value={search ?? ''}
            onChange={(event) => handleSearchChange(event.target.value)}
            placeholder="Digite o nome do paciente..."
            slotProps={{
              input: {
                startAdornment: <SearchIcon className="mr-2 text-gray-400" />,
              },
            }}
            className="max-w-md"
          />
        </div>

        <FPTable
          columns={columns}
          data={parsePatients({
            ...data,
            data: clientData,
          })}
          columnsCollapse={subColumns}
          isLoading={isLoading}
          pagination={pagination}
          setPagination={handlePaginationChange}
          paginationItems={[10, 20, 30, 40]}
        />
      </Paper>
    </Layout>
  )
}
