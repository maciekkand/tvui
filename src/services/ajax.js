/* eslint-disable */
import axios from 'axios'
import constants from '../data/constants'

export const ajaxAddTodaysPrograms = context => {
  axios
    .get(constants.TV_LIST)
    .then(res => {

      res.data.map((el, index) => {
        if (index < res.data.length - 2) {
          const totalMinutes = (res.data[index + 1].timestamp - el.timestamp) / (1000 * 60)
          const hours = parseInt(totalMinutes / 60)
          const minutes = totalMinutes % 60
          el.duration = hours + ':' + minutes
        }
      })

      context.commit('ADD_TODAYS_PROGRAMS', res.data)
    })
    .catch(err => console.log('ERORAS:', err))
}

export const ajaxGetSelectedPrograms = (context, { day, startHour, endHour, selectedCategories }) => {
  // console.log('startHour = ', startHour)
  // console.log('endHour = ', endHour)
  // console.log('selectedCategories = ', selectedCategories)

  const arr = JSON.stringify(selectedCategories)

  const query = `q={$and:[{timestamp:{$gt:${startHour}}},{timestamp:{$lt:${endHour}},category:{$in:${arr}}}]}`
  const url = constants.TV_LIST_PREFIX + query + constants.TV_LIST_SUFFIX

  console.log('url = ', url)

  axios.get(url)
    .then(res => {
      res.data.map((el, index) => {
        if (index < res.data.length - 2) {
          const totalMinutes = (res.data[index + 1].timestamp - el.timestamp) / (1000 * 60)
          const hours = parseInt(totalMinutes / 60)
          const minutes = totalMinutes % 60
          el.duration = hours + ':' + minutes
        }
      })
      context.commit('ADD_TODAYS_PROGRAMS', res.data)
    })
    .catch(err => console.log('My error: ', err))
}
