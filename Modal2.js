export class Modal {
  constructor(modalId, buttonId, shouldCloseOnOverlay) {
    this.modal = document.getElementById(modalId);
    this.overlay = document.getElementById('overlay');
    this.shouldCloseOnOverlay = shouldCloseOnOverlay;
    this.#initOpen(buttonId);
    this.#initClose();
  }

  open() {
    this.modal.classList.add('modal-showed');
    this.overlay.classList.add('overlay-showed');
  }

  close() {
    this.modal.classList.remove('modal-showed');
    this.overlay.classList.remove('overlay-showed');
  }

  isOpen() {
    return this.modal.classList.contains('modal-showed');
  }

  #initOpen(buttonId) {
    const button = document.getElementById(buttonId);
    button.addEventListener('click', () => {
      this.open();
    });
  }

  #initClose() {
    const closeButton = this.modal.querySelector('.modal-close-button');

    closeButton.addEventListener('click', () => {
      this.close();
    });
    
    this.modal.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    
    this.overlay.addEventListener('click', () => {
      if (this.isOpen() && this.shouldCloseOnOverlay) {
        this.close();
      }
    });
  }
}