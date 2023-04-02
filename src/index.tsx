import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createGlobalStyle } from "styled-components";
import App from "./App";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

// const GlobalStyles = createGlobalStyle`
//   * {
//     margin: 0;
//     padding: 0;
//     box-sizing: border-box;
//   }

//   body {
//     margin: 0;
//     font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
//       'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
//       sans-serif;
//     -webkit-font-smoothing: antialiased;
//     -moz-osx-font-smoothing: grayscale;
//     background-color: #1f034e;
//   }

//   code {
//     font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
//       monospace;
//   }
// `;

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
	<QueryClientProvider client={queryClient}>
		<Provider store={store}>
			{/* <GlobalStyles /> */}
			<App />
		</Provider>
	</QueryClientProvider>,
);
