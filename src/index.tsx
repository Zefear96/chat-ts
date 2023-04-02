import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { createGlobalStyle } from "styled-components";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
	<BrowserRouter basename="/">
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				{/* <GlobalStyles /> */}
				<App />
			</Provider>
		</QueryClientProvider>
	</BrowserRouter>,
);
