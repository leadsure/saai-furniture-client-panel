import { Route, Routes } from "react-router-dom";
import {
  AddBlog,
  AddClient,
  BlogPage,
  ClientLoginForm,
  DiningDynamics,
  DiningPage,
  Layout,
  LoginProtection,
  MarketArea,
  NotFound,
  Protected,
  Sofa,
  SofaDynamicPage,
} from "./components";

export default function App() {
  return (
    <div className="flex w-screen min-h-screen flex-col items-center justify-between ">
      <Routes>
        <Route
          index
          element={<Protected component={<Layout component={<Sofa />} />} />}
        />

        <Route
          path="/market-area"
          element={
            <Protected component={<Layout component={<MarketArea />} />} />
          }
        />
        <Route
          path="/sofa"
          element={<Protected component={<Layout component={<Sofa />} />} />}
        />
        <Route
          path="/sofa/:categoryName"
          element={
            <Protected component={<Layout component={<SofaDynamicPage />} />} />
          }
        />
        <Route
          path="/blog"
          element={
            <Protected component={<Layout component={<BlogPage />} />} />
          }
        />
        <Route
          path="/dining"
          element={
            <Protected component={<Layout component={<DiningPage />} />} />
          }
        />
        <Route
          path="/dining/:categoryName"
          element={
            <Protected component={<Layout component={<DiningDynamics />} />} />
          }
        />
        <Route
          path="/login"
          element={
            <LoginProtection
              component={
                <Layout
                  component={
                    <div className="w-screen h-screen flex justify-center items-center">
                      <ClientLoginForm />
                    </div>
                  }
                />
              }
            ></LoginProtection>
          }
        />

        <Route
          path="/dashboard/add-admin"
          element={
            <Protected
              component={
                <Layout
                  component={
                    <div className="w-screen h-screen flex justify-center items-center">
                      <AddClient />
                    </div>
                  }
                />
              }
            />
          }
        />

        <Route
          path="/dashboard/add-blog"
          element={
            <Protected
              component={
                <Layout
                  component={
                    <div className="w-screen h-screen flex justify-center items-center">
                      <AddBlog />
                    </div>
                  }
                />
              }
            />
          }
        />

        <Route path="*" element={<Layout component={<NotFound />} />} />
      </Routes>
    </div>
  );
}
