import "./App.css";
import Header from "./components/header";
import Layout from "./components/layout";
import { TaskProvider } from "./context/TaskContext";
import CategoriesContainer from "./components/categoriesContainer";
import { Toaster } from "./components/ui/toaster";
import { ThemeProvider } from "./components/theme-provider";
import useCheckPWASupport from "./hooks/usecheckPWASupport";
import { Route, Routes } from "react-router-dom";
import Stat from "./components/pages/stat";

function App() {
  useCheckPWASupport();
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TaskProvider>
        <Toaster />
        <Routes>
          <Route
            path="/muhasiba-dev"
            element={
              <Layout>
                <>
                  <Header />
                  <CategoriesContainer />
                </>
              </Layout>
            }
          ></Route>
          <Route
            path="/muhasiba-dev/stat"
            element={
              <Layout>
                <Stat />
              </Layout>
            }
          ></Route>
        </Routes>
      </TaskProvider>
    </ThemeProvider>
  );
}

export default App;
