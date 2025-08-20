import '../../assets/css/dashboard/nohostel.css';
import { Link } from 'react-router-dom';

function NoHostel() {
    return (
        <div className="information_container">
            <div className="information">
                <p className="message">You are currently not in any Hostel</p>
            </div>
            <div className="information">
                <p className="suggestion">
                    Find one that suits your needs  
                    <Link to='/hostels' className='suggestion_link'>Here</Link>
                </p>
            </div>
            <div className="information">
                <img src="/images/potential.svg" />
            </div>
        </div>
    );
}

export default NoHostel