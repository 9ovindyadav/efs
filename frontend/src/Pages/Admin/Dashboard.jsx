import {Link} from "react-router-dom";
import "../../sass/dashboard.scss";
export const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="content">

      </div>
      <Sidebar />
    </div>
  )
}

export const Sidebar = () => {

  return (
    <div className="sidebar">
        <Link to={"/admin/products"}><p>Images</p></Link>
        <Link to={"/admin/product/create"}><p>Upload image</p></Link>
      </div>
  )
}