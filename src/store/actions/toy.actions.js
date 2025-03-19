import { store } from "../store.js";
import { toyService } from "../../services/toy.service.js";
import { ADD_TOY, REMOVE_TOY, SET_HAS_MORE, SET_IS_LOADING, SET_TOYS, UPDATE_TOY, SET_FILTER_BY } from "../reducers/toy.reducer.js";

export async function loadToys({ offset = 0 }) {
    const state = store.getState();
    const filterBy = state.toyModule.filterBy

    return toyService.query(filterBy, offset)
        .then(({ toys, total }) => {
            const currentToys = state.toyModule.toys;
            const newOffset = offset + toys.length;

            store.dispatch({
                type: SET_TOYS,
                toys: offset === 0
                    ? toys
                    : [...currentToys, ...toys]
            });

            store.dispatch({
                type: SET_HAS_MORE,
                hasMore: newOffset < total
            });
        })
        .catch(err => {
            console.log('Cannot load toys:', err);
            throw err;
        })
        .finally(() => store.dispatch({ type: SET_IS_LOADING, isLoading: false }))
}


export function removeToy(toyId) {
    return toyService.remove(toyId)
        .then(() => {
            store.dispatch({ type: REMOVE_TOY, toyId })
        })
        .catch(err => {
            console.log('toy action -> Cannot remove toy', err)
            throw err
        })
}

export function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    return toyService.save(toy)
        .then((savedToy) => {
            store.dispatch({ type, toy: savedToy })
            return savedToy
        })
        .catch(err => {
            console.log('toy action -> Cannot save toy', err)
            throw err
        })
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}