import { ToyFilter } from "../cmps/ToyFilter.jsx"
import { ToyList } from "../cmps/ToyList.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { loadToys, removeToy } from "../store/actions/toy.actions.js"
import { SET_FILTER_BY, SET_IS_LOADING } from "../store/reducers/toy.reducer.js"
import { addUserActivity } from "../store/actions/user.actions.js"
import { showModal } from "../store/actions/modal.actions.js"
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import InfiniteScroll from "react-infinite-scroll-component"
import { useFilterSearchParams } from "../hooks/useFilterSearchParams.js"

export function ToyIndex() {
  const dispatch = useDispatch()
  const toys = useSelector(storeState => storeState.toyModule.toys)
  const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
  const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
  const hasMore = useSelector(storeState => storeState.toyModule.hasMore)
  const setSearchParams = useFilterSearchParams()

  useEffect(() => {
    dispatch({ type: SET_IS_LOADING, isLoading: true })
    loadToys({ offset: 0 })
    setSearchParams(filterBy)
  }, [dispatch, filterBy,])

  function onSetFilter(filterBy) {
    dispatch({ type: SET_FILTER_BY, filterBy })
  }

  function onRemoveToy(toy) {
    dispatch(showModal({
      message: "Are you sure you want to delete this toy?",
      onConfirm: () => removeToy(toy._id).then(() => {
        showSuccessMsg(`Toy removed`)
        addUserActivity(`Removed the Toy: '${toy.name}'`)
      }).catch(() => showErrorMsg('Cannot remove toy ' + toy._id))
    }));
  }

  function fetchMoreToys() {
    if (!isLoading && hasMore) {
      loadToys({ offset: toys.length })
    }
  }
  return (
    <section className="toy-index">
      <ToyFilter filterBy={{ ...filterBy }} onSetFilterBy={onSetFilter} />
      <div>
        <Link to="/toy/edit" className="btn">Add Toy</Link>
      </div>

      {!isLoading ? (
        <>
          <h2>Toys List</h2>
          <InfiniteScroll style={{ height: "none", overflow: "none" }}

            dataLength={toys.length}
            next={fetchMoreToys}
            hasMore={hasMore}
            loader={<div className="item-loader"></div>}
          >
            <ToyList toys={toys} onRemoveToy={onRemoveToy} />
          </InfiniteScroll>
        </>
      ) : (
        <div className="loader"></div>
      )}
    </section>
  )
}