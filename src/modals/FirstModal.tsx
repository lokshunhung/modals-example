import { useState } from "react";
import ReactModal from "react-modal";
import { useModalManager } from "../utils/ModalManager";
import styles from "./modals.module.css";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onOpenSecondModal: () => void;
}

export const FirstModal = (props: Props) => {
    const { isOpen, onClose, onOpenSecondModal } = props;
    const [makeLonger, setMakeLonger] = useState(false);
    return (
        <ReactModal isOpen={isOpen} onRequestClose={onClose} overlayClassName={styles.overlay}>
            <h2>first modal</h2>
            <button type="button" onClick={onClose} className={styles.close}>
                X
            </button>

            {Array.from({ length: makeLonger ? 20 : 1 }, (_, i) => (
                <p key={i}>test</p>
            ))}

            <button type="button" onClick={() => setMakeLonger(_ => !_)}>
                Toggle length
            </button>

            <button type="button" onClick={onOpenSecondModal}>
                Open second modal
            </button>
        </ReactModal>
    );
};

export const ManagedFirstModal = () => {
    const { isModalOpened, openModal, closeModal } = useModalManager();
    const isOpen = isModalOpened("FirstModal");
    if (!isOpen) return null;
    return (
        <FirstModal
            isOpen={isOpen}
            onClose={() => closeModal("FirstModal")}
            onOpenSecondModal={() => openModal("SecondModal")}
        />
    );
};
