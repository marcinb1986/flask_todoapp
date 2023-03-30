import { Route, Routes, Navigate } from "react-router-dom";
import React, { lazy, Suspense } from "react";

const AddActions = lazy(() => import("./screens/add-actions/add-actions"));
const GetActions = lazy(() => import("./screens/get-actions/get-actions"));
const OneAction = lazy(() => import("./screens/one-action/one-action"));
const Login = lazy(() => import("./screens/login/login"));
// const Toolbar = lazy(() => import("./components/toolbar/toolbar"));

export const Routing = () => {
  return (
    <div>
      {/* <Toolbar /> */}
      <Suspense fallback={<div>...Loading</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/getActions" element={<GetActions />} />
          <Route path="/addActions" element={<AddActions />} />
          <Route path="/seeOneAction/:actionId" element={<OneAction />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
};
