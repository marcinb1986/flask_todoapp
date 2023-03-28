import { Route, Routes } from "react-router-dom";
import React, { lazy, Suspense } from "react";
// import { GetActions } from "./screens/get-actions/get-actions";
// import { AddActions } from "./screens/add-actions/add-actions";

const AddActions = lazy(() => import("./screens/add-actions/add-actions"));
const GetActions = lazy(() => import("./screens/get-actions/get-actions"));
const OneAction = lazy(() => import("./screens/one-action/one-action"));
const Login = lazy(() => import("./screens/login/login"));
const Toolbar = lazy(() => import("./components/toolbar/toolbar"));

export const Routing = () => {
  return (
    <div>
      <Toolbar />
      <Suspense fallback={<div>...Loading</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/getActions" element={<GetActions />} />
          <Route path="/addActions" element={<AddActions />} />
          <Route path="/seeOneAction/:actionId" element={<OneAction />} />
        </Routes>
      </Suspense>
    </div>
  );
};
