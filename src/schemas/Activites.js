import { Button } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

export const columns = [
  {
    name: "Title",
    selector: (row) => row.data.activity_title,
    sortable: true,
  },
  {
    name: "Type",
    selector: (row) => row.data.activity_type,
  },
  {
    name: "Start Date",
    selector: (row) => row.data.start_date,
  },

  {
    name: "Actions",
    cell: (row) => (
      <div>
        <LinkContainer to='/'>
          <Button variant='primary'>View</Button>
        </LinkContainer>
      </div>
    ),
  },
]
