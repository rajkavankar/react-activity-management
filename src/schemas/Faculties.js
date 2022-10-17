import { Button } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

export const columns = [
  {
    name: "Name",
    selector: (row) => row.data.name,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row) => row.data.email,
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
