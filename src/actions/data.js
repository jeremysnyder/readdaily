import moment from "moment"

export const isWeekend = (day) => [0, 6].includes(day)

const readingDay = (value) => {
  const asMoment = moment(value)
  const readingsPerWeek = 5
  let week = asMoment.isoWeek() - 1 // Week should be zero based for math
  return isWeekend(asMoment.day())
    ? null
    : week * readingsPerWeek + asMoment.day()
}

export const loadDay = (date) => (dispatch) => {
  const action = (payload) =>
    dispatch({ type: "LOAD_DAY", payload: { date, ...payload } })
  const day = readingDay(date)
  if (day) {
    fetch(`./data/chapter-bible-reading-plan/${day}.json`).then((response) => {
      switch (response.status) {
        case 200:
          response
            .json()
            .then((data) => action(data))
            .catch((e) => action({}))
          break
        default:
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          )
          action({})
      }
    })
  } else action({})
}

export const loadPlanType = (payload) => (dispatch) => {
  localStorage.setItem("readDaily-planType", payload)
  dispatch({ type: "LOAD_PLAN_TYPE", payload })
}
