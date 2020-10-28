export const selectProverb =  (state) => ({
    proverbs: state.proverb.proverbs,
    userProverbs: state.proverb.userProverbs,
    proverb: state.proverb.proverb,
    loading: state.proverb.loading,
    error: state.proverb.error,
  })