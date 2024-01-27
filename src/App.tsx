import "./App.css";
import Header from "./components/header";
import Layout from "./components/layout";
import { TaskProvider } from "./context/TaskContext";
import CategoriesContainer from "./components/categoriesContainer";
import { Toaster } from "./components/ui/toaster";
import { ThemeProvider } from "./components/theme-provider";
import useCheckPWASupport from "./hooks/usecheckPWASupport";

function App() {
  useCheckPWASupport();
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TaskProvider>
        <Toaster />
        <Layout>
          <Header />
          <CategoriesContainer />
        </Layout>
      </TaskProvider>
    </ThemeProvider>
  );
}

export default App;
