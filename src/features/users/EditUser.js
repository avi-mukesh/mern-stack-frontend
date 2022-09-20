import { useParams } from "react-router-dom"
import EditUserForm from "./EditUserForm"
import { useGetUsersQuery } from "./usersApiSlice"
import PulseLoader from "react-spinners/PulseLoader"

const EditUser = () => {
    const { id } = useParams()

    // const user = useSelector((state) => selectUserById(state, id))
    const { user } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            user: data?.entities[id],
        }),
    })

    // we do it this way to ensure we have the user data before we need it inside the EditUserForm
    // reason this is helpful is because we want to preopoulate the form with the user's existing data
    if (!user) return <PulseLoader color="#FFF" />
    const content = <EditUserForm user={user} />
    return content
}

export default EditUser
