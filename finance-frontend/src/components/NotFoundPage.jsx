import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div>
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <Link to={"/"}>
            // link component - navigation is instant without refreshing the page, allows for better user experience
                <button>Go back to Home</button>
            </Link>
        </div>
    );
};

export default NotFoundPage;