import { ToyPreview } from "./ToyPreview.jsx"
import { Link } from "react-router-dom"
export function ToyList({ toys, onRemoveToy }) {

  return (
    <ul className="toy-list">
      {toys.length > 0
        ? toys.map(toy => <li key={toy._id}>
          <ToyPreview toy={toy} />
          <section>
            <button onClick={() => onRemoveToy(toy)}>Remove</button>
            <button>
              <Link to={`/toy/${toy._id}`}>Details</Link>
            </button>
            <button>
              <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
            </button>
          </section>
        </li>)
        : <p>No toys to show</p>}
    </ul>
  )
}