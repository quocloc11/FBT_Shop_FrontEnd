// import axios from "axios";
// import { interceptorLoadingElements } from "./formatters";
// import { refreshTokenAPI } from "../apis";


// const authorizedAxiosInstance = axios.create()
// let refreshTokenPromise = null
// let axiosReduxStore
// authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10

// //cho cokie
// authorizedAxiosInstance.defaults.withCredentials = true




// authorizedAxiosInstance.interceptors.request.use(function (config) {

//   interceptorLoadingElements(true)

//   // Do something before request is sent
//   return config;
// }, function (error) {
//   // Do something with request error
//   return Promise.reject(error);
// });

// // Add a response interceptor
// authorizedAxiosInstance.interceptors.response.use(function (response) {
//   // Any status code that lie within the range of 2xx cause this function to trigger
//   // Do something with response data

//   interceptorLoadingElements(false)

//   return response;
// }, function (error) {
//   // Any status codes that falls outside the range of 2xx cause this function to trigger
//   // Do something with response error
//   return Promise.reject(error);
// });
// if (!refreshTokenPromise) {
//   refreshTokenPromise = refreshTokenAPI()
//     .then(data => {
//       return data?.accessToken
//     })
//     .catch((_error) => {
//       // axiosReduxStore.dispatch(logoutUserAPI(false))
//       return Promise.reject(_error)
//     })
//     .finally(() => {
//       refreshTokenPromise = null
//     })
// }

// export default authorizedAxiosInstance



// import axios from 'axios'
// import { toast } from 'react-toastify'
// //import { interceptorLoadingElements } from './formatters'
// //import { logoutUserAPI } from '~/redux/user/userSlice'
// import { refreshTokenAPI } from '../apis'

// let axiosReduxStore
// export const injectStore = mainStore => {
//   axiosReduxStore = mainStore
// }

// let authorizedAxiosInstance = axios.create()

// authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10

// //cho cokie
// authorizedAxiosInstance.defaults.withCredentials = true

// // Interceptor Request: can thiet vao giua request api
// authorizedAxiosInstance.interceptors.request.use((config) => {
//   // Do something before request is sent
//   //  interceptorLoadingElements(true)

//   return config
// }, (error) => {
//   // Do something with request error
//   return Promise.reject(error)
// })

// let refreshTokenPromise = null


// // Interceptor Request: can thiet vao giua response nhan ve
// authorizedAxiosInstance.interceptors.response.use((response) => {
//   // Any status code that lie within the range of 2xx cause this function to trigger
//   // Do something with response data
//   //interceptorLoadingElements(false)

//   return response
// }, (error) => {
//   // Any status codes that falls outside the range of 2xx cause this function to trigger
//   // Do something with response error

//   // interceptorLoadingElements(false)

//   if (error.response?.status === 401) {
//     //axiosReduxStore.dispatch(logoutUserAPI(false))
//   }
//   const originalRequests = error.config
//   console.log('originalRequests: ', originalRequests)
//   if (error.response?.status === 410 && !originalRequests._retry) {
//     originalRequests._retry = true

//     if (!refreshTokenPromise) {
//       refreshTokenPromise = refreshTokenAPI()
//         .then(data => {
//           return data?.accessToken
//         })
//         .catch((_error) => {
//           //  axiosReduxStore.dispatch(logoutUserAPI(false))
//           return Promise.reject(_error)
//         })
//         .finally(() => {
//           refreshTokenPromise = null
//         })
//     }
//     return refreshTokenPromise.then(accessToken => {
//       return authorizedAxiosInstance(originalRequests)
//     })
//   }

//   let errorMessage = error?.message
//   if (error.response?.data?.message) {
//     errorMessage = error.response?.data?.message
//   }
//   if (error.response?.status !== 410) {
//     toast.error(errorMessage)
//   }
//   return Promise.reject(error)
// })

// export default authorizedAxiosInstance



import axios from 'axios'
import { toast } from 'react-toastify'
// import { logoutUserAPI } from '~/redux/user/userSlice'
import { refreshTokenAPI } from '../apis'

let axiosReduxStore
export const injectStore = mainStore => {
  axiosReduxStore = mainStore
}

let authorizedAxiosInstance = axios.create()

authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10

//cho cokie
authorizedAxiosInstance.defaults.withCredentials = true

// Interceptor Request: can thiet vao giua request api
authorizedAxiosInstance.interceptors.request.use((config) => {
  // Do something before request is sent
  // interceptorLoadingElements(true)

  return config
}, (error) => {
  // Do something with request error
  return Promise.reject(error)
})

let refreshTokenPromise = null


// Interceptor Request: can thiet vao giua response nhan ve
authorizedAxiosInstance.interceptors.response.use((response) => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  // interceptorLoadingElements(false)

  return response
}, (error) => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error

  // interceptorLoadingElements(false)

  if (error.response?.status === 401) {
    // axiosReduxStore.dispatch(logoutUserAPI(false))
  }
  const originalRequests = error.config
  console.log('originalRequests: ', originalRequests)
  if (error.response?.status === 410 && !originalRequests._retry) {
    originalRequests._retry = true

    if (!refreshTokenPromise) {
      refreshTokenPromise = refreshTokenAPI()
        .then(data => {
          return data?.accessToken
        })
        .catch((_error) => {
          //    axiosReduxStore.dispatch(logoutUserAPI(false))
          return Promise.reject(_error)
        })
        .finally(() => {
          refreshTokenPromise = null
        })
    }
    return refreshTokenPromise.then(accessToken => {
      return authorizedAxiosInstance(originalRequests)
    })
  }

  let errorMessage = error?.message
  if (error.response?.data?.message) {
    errorMessage = error.response?.data?.message
  }
  if (error.response?.status !== 410) {
    toast.error(errorMessage)
  }
  return Promise.reject(error)
})

export default authorizedAxiosInstance
