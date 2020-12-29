import { all, takeEvery, fork, takeLatest, call, select, put } from 'redux-saga/effects';
import { POST, GET } from '../../api/api';
import axios from 'axios';

import {
    HANDLE_STATE,
    GET_MOVIE_LIST,
    SET_MOVIE_LIST,
    SET_LOADER,
    SET_HAS_MORE,
    GET_MOVIE_DETAIL,
    SET_MOVIE_DETAIL,
    SET_MOVIE_LIST_PART,
    PUSH_MOVIES,
    SET_PAGINATION,
    GET_GENRE,
    SET_GENRE
} from '../../types/constants'

const movies = state => state.movies

export function* getMovieList(actions) {
    debugger
    try {
        yield put({ type: SET_LOADER, payload: true })
        debugger
        let response = yield call(GET, "https://api.themoviedb.org/3/movie/upcoming?api_key=2fccde01a371b106b09a241d6d1d5b49&page=" + actions.pageNo)
        const results = response.results.map(row => ({
            key: row.id,
            ...row
        }))
        if (response != undefined) {
            yield put({ type: SET_LOADER, payload: false })
            yield put({ type: SET_MOVIE_LIST, payload: results })
            yield put({
                type: SET_PAGINATION,
                pageNo: response.page,
                pageSize: response.results.lenght,
                totalRows: response.total_results
            })
        }
        else {
            yield put({ type: SET_LOADER, payload: false })
            yield put({ type: SET_MOVIE_LIST, payload: [] })
        }
    }
    catch {
        console.log("fail")
    }
}

export function* getMovieDetails(actions) {
    try {
        yield put({ type: SET_LOADER, payload: true })
        let response = yield call(GET, "https://api.themoviedb.org/3/movie/" + actions.id + "?api_key=2fccde01a371b106b09a241d6d1d5b49")
        if (response != undefined) {
            yield put({ type: SET_LOADER, payload: false })
            yield put({ type: SET_MOVIE_DETAIL, payload: response })
        }
        else {
            yield put({ type: SET_LOADER, payload: false })
            yield put({ type: SET_MOVIE_DETAIL, payload: [] })
        }
    }
    catch {
        console.log("fail")
    }
}

export function* getMovieGenre() {
    try {
        yield put({ type: SET_LOADER, payload: true })
        let response = yield call(GET, "https://api.themoviedb.org/3/genre/movie/list?api_key=2fccde01a371b106b09a241d6d1d5b49")
        if (response != undefined) {
            yield put({ type: SET_LOADER, payload: false })
            yield put({ type: SET_GENRE, payload: response.genres })
        }
        else {
            yield put({ type: SET_LOADER, payload: false })
            yield put({ type: SET_GENRE, payload: [] })
        }
    }
    catch {
        console.log("fail")
    }
}



export default function* rootSaga() {
    yield all(
        [
            takeLatest(GET_MOVIE_LIST, getMovieList),
            takeLatest(GET_MOVIE_DETAIL, getMovieDetails),
            takeLatest(GET_GENRE, getMovieGenre),
        ]
    );
}