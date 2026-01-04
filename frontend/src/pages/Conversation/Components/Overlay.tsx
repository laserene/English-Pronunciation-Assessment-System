import "./overlay.css"

interface OverlayProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Overlay = ({ isOpen, onClose, children }: OverlayProps) => {
    if (!isOpen) return null;

    return (
        <div className="overlay-backdrop" onClick={onClose}>
            <div
                className="overlay-content"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

export default Overlay;