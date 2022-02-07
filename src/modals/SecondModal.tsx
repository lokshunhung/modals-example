import { useState } from "react";
import ReactModal from "react-modal";
import { useModalManager } from "../utils/ModalManager";
import styles from "./modals.module.css";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onOpenFirstModal: () => void;
}

export const SecondModal = (props: Props) => {
    const { isOpen, onClose, onOpenFirstModal } = props;
    const [makeLonger, setMakeLonger] = useState(false);
    return (
        <ReactModal isOpen={isOpen} onRequestClose={onClose} overlayClassName={styles.overlay}>
            <h2>second modal</h2>

            <button type="button" onClick={onClose} className={styles.close}>
                X
            </button>

            {Array.from({ length: makeLonger ? 20 : 1 }, (_, i) => (
                <p key={i}>test</p>
            ))}

            <button type="button" onClick={() => setMakeLonger(_ => !_)}>
                Toggle length
            </button>

            <button type="button" onClick={onOpenFirstModal}>
                Open first modal
            </button>
        </ReactModal>
    );
};

export const ManagedSecondModal = () => {
    const { isModalOpened, closeModal, openModal } = useModalManager();
    const isOpen = isModalOpened("SecondModal");
    if (!isOpen) return null;
    return (
        <SecondModal
            isOpen={isOpen}
            onClose={() => closeModal("SecondModal")}
            onOpenFirstModal={() => openModal("FirstModal")}
        />
    );
};
