//@ts-check
import { htmlValidator } from './modules/htmlvalidator.mjs';

/** @type {HTMLInputElement} */
const exampleInputEmail1 = document.querySelector("#exampleInputEmail1");

/** @type {HTMLInputElement} */
const exampleInputEmail2 = document.querySelector("#exampleInputEmail2");

/** @type {HTMLDivElement} */
const errorDiv = document.querySelector('#emailAlertDanger');

/** @type {HTMLInputElement} */
const InputPassword = document.querySelector("#InputPassword");

/** @type {HTMLInputElement} */
const checkInputPassword = document.querySelector("#checkInputPassword");

/** @type {HTMLDivElement} */
const passwordAlertDanger = document.querySelector('#passwordAlertDanger');

/** @type {HTMLInputElement} */
const birth_date = document.querySelector('#birth_date');

/** @type {HTMLDivElement} */
const birth_dateAlertDanger = document.querySelector('#birth_dateAlertDanger');

/**
 * exampleInputEmail1とexampleInputEmail2を比較し、処理を行うための関数。
 * @returns void
 */
function checkInputEmail() {
    // フィールドの値を比較。
    const judge = htmlValidator.emailAddress(exampleInputEmail1, exampleInputEmail2);
    // undefinedなら処理を抜ける（どちらかが空など。）。
    if (judge.ok === undefined) {
        return;
    }
    // 同じemailAddressでないならエラーを表示させる。
    if (!judge.ok) {
        errorDiv.style.display = "block";
        // ユーザー用のメッセージを設定する
        errorDiv.textContent = judge.message;
    }else{
        errorDiv.style.display = "none";
    }
}

/**
 * exampleInputEmail1とexampleInputEmail2を比較し、処理を行うための関数。
 * @returns void
 */
function checkPassword() {
    // フィールドの値を比較。
    // const judge = htmlValidator.emailAddress(exampleInputEmail1, exampleInputEmail2);
    const judge = htmlValidator.checkPassword(InputPassword, checkInputPassword);
    // undefinedなら処理を抜ける（どちらかが空など。）。
    if (judge.ok === undefined) {
        return;
    }
    // 同じemailAddressでないならエラーを表示させる。
    if (!judge.ok) {
        passwordAlertDanger.style.display = "block";
        // ユーザー用のメッセージを設定する
        passwordAlertDanger.textContent = judge.message;
    }else{
        passwordAlertDanger.style.display = "none";
    }
}

/**
 * 生年月日の確認
 * @returns void
 */
function checkInputDate() {

    const judge = htmlValidator.existDate(birth_date);
    // undefinedなら処理を抜ける（どちらかが空など。）。
    if (judge.ok === undefined) {
        return;
    }
    if (!judge.ok) {
        birth_dateAlertDanger.style.display = "block";
        // ユーザー用のメッセージを設定する
        birth_dateAlertDanger.textContent = judge.message;
    }else{
        birth_dateAlertDanger.style.display = "none";
    }
}

exampleInputEmail1.addEventListener('blur', () => {
    checkInputEmail();
})

exampleInputEmail2.addEventListener('blur', () => {
    checkInputEmail();
})

InputPassword.addEventListener('blur', () => {
    checkPassword();
})

checkInputPassword.addEventListener('blur', () => {
    checkPassword();
})
birth_date.addEventListener('blur', () => {
    checkInputDate();
})