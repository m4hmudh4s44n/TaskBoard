import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { BoardProvider } from "./contexts/BoardContext";
import { PrivateRoute } from "./components/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import BoardPage from "./pages/BoardPage";
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <Switch>
      <Route path={"/login"} component={LoginPage} />
      <Route path={"/board"}>
        <PrivateRoute>
          <BoardPage />
        </PrivateRoute>
      </Route>
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route>
        {() => {
          // Redirect to board if authenticated, otherwise to login
          return <LoginPage />;
        }}
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <AuthProvider>
          <BoardProvider>
            <TooltipProvider>
              <Toaster />
              <Router />
            </TooltipProvider>
          </BoardProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
