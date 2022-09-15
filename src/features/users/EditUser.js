import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUserById } from "./usersApiSlice"

import EditUserForm from "./EditUserForm"

const EditUser = () => {
    const { id } = useParams()

    const user = useSelector((state) => selectUserById(state, id))

    // we do it this way to ensure we have the user data before we need it inside the EditUserForm
    // reason this is helpful is because we want to preopoulate the form with the user's existing data

    const content = user ? <EditUserForm user={user} /> : <p>Loading...</p>
    return content
}

export default EditUser
