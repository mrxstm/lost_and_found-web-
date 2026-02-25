import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "../pages/admin/AdminLayout";
import AdminRoutes from "./AdminRoutes";
import PrivateRoutes from "./PrivateRoutes";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

import Home from "../pages/public/HomePage/Home";

// lazy imports for other pages
const Search = React.lazy(() => import("../pages/private/SearchPage/Search"));
const MyReports = React.lazy(() => import("../pages/private/MyReportsPage/MyReports"));
const Profile = React.lazy(() => import("../pages/private/ProfilePage/Profile"));
const ReportItem = React.lazy(() => import("../pages/private/ReportItemPage/ReportItem"));
const Product = React.lazy(() => import("../pages/private/ProductPage/Product"));
const Item = React.lazy(() => import("../pages/private/ItemPage/ItemPage"));
const Dashboard = React.lazy(() => import("../pages/admin/childrenpages/Dashboard"));
const Users = React.lazy(() => import("../pages/admin/childrenpages/Users"));

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />

      {/* Protected user routes */}
      <Route element={<PrivateRoutes />}>
        <Route
          path="/search"
          element={
            <Suspense fallback={<div className="text-center">Loading Search...</div>}>
              <Search />
            </Suspense>
          }
        />
        <Route
          path="/profile"
          element={
            <Suspense fallback={<div className="text-center">Loading Profile...</div>}>
              <Profile />
            </Suspense>
          }
        />
        <Route
          path="/myreports"
          element={
            <Suspense fallback={<div className="text-center">Loading MyReports...</div>}>
              <MyReports />
            </Suspense>
          }
        />
        <Route
          path="/report-item"
          element={
            <Suspense fallback={<div className="text-center">Loading ReportItem...</div>}>
              <ReportItem />
            </Suspense>
          }
        />
        <Route
          path="/product"
          element={
            <Suspense fallback={<div className="text-center">Loading Product...</div>}>
              <Product />
            </Suspense>
          }
        />
          <Route
          path="/item/:id"
          element={
            <Suspense fallback={<div className="text-center">Loading Item...</div>}>
              <Item />
            </Suspense>
          }
        />
      </Route>

      {/* Admin routes */}
      <Route element={<AdminRoutes />}>
        <Route element={<AdminLayout />}>
          <Route
            path="/admin/dashboard"
            element={
              <Suspense fallback={<div className="text-center">Loading Dashboard...</div>}>
                <Dashboard/>
              </Suspense>
            }
          />
        </Route>

         <Route element={<AdminLayout />}>
          <Route
            path="/admin/users"
            element={
              <Suspense fallback={<div className="text-center">Loading User...</div>}>
                <Users/>
              </Suspense>
            }
          />
        </Route>
        
      </Route>

      {/* Not found */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
