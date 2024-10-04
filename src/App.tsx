import "./App.css";
import axios from "axios";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import TasksPage from "./Tasks";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 2,
      },
    },
    queryCache: new QueryCache({
      onError: (error: Error) => {
        const messageError = "message" in error && error.message;
        console.log(messageError);
        return;
      },
    }),
  });

  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

const AppContent = () => {
  return <TasksPage />;
};

export default App;
