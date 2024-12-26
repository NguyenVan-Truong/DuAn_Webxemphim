import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "../src/Styles/global.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "mantine-react-table/styles.css";
import App from "./App.tsx";

import { Button, MantineProvider, createTheme, rem } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
const queryClient = new QueryClient();

const theme = createTheme({
    fontSizes: {
        xs: rem(10),
        sm: rem(12),
        md: rem(14),
        lg: rem(16),
        xl: rem(20),
    },
    lineHeights: {
        xs: "1.4",
        sm: "1.45",
        md: "1.55",
        lg: "1.6",
        xl: "1.65",
    },
    components: {
        Button: Button.extend({
            defaultProps: {
                color: "cyan",
                variant: "outline",
                //  size: "xs",
            },
        }),
    },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
    // <React.StrictMode>
    <MantineProvider theme={theme}>
        <Notifications />
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <ModalsProvider>
                    <App />
                </ModalsProvider>
            </BrowserRouter>
        </QueryClientProvider>
    </MantineProvider>,
    // </React.StrictMode>,
);
