import React from "react";
import "./Modal.scss";
const Modal = ({ handleClose, show, children }) => {
    return (
        <div className={show ? "modal_wrapper d_block" : "modal_wrapper d_none"}>
            <section className="modal__container">
                {children}
                <button className="modal__close-btn" onClick={handleClose}>x</button>
            </section>
        </div>
    );
};
export default Modal; 