import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import styled, { ThemeProvider } from "styled-components";
import { store, persistor } from "./redux/store";
import { AppRoutes } from "./AppRoutes";
import { GlobalStyle } from "./styles/GlobalStyle";
import { theme } from "./styles/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const queryClient = new QueryClient();

export function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <QueryClientProvider client={queryClient}>
                <PageWrapper>
                  <AppRoutes />
                </PageWrapper>
              </QueryClientProvider>
            </PersistGate>
          </Provider>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}
