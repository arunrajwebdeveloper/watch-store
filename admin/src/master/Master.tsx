import { Routes, Route } from "react-router-dom";
import { Login, SignUp, Main, AuthenticateScope } from ".";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./styles/auth.styles.css";
import { ProtectedRoute } from "../shared";

const queryClient = new QueryClient();

export const Master = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthenticateScope>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="account/login" element={<Login />} />
          <Route path="account/signup" element={<SignUp />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute redirectUrl={"account/login"}>
                <Main />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </AuthenticateScope>
    </QueryClientProvider>
  );
};
