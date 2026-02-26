import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";
import { ROUTE_PATHS } from "@/router/routePaths";

const RouteError = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <section className="container py-5 text-center">
        <h1 className="mb-2">Something went wrong</h1>
        <p className="mb-4">
          {error.status} {error.statusText}
        </p>
        <Link className="btn btn-dark" to={ROUTE_PATHS.HOME}>
          Back to home
        </Link>
      </section>
    );
  }

  return (
    <section className="container py-5 text-center">
      <h1 className="mb-2">Unexpected error</h1>
      <p className="mb-4">
        {error instanceof Error ? error.message : "Please try again."}
      </p>
      <Link className="btn btn-dark" to={ROUTE_PATHS.HOME}>
        Back to home
      </Link>
    </section>
  );
};

export default RouteError;
