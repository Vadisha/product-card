export class Form {

    constructor(formId) {
        this.formElement = document.getElementById(formId);
    }

    getFormData() {
        return Object.fromEntries(new FormData(this.formElement));
    }

    isValid() {
        return this.formElement.checkValidity();
    }

    resetForm() {
        return this.formElement.reset();
    }
    
}