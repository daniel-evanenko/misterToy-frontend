export function ToyPreview({ toy }) {
    return (
        <article className="toy-preview">
            <h2 >Toy: {toy.name}</h2>
            <img src={toy.imgUrl} alt={toy.name} />
            <h4>Price: ${toy.price}</h4>
            <h4 >In Stock: {toy.inStock
                ? <span className="available">Available</span>
                : <span className="unavailable">Out of Stock</span>}</h4>
        </article>

    )
}
