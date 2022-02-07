import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ManagedFirstModal } from "./modals/FirstModal";
import { ManagedSecondModal } from "./modals/SecondModal";
import { HomePage } from "./pages/HomePage";
import { ModalManagerProvider } from "./utils/ModalManager";

const PageRoutes = () => {
    return (
        <Switch>
            <Route exact path="/" component={HomePage} />
        </Switch>
    );
};

const ModalRoutes = () => {
    return (
        <>
            <ManagedFirstModal />
            <ManagedSecondModal />
        </>
    );
};

const AppProviders: React.FunctionComponent = ({ children }) => {
    return (
        <BrowserRouter>
            <ModalManagerProvider>{children}</ModalManagerProvider>
        </BrowserRouter>
    );
};

export const App = () => {
    return (
        <AppProviders>
            <PageRoutes />
            <ModalRoutes />
        </AppProviders>
    );
};
