import "./styles/main.css";

const modal: HTMLElement | null = document.querySelector("#modal");
const modalContent: HTMLElement | null = document.querySelector("#modal-content");
const openModalBtn: HTMLElement | null = document.querySelector("#trigger-open-modal");
const closeModalBtn: HTMLElement | null = document.querySelector("#trigger-close-modal");

if (modal && modalContent && openModalBtn && closeModalBtn) {
    const signInForm = createSignInForm();

    openModalBtn.addEventListener("click", () => {
        modal.style.display = "flex";
        modalContent.append(signInForm);
    });

    closeModalBtn.addEventListener("click", () => {
        modalContent.removeChild(signInForm);
        modal.style.display = "none";
    });
}

function createSignInForm (): HTMLFormElement {
    const form: HTMLFormElement = document.createElement("form");
    form.classList.add("form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        // здесь можно добавит логику обработки формы.
        console.log("Отправил");
    });

    const formTitle = document.createElement("h2");
    formTitle.classList.add("form__title");
    form.appendChild(formTitle);

    const fieldContainer = createFormElementsContainer();
    const inputContact: HTMLInputElement = document.createElement("input");
    inputContact.classList.add("form__input");
    inputContact.setAttribute("type", "text");
    inputContact.setAttribute("placeholder", "Email/Телефон");
    inputContact.setAttribute("name", "contact");
    fieldContainer.appendChild(inputContact);

    const inputPassword: HTMLInputElement = document.createElement("input");
    inputPassword.classList.add("form__input");
    inputPassword.setAttribute("type", "password");
    inputPassword.setAttribute("placeholder", "Пароль");
    inputPassword.setAttribute("name", "password");
    fieldContainer.appendChild(inputPassword);
    form.appendChild(fieldContainer);
    
    const labelSavePass: HTMLLabelElement = document.createElement("label");
    labelSavePass.classList.add("form__save-password");
    labelSavePass.textContent = "Запомнить пароль";
    
    const checkboxSavePass: HTMLInputElement = document.createElement("input");
    checkboxSavePass.setAttribute("type", "checkbox");
    checkboxSavePass.setAttribute("name", "savePassword");
    labelSavePass.prepend(checkboxSavePass);
    form.appendChild(labelSavePass);

    const recover: HTMLAnchorElement = document.createElement("a");
    recover.classList.add("form__recover");
    recover.setAttribute("href", "#");
    recover.textContent = "Восстановить";
    form.appendChild(recover);

    const actionsContainer = createFormElementsContainer();
    actionsContainer.style.marginTop = "36px";

    const submitBtn = createActionsBtn("form__submit");
    submitBtn.textContent = "Войти";
    actionsContainer.appendChild(submitBtn);

    const registerBtn = createActionsBtn("form__register");
    registerBtn.textContent = "Зарегестрироваться";
    registerBtn.addEventListener("click", () => {
        // здесь может быть логика по замене формы в модальном окне.
    });
    actionsContainer.appendChild(registerBtn);
    form.appendChild(actionsContainer);

    return form;
};

function createFormElementsContainer (): HTMLDivElement {
    const div = document.createElement("div");
    div.style.width = "100%";
    div.style.marginTop = "18px";
    div.style.display = "flex";
    div.style.flexDirection = "column";
    div.style.alignItems = "center";
    div.style.gap = "4px";

    return div;
};

function createActionsBtn (className?: string): HTMLButtonElement {
    const btn = document.createElement("button");
    btn.classList.add("form__btn");

    if (className) {
        btn.classList.add(className);
    }

    return btn;
};