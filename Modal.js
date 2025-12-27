export class Modal {

    constructor(modalId) {
        this.modalId = document.getElementById(modalId);
        this.modalOverlay = document.getElementById('overlay');
    }

    open() {
        this.modalId.classList.add('modal--showed');
        this.modalOverlay.classList.add('overlay--showed');
    }

    close() {
        this.modalId.classList.remove('modal--showed');
        this.modalOverlay.classList.remove('overlay--showed');
    }

    checkIsOpenModal() {
        return this.modalId.classList.contains('modal--showed');
    }
    
}  