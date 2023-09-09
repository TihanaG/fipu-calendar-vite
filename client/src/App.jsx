import { RouterProvider, createBrowserRouter } from "react-router-dom";

import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  Reports,
  EventTrackerController,
  Profile,
  Admin,
  VacationRequest,
  AdminVacationRequests,
  EditVacationRequest,
  MyRequests,
  MyRequest,
} from "./pages";

import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { loader as allEventsLoader } from "./pages/EventTrackerController";
import { action as addEventAction } from "./pages/EventTrackerController";
import { loader as adminLoader } from "./pages/Admin";
import { action as profileAction } from "./pages/Profile";
import { loader as reportsLoader } from "./pages/Reports";
import { action as addVacationRequestAction } from "./pages/VacationRequest";
import { loader as adminVacationRequestsLoader } from "./pages/AdminVacationRequests";
import { loader as editVacationRequestsLoader } from "./pages/EditVacationRequest";
import { action as editVacationRequestsAction } from "./pages/EditVacationRequest";
import { action as deleteEventsAction } from "./pages/DeleteEvents";
import { loader as myRequestsLoader } from "./pages/MyRequests";
import { loader as myRequestLoader } from "./pages/MyRequest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <EventTrackerController />,
            loader: allEventsLoader,
            action: addEventAction,
          },
          {
            path: "reports",
            element: <Reports />,
            loader: reportsLoader,
          },
          {
            path: "profile",
            element: <Profile />,
            action: profileAction,
          },
          {
            path: "vacation-request",
            element: <VacationRequest />,
            action: addVacationRequestAction,
          },
          {
            path: "my-requests",
            element: <MyRequests />,
            loader: myRequestsLoader,
          },
          {
            path: "my-requests/:id",
            element: <MyRequest />,
            loader: myRequestLoader,
          },
          {
            path: "monthly-report",
            element: <Admin />,
            loader: adminLoader,
          },
          {
            path: "vacation-requests",
            element: <AdminVacationRequests />,
            loader: adminVacationRequestsLoader,
          },
          {
            path: "edit-vacation-request/:id",
            element: <EditVacationRequest />,
            loader: editVacationRequestsLoader,
            action: editVacationRequestsAction,
          },
          {
            path: "delete-events/:year/:month",
            action: deleteEventsAction,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
