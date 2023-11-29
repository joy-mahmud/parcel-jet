import { Link } from "react-router-dom";


const ErrorPage = () => {
    return (
        <div className="text-center mt-20">
            <h2>404! Page not found</h2>
            <button className="btn btn-primary"><Link to={'/'}>Back</Link></button>
        </div>
    );
};

export default ErrorPage;