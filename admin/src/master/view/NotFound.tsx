import { Link } from "react-router-dom";
import { PageLayout } from "../../layouts";

export const NotFound = () => {
  return (
    <PageLayout>
      <div className="page-not-found-wrapper d-flex align-items-center justify-content-center h-100">
        <div className="page-not-found-content position-relative text-center">
          <img src="/page-not-found-image.png" alt="not found" />
          <h2 className="mt-4 mb-4" style={{ fontSize: "30px" }}>
            404 | Page not found
          </h2>
          <Link className="fw-bold" to="/u/dashboard">
            Go back to home
          </Link>
        </div>
      </div>
    </PageLayout>
  );
};
