import { Button } from "react-bootstrap"
import { FaTrashAlt } from "react-icons/fa"
import { db } from "../firebase.config"
import { doc, deleteDoc } from "firebase/firestore"

const onRemove = async (id) => {
  try {
    const docRef = doc(db, "tags", id)
    if (window.confirm("Are you sure")) {
      await deleteDoc(docRef)
    }
  } catch (error) {
    console.log(error)
  }
}

export const columns = [
  {
    name: "Tag",
    selector: (row) => row.data.tag,
    sortable: true,
  },

  {
    name: "Actions",
    cell: (row) => (
      <div>
        <Button variant='danger' onClick={() => onRemove(row.id)}>
          <FaTrashAlt />
        </Button>
      </div>
    ),
  },
]
