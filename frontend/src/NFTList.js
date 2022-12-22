import React, { useContext, useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import { UserContext } from './LoginContext'
import { useNavigate } from 'react-router-dom'

export default function NFTList() {
  let [rows, updateRows] = useState([])
  let [user, setUser] = useContext(UserContext)
  const navigate = useNavigate()
  const columns = [
    { field: 'icon', headerName: '', width: 120 },
    { field: 'name', headerName: 'NAME', width: 120 },
    { field: 'collection', headerName: 'COLLECTION', width: 240 },
    { field: 'type', headerName: 'TYPE', width: 120 },
    {
      field: 'showInAR',
      headerName: '',
      renderCell: (cellValues) => {
        return (
          <button
            onClick={() => {
              // TODO: Pass this URL to THREE.js scene.
              console.log(cellValues.row.gltf_url)
              setUser((u) => {
                for (let i = 0; i < u.nfts.length; i++) {
                  if (i === cellValues.row.id) {
                    u.nfts[i].selected = true
                  }
                }
                return u
              })
              navigate('/arcam')
            }}
          >
            Try in AR
          </button>
        )
      },
    },
  ]

  useEffect(() => {
    rows = []
    if (user.nfts) {
      for (let i = 0; i < user.nfts.length; i++) {
        const info = user.nfts[i]
        updateRows((r) => [
          ...r,
          {
            id: i,
            name: info.name,
            collection: info.asset_contract.name,
            type: info.animation_original_url ? 'Animation' : 'Still',
            gltf_url: info.animation_original_url,
          },
        ])
      }
    } else {
      console.log('user.nfts is undefined')
    }
  }, [])
  return (
    <div style={{ height: 400, width: '60%' }}>
      <Typography variant="h3" align="center" color="white">
        NFT Cam
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        sx={{ color: 'white', border: '0px', marginTop: '50px' }}
      />
    </div>
  )
}
