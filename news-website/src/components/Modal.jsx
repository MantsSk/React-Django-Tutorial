import './Modal.css'

function Modal({show, onClose, children}) {
    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className = "modal">
                <button className="close-button" onClick={onClose}>X</button>
                {children}
            </div>
        </div>
    );
}

export default Modal;