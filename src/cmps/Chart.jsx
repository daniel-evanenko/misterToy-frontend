import PropTypes from "prop-types"

export function Chart({ data }) {

    Chart.propTypes = {
        data: PropTypes.object.isRequired
    }
    
    return (<ul className="chart">
        {
            data.map((item) => <li key={item.title}>
                <span title={item.title}
                    style={{ height: item.value + '%' }}>
                    {item.value + '%'}
                </span>
            </li>)
        }
    </ul>)
}