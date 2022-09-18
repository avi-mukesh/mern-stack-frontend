import { apiSlice } from "../../app/api/apiSlice"
import { logOut, setCredentials } from "./authSlice"

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            // username and password
            query: (credentials) => ({
                url: "/auth",
                method: "POST",
                body: credentials,
            }),
        }),

        sendLogout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            // putting this onQueryStarted here saves us from importing useDispatch into each component where we might need to logout
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    console.log(data)
                    dispatch(logOut())
                    setTimeout(
                        () => dispatch(apiSlice.util.resetApiState()), // remove all existing cache entries
                        1000
                    )
                    // 1 second delay is enough for it to realise that the noteslist or userslist has been unmounted
                } catch (err) {
                    console.log(err)
                }
            },
        }),

        refresh: builder.mutation({
            query: () => ({
                url: "/auth/refresh",
                method: "GET",
            }),

            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    console.log(data)
                    const { accessToken } = data
                    dispatch(setCredentials({ accessToken }))
                } catch (err) {
                    console.log(err)
                }
            },
        }),
    }),
})

export const { useLoginMutation, useSendLogoutMutation, useRefreshMutation } =
    authApiSlice
