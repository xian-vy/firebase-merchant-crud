import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoutes";
import PublicRoute from "./components/PublicRoutes";
import { ROUTES } from "./constants/routes";
import { populateInitialCategories } from "./firebase/inititalCategories";
function App() {
  console.log("App.");
  useEffect(() => {
    populateInitialCategories();
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          {ROUTES.map((route) => {
            const RouteElement = (
              <React.Suspense
                fallback={
                  <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh">
                    Loading...
                  </Box>
                }
              >
                {route.element}
              </React.Suspense>
            );

            if (route.isPrivate) {
              return (
                <Route key={route.path} path={route.path} element={<ProtectedRoute />}>
                  <Route index element={RouteElement} />
                </Route>
              );
            } else {
              return <Route key={route.path} path={route.path} element={<PublicRoute>{RouteElement}</PublicRoute>} />;
            }
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default React.memo(App);
