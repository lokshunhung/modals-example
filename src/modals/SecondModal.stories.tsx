import { ComponentMeta, Story } from "@storybook/react";
import { useState } from "react";
import { SecondModal } from "./SecondModal";

export const SecondModal_: Story<React.ComponentProps<typeof SecondModal>> = args => {
    const [isOpen, setIsOpen] = useState(true);
    const onClose = () => setIsOpen(false);
    const onClick = () => setIsOpen(true);
    return (
        <>
            <button onClick={onClick}>open</button>
            <SecondModal {...args} isOpen={isOpen} onClose={onClose} />
        </>
    );
};

const meta: ComponentMeta<typeof SecondModal> = {
    component: SecondModal,
    title: "modals/Second Modal",
};

export default meta;
