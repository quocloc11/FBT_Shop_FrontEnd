//export const API_ROOT = 'http://localhost:3000'

const buildMode = import.meta.env.VITE_BUILD_MODE

let apiRoot = ''
if (buildMode === 'dev') {
  apiRoot = 'http://localhost:3000'
} else if (buildMode === 'production') {
  apiRoot = 'https://fbt-shop-backend.onrender.com'
}

export const API_ROOT = apiRoot

//export const API_ROOT = 'https://trello-backend-wdel.onrender.com'



export const DEFAULT_PAGE = 1
export const DEFAULT_ITEMS_PER_PAGE = 12


