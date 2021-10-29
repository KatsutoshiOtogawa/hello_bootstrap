//@ts-check
import { validate } from './modules/validate.mjs';

/** @type {HTMLInputElement} */
const exampleInputEmail1 = document.querySelector("#exampleInputEmail1");

/** @type {HTMLInputElement} */
const exampleInputEmail2 = document.querySelector("#exampleInputEmail2");

/** @type {HTMLDivElement} */
const errorDiv = document.querySelector('#emailAlertDanger');

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
    const judge = validate.emailAddress(exampleInputEmail1, exampleInputEmail2);
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
 * 生年月日の確認
 * @returns void
 */
function checkInputDate() {

    const judge = validate.existDate(birth_date);
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

birth_date.addEventListener('blur', () => {
    checkInputDate();
})