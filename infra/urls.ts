const BASE_URL: string = 'http://127.0.0.1:8000/api'


//Auth
export const LOGIN_URL: string = `${BASE_URL}/users/tokens`
export const USER_DATA_URL: string = `${BASE_URL}/users/me`
export const GOOGLE_AUTH_URL: string = `${BASE_URL}/users/google-auth`
export const PROFILE_IMG_URL: string = `${BASE_URL}/users/profile/img`
export const PROFILE_IMG_PRESIGNED_URL: string = `${BASE_URL}/users/profile/img/presigned`
export const PROFILE_IMG_UPLOAD_DONE_URL: string = `${BASE_URL}/users/profile/img/done`
