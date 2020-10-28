export const selectAuth =  (state) => ({
    token: state.auth.token,
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,
    user: state.auth.user,
  })

