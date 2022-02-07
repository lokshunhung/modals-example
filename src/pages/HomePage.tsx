import { useModalManager } from "../utils/ModalManager";
import "./HomePage.css";

const ManyVerticalDots = () => {
    return (
        <>
            {Array.from({ length: 20 }, (_, i) => (
                <p key={i}>.</p>
            ))}
        </>
    );
};

export const HomePage = () => {
    const { openModal } = useModalManager();
    return (
        <div className="home-page">
            <ManyVerticalDots />

            <button type="button" onClick={() => openModal("FirstModal")}>
                Open first modal
            </button>

            <button type="button" onClick={() => openModal("SecondModal")}>
                Open second modal
            </button>

            <ManyVerticalDots />
        </div>
    );
};
