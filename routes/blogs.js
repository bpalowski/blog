const router = require('express').Router()
const axios = require('axios')

const { filterObj, query, sortByChecker, directionChecker } = require('../util/methods')

router.get("/ping", (req, res) => {
  filterObj()
  res.status(200).json({
    "success": true
  })

})

router.get("/posts", async (req, res) => {

  try {
    const tag = req.query.tags;
    const sortBy = req.query.sortBy;
    const direction = req.query.direction;


    if (!tag) {
      return res.status(400).json({ "error": "Tags parameter is required" })
    }

    if (sortBy && !sortByChecker(sortBy)) {
      return res.status(400).json({ "error": "sortBy parameter is invalid" })
    }


    if (direction && !directionChecker(direction)) {
      return res.status(400).json({ "error": "direction parameter is invalid" })
    }

    let arr = await filterObj(tag)

    let newArr = query(arr, sortBy, direction)
    console.log(arr)
    return res.status(200).json(newArr)

  } catch (err) {
    res.status(500).json({ error: err.status })
  }
})


module.exports = router