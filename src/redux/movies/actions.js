import {
  HANDLE_STATE,
  GET_MOVIE_LIST,
  SET_LOADER,
  GET_MOVIE_DETAIL,
  GET_GENRE,
} from '../../types/constants'

const actions = {
  setLoading: (loading) => (
    {
      type: SET_LOADER,
      loading
    }),
  handleState: (field, value) => (
    {
      type: HANDLE_STATE,
      field,
      value
    }),
  getMovies: (pageNo) => (
    {
      type: GET_MOVIE_LIST,
      pageNo
    }),
  getDetail: (id) => (
    {
      type: GET_MOVIE_DETAIL,
      id
    }),
  getGenre: () => (
    {
      type: GET_GENRE,
    }),
};
export default actions;