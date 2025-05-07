import { Link, Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <nav>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/transactions">Transactions</Link></li>
        </ul>
      </nav>
      <div className="content">
        <Outlet />  {/* Render nested route content here */}
      </div>
    </div>
  );
};

export default DashboardLayout;
