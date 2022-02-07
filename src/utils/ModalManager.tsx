import { Component, createContext, useContext } from "react";

export type ModalType = "FirstModal" | "SecondModal";

export interface ModalManagerContextType {
    isModalOpened: (id: ModalType) => boolean;
    openModal: (id: ModalType) => void;
    closeModal: (id: ModalType) => void;
}

export const ModalManagerContext = createContext<ModalManagerContextType>({
    isModalOpened: () => false,
    openModal: () => {},
    closeModal: () => {},
});

interface Props {
    children: React.ReactNode;
}

interface State extends ModalManagerContextType {
    openedModals: Partial<Record<ModalType, boolean>>;
}

export class ModalManagerProvider extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            openedModals: {},
            isModalOpened: this.isModalOpened,
            openModal: this.openModal,
            closeModal: this.closeModal,
        };
    }

    scrollAttributes: { scrollX: number; scrollY: number } | null = null;

    componentDidUpdate(prevProps: Props, prevState: State) {
        if (prevState.openedModals === this.state.openedModals) {
            return;
        }
        const prevCount = Object.values(prevState.openedModals).filter(isOpen => isOpen).length;
        const currentCount = Object.values(this.state.openedModals).filter(isOpen => isOpen).length;
        if (prevCount === 0 && currentCount === 1) {
            const { scrollX, scrollY } = window;
            this.scrollAttributes = { scrollX, scrollY };
            document.body.style.overflow = "hidden";
            document.body.style.position = "fixed";
            document.body.style.top = `${-scrollY}px`;
            document.body.style.left = `${-scrollX}px`;
            return;
        }
        if (prevCount === 1 && currentCount === 0) {
            document.body.style.overflow = "visible";
            document.body.style.position = "static";
            document.body.style.top = "0";
            document.body.style.left = "0";
            if (this.scrollAttributes !== null) {
                window.scrollTo(this.scrollAttributes.scrollX, this.scrollAttributes.scrollY);
            }
            this.scrollAttributes = null;
            return;
        }
    }

    isModalOpened = (id: ModalType) => Boolean(this.state.openedModals[id]);

    openModal = (id: ModalType) =>
        this.setState(prevState => ({ openedModals: { ...prevState.openedModals, [id]: true } }));

    closeModal = (id: ModalType) =>
        this.setState(prevState => ({ openedModals: { ...prevState.openedModals, [id]: false } }));

    render() {
        const { children } = this.props;
        return <ModalManagerContext.Provider value={this.state}>{children}</ModalManagerContext.Provider>;
    }
}

export const useModalManager = () => useContext(ModalManagerContext);
