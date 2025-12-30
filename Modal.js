export class Modal {

    constructor(modalId) {
        this.modalElement = document.getElementById(modalId);
        this.overlayElement = document.getElementById('overlay');
    }

    open() {
        this.modalElement.classList.add('modal--showed');
        this.overlayElement.classList.add('overlay--showed');
    }

    close() {
        this.modalElement.classList.remove('modal--showed');
        this.overlayElement.classList.remove('overlay--showed');
    }

    checkIsOpenModal() {
        return this.modalElement.classList.contains('modal--showed');
    }

    setupEventListeners(closeButtonSelector) {
        const closeButton = this.modalElement.querySelector(closeButtonSelector);
        
        if (closeButton) {
            closeButton.addEventListener('click', (event) => {
                event.preventDefault();
                this.close();
            });
        }

        if (this.overlayElement) {
            this.overlayElement.addEventListener('click', () => {
                this.close();
            });
        }
    }
    
}