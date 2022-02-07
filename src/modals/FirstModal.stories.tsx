import { ComponentMeta, Story } from "@storybook/react";
import { useState } from "react";
import { FirstModal } from "./FirstModal";

export const FirstModal_: Story<React.ComponentProps<typeof FirstModal>> = args => {
    const [isOpen, setIsOpen] = useState(true);
    const onClose = () => setIsOpen(false);
    const onClick = () => setIsOpen(true);
    return (
        <>
            <button onClick={onClick}>open</button>
            <FirstModal {...args} isOpen={isOpen} onClose={onClose} />
        </>
    );
};

const meta: ComponentMeta<typeof FirstModal> = {
    component: FirstModal,
    title: "modals/First Modal",
};

export default meta;
