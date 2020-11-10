//This function looks up the term exactly
const findEntryByField = async (model, field, term) => {
  const queryObj = {}
  queryObj[field] = term

  let entry
  try {
    entry = await model.findOne(queryObj)
  } catch (error) {
    console.error(error)
  }
  return entry
}

const findWordInField = async (model, searchField, searchValue) => {
  const queryObj = {}
  if (searchValue !== '' && searchField !== '') {
    queryObj[searchField] = { $regex: searchValue, $options: 'i' }
  }
  let entry
  try {
    entry = await model.find(queryObj)
  } catch (error) {
    console.error(error)
  }
  return entry
}

exports.findWordInField = findWordInField
exports.findEntryByField = findEntryByField
