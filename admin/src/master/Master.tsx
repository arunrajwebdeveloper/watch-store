import { Routes, Route } from "react-router-dom";
import { Login, SignUp, Main, AuthenticateScope } from ".";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./styles/auth.styles.css";
import { ProtectedRoute } from "../shared";
import { ToastProvider } from "./context/ToastScope";

const queryClient = new QueryClient();

export const Master = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthenticateScope>
        <ToastProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/u" element={<Login />} />
            <Route path="account/login" element={<Login />} />
            <Route path="account/signup" element={<SignUp />} />
            <Route
              path="/u/*"
              element={
                <ProtectedRoute redirectUrl={"/account/login"}>
                  <Main />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<h1>Page not found</h1>} />
          </Routes>
        </ToastProvider>
      </AuthenticateScope>
    </QueryClientProvider>
  );
};
