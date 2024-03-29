import React, { useEffect, useState } from 'react';
// import DataTable from 'react-data-table-component';
import { DataGrid, GridCellParams, GridColDef, GridSelectionModelChangeParams, GridValueGetterParams } from '@material-ui/data-grid';
// import { useDispatch, useSelector } from 'react-redux';

import Navbar from '../../components/Navbar';
import PageBody from '../../components/PageBody';
import Sidebar from '../../components/Sidebar';
import api from '../../services/api';


import './styles.css';


const columns: GridColDef[] = [
  {
    field: 'id',
    width: 100,
    headerName: 'ID',
    align: 'center',

  },
  {
    field: 'first_name',
    headerName: 'Primeiro nome',
    align: 'center',

  },
  {
    field: 'email',
    headerName: 'E-mail',
    sortable: false,
    align: 'center',

  },
  {
    field: 'is_client',
    headerName: 'É cliente?',
    sortable: false,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params: GridCellParams) => (
      <div>
        {(params.value) === 1 ? 'SIM' : 'NÃO'}
      </div>
    ),
  },
  {
    field: 'is_psychologist',
    headerName: 'É psicólogo?',
    sortable: false,
    align: 'center',
    renderCell: (params: GridCellParams) => (
      <div>
        {(params.value) === 1 ? 'SIM' : 'NÃO'}
      </div>
    ),
  },
  {
    field: 'is_driver',
    headerName: 'É motorista?',
    sortable: false,
    align: 'center',
    renderCell: (params: GridCellParams) => (
      <div>
        {(params.value) === 1 ? 'SIM' : 'NÃO'}
      </div>
    )
  },
  {
    field: "",
    headerName: "AÇÃO",
    width: 140,
    align: 'center',
    disableClickEventBubbling: true,
    renderCell: (params) => {
      const onClick = () => {
        console.log(params)
      };

      return <div className="button-see-more" onClick={onClick}>VER DETALHES</div>;
    },
  }
];

function Users() {

  const [usersList, setUsersList] = useState({ users: [] })
  const rows = usersList.users;
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    api.get('/users').then(response => {
      setUsersList(response.data)
      // console.log('RESPONSE', response)
      console.log(usersList)
    })
  }, []);

  const handleSelectionChange = (selection: any) => {
    setSelectedRows(selection.selectionModel);
    console.log(selection)
  };

  const handlePurge = async () => {
    await Promise.all(selectedRows.map(async (selectedRow: any) => {
      console.log(selectedRow)
      await api.post('users/delete', {
        user: {
          id: selectedRow
        }
      })
    })
    )

    api.get('/users').then(response => {
      setUsersList(response.data)
    })

  }

  return (
    <div className="container">
      <Navbar />
      <div className="main-container">
        <Sidebar />
        <div className="body-schedule">

          <PageBody title="Usuários" link="/user-form">
            <div className="table-wrapper">
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                checkboxSelection
                headerHeight={60}
                autoHeight={true}
                onSelectionModelChange={handleSelectionChange}
              />
            </div>
            {selectedRows.length !== 0 && <button onClick={handlePurge}>Deletar</button>}
          </PageBody>
        </div>
      </div>

    </div>

  )
}

export default Users;