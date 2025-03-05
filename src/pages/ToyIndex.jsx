import { ToyFilter } from "../cmps/ToyFilter.jsx"
import { ToyList } from "../cmps/ToyList.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { loadToys, removeToy } from "../store/actions/toy.actions.js"
import { SET_FILTER_BY } from "../store/reducers/toy.reducer.js"
import { addUserActivity } from "../store/actions/user.actions.js"
import { showModal } from "../store/actions/modal.actions.js"
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

export function ToyIndex() {
  const dispatch = useDispatch()
  const toys = useSelector(storeState => storeState.toyModule.toys)
  const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
  const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

  useEffect(() => {
    loadToys().catch(() => showErrorMsg('Cannot load todos'))
  }, [filterBy])

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

  return (
    <section className="toy-index">
      <ToyFilter filterBy={filterBy} onSetFilterBy={onSetFilter} />
      <div>
        <Link to="/toy/edit" className="btn">Add Toy</Link>
      </div>
      {!isLoading
        ? <>
          <h2>Toys List</h2>
          <ToyList toys={toys} onRemoveToy={onRemoveToy} />
        </>
        : <div className="loader"></div>
      }
    </section>
  )
}