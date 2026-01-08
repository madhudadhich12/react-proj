import Modal from "./Modal";
import ActionButton from "./ActionButton";

type ConfirmationModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmJson?: {
        label: string;
        variant: "primary" | "danger" | "secondary";
    };
};

export default function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmJson = { label: "Confirm", variant: "primary" },
}: ConfirmationModalProps) {
    if (!isOpen) return null;

    return (
        <Modal title={title} onClose={onClose}>
            <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed text-base">
                    {message}
                </p>

                <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-gray-100">
                    <ActionButton
                        variant="secondary"
                        onClick={onClose}
                        className="w-full sm:w-auto"
                    >
                        Cancel
                    </ActionButton>

                    <ActionButton
                        variant={confirmJson.variant}
                        onClick={onConfirm}
                        className="w-full sm:w-auto"
                    >
                        {confirmJson.label}
                    </ActionButton>
                </div>
            </div>
        </Modal>
    );
}
