const buildMode = import.meta.env.VITE_BUILD_MODE

let apiRoot = ''
if (buildMode === 'dev') {
  apiRoot = 'http://localhost:8017'
} else if (buildMode === 'production') {
  apiRoot = 'https://fbt-shop-backend.onrender.com'
}

export const API_ROOT = apiRoot

export const DEFAULT_PAGE = 1
export const DEFAULT_ITEMS_PER_PAGE = 12


