import React from "react"
import DataTable from "react-data-table-component"

const Table = ({ title, columns, data, onChange, value }) => {
  return (
    <div>
      <DataTable
        title={title}
        columns={columns}
        data={data}
        pagination
        striped
        fixedHeader
        highlightOnHover
        subHeader
        subHeaderAlign='right'
        subHeaderComponent={
          <input
            type='text'
            placeholder='Search..'
            className='form-control w-25'
            value={value}
            onChange={onChange}
          />
        }
      />
    </div>
  )
}

export default Table
