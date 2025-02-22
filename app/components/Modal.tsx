import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    isFull?: boolean;
    isBackdrop?: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, isFull = false, isBackdrop = false }) => {
    if (!isOpen) return null;

    return (
        <div className={`fixed inset-0 flex items-start justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50  ${isFull ? 'p-2' : ''} `} >
            <div className={` ${isFull ? 'w-full h-full px-6 pt-4 pb-28' : 'p-4 w-full max-w-[300px] lg:max-w-[850px] mt-36'} rounded-lg  relative ${isBackdrop ? 'bg-transparent border-none' : 'border-2 border-black  bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'}`}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
