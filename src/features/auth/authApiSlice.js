import { apiSlice } from "../../app/api/apiSlice"
import { logOut } from "./authSlice"

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
                    // const { data } =
                    await queryFulfilled
                    // console.log(data)
                    dispatch(logOut())
                    dispatch(apiSlice.util.resetApiState()) // remove all existing cache entries
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
        }),
    }),
})

export const { useLoginMutation, useSendLogoutMutation, useRefreshMutation } =
    authApiSlice
