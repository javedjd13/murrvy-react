import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { appRouteConfig } from "./routeConfig";
import RouteFallback from "@/shared/ui/RouteFallback";

const router = createBrowserRouter(appRouteConfig);

const AppRouter = () => {
  return <RouterProvider fallbackElement={<RouteFallback />} router={router} />;
};

export default AppRouter;
