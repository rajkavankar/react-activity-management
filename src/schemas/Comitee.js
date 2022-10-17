import { Button } from "react-bootstrap"
import { db } from "../firebase.config"
import { doc, deleteDoc } from "firebase/firestore"

const onRemove = async (id) => {
  try {
    const docRef = doc(db, "comitees", id)
    if (window.confirm("Are you sure")) {
      await deleteDoc(docRef)
    }
  } catch (error) {
    console.log(error)
  }
}

export const columns = [
  {
    name: "Title",
    selector: (row) => row.data.title,
    sortable: true,
  },

  {
    name: "Actions",
    cell: (row) => (
      <div>
        <Button variant='danger' onClick={() => onRemove(row.id)}>
          view
        </Button>
      </div>
    ),
  },
]
