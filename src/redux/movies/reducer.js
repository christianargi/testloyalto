import {
  HANDLE_STATE,
  SET_MOVIE_LIST,
  SET_LOADER,
  SET_HAS_MORE,
  SET_MOVIE_DETAIL,
  SET_MOVIE_LIST_PART,
  SET_PAGINATION,
  SET_GENRE
} from '../../types/constants'

const initState = {
  loading: false,
  movielist: [],
  title: "",
  rating: "",
  releaseDate: "",
  overview: ""
};

export default function moviesReducer(state = initState, action) {
  switch (action.type) {
    case SET_LOADER:
      return {
        ...state,
        loading: action.payload,
      };
    case HANDLE_STATE:
      return {
        ...state,
        [action.field]: action.value,
      };
    case SET_MOVIE_LIST:
      return {
        ...state,
        movieList: action.payload
      };
    case SET_MOVIE_DETAIL:
      return {
        ...state,
        title: action.payload.original_title,
        rating: action.payload.vote_average,
        releaseDate: action.payload.release_date,
        overview: action.payload.overview
      };
    case SET_PAGINATION: {
      return {
        ...state,
        pageNo: action.pageNo,
        pageSize: action.pageSize,
        totalRows: action.totalRows,
      }
    }
    case SET_GENRE:
      return {
        ...state,
        genreList: action.payload
      };
    default:
      return state;
  }
}