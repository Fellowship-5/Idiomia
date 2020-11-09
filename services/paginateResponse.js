function addNextPreviousTotalObj (page, limit, arrLength) {
  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  const results = {}

  results.total_pages = Math.ceil(arrLength / limit)

  if (endIndex < arrLength) {
    results.next = {
      page: page + 1,
      limit: limit
    }
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit
    }
  }
  return { results, startIndex, endIndex }
}

function paginateResponse (model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const sort = req.query.sort
    const approved = req.query.approved

    const { results, startIndex } = addNextPreviousTotalObj(
      page,
      limit,
      await model.countDocuments().exec()
    )

    if (approved === undefined) {
      try {
        results.total_pages = Math.ceil(
          (await model
            .find({})
            .countDocuments()
            .exec()) / limit
        )

        results.results = await model
          .find({})
          .sort({ date: sort ? `${sort}` : null })
          .limit(limit)
          .skip(startIndex)
          .exec()
        res.paginatedResults = results
        next()
      } catch (error) {
        res.status(500).json({ msg: error.message })
      }
    } else {
      try {
        results.total_pages = Math.ceil(
          (await model
            .find({ adminApproval: approved })
            .countDocuments()
            .exec()) / limit
        )
        results.results = await model
          .find({
            adminApproval: approved
          })
          .sort({ date: sort ? `${sort}` : null })
          .limit(limit)
          .skip(startIndex)
          .exec()
        res.paginatedResults = results
        next()
      } catch (error) {
        res.status(500).json({ msg: error.message })
      }
    }
  }
}

function paginateArr (resultsArr, page, limit) {
  const { results, startIndex, endIndex } = addNextPreviousTotalObj(
    page,
    limit,
    resultsArr.length
  )
  results.results = resultsArr.slice(startIndex, endIndex)
  return results
}
exports.paginateResponse = paginateResponse
exports.paginateArr = paginateArr
