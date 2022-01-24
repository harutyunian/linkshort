import {Link} from "react-router-dom";

const LinksList = ({links}) => {

    if (!links.length) {
        return <h2>No links yet</h2>
    }
    return (
        <table>
            <thead>
            <tr>
                <th>To</th>
                <th>From</th>
                <th>Open Link</th>
            </tr>
            </thead>

            <tbody>
            {
                links.map((item) => {
                    return (
                        <tr key={item._id}>
                            <td>{item.from}</td>
                            <td>{item.to}</td>
                            <td><Link to={`/details/${item._id}`}>Open</Link></td>
                        </tr>)
                })
            }

            </tbody>
        </table>

    )
}
export default LinksList