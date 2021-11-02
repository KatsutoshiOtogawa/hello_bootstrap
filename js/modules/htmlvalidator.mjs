// // @ts-check

import '//cdn.jsdelivr.net/npm/zxcvbn@4.4/dist/zxcvbn.min.js';

// import validator from '//cdn.jsdelivr.net/npm/validator@13.6/validator.js';
// import '//cdn.jsdelivr.net/npm/validator@13.6/validator.js';

// import 'https://unpkg.com/validator@13.6/validator.min.js';

// import validator from './validator.mjs'

/**
 * signupでログインがあっているか確認。どちらかに値が入力されていない場合は処理は未定義
 * @param {HTMLInputElement} emailInputElement ユーザーがメールアドレスを入力したInputElement
 * @param {HTMLInputElement} checkInputElement ユーザーがメールアドレスを入力したInputElement(入力確認用)
 * @returns {{ ok: (boolean | undefined), message: string}} ok: validationが成功したら、true。message: validationが失敗した場合にユーザーように表示させるメッセージ。成功した場合は空文字
 */
function emailAddress (emailInputElement, checkInputElement) {
    // input type がemailでない場合は動作未定義。
    if (emailInputElement.type !== "email" || checkInputElement.type !== "email") {
        return {
            ok: undefined,
            message: "予期しないエラーです。"
        };
    }
    // どちらかが空ならundefinedを返す。
    if (emailInputElement.value === "" || checkInputElement.value === "") {
        return {
            ok: undefined,
            message: "メールアドレス欄が空です。"
        };
    }
    // type=email前提。メールアドレスの形式にあっていなかったらエラー。
    if (emailInputElement.validity.typeMismatch) {
        return {
            ok: false,
            message: "メールアドレスの形式が間違っています。"
        };
    }

    if (emailInputElement.value !== checkInputElement.value) {
        return {
            ok: false,
            message: "同じメールアドレスを入力してください"
        };
    }
    return {
        ok: true,
        message: ""
    };
}

/**
 * inputで入力された日付が存在するものかチェック。
 * @param {HTMLInputElement} dateInputElement ユーザーが日付を入力したInputElement。typeはdateにすること。
 * @returns {{ ok: (boolean | undefined), message: string}} ok: validationが成功したら、true。message: validationが失敗した場合にユーザーように表示させるメッセージ。成功した場合は空文字
 */
function existDate (dateInputElement) {
    // input type がdateでない場合は動作未定義。
    if (dateInputElement.type !== "date") {
        return {
            ok: undefined,
            message: "予期しないエラーです。"
        };
    }
    // yyyy-MM-dd という形式で与えられる
    const dateFormat = dateInputElement.value;

    console.log(dateFormat);
    // 年、月、日のどれかが空のときや存在しない日付のとき--でなくて空文字列となる。
    if (dateFormat === "") {
        return {
            ok: undefined,
            message: "存在しない日付か、日付入力が空です。"
        };
    }
    // // date型でパースできるかでチェック
    // /** @type {Date | null} */
    // const date = new Date(dateFormat);

    // // Invalid date
    // console.log(date);
    // if (Number.isNaN(date.getTime())) {
    //     return {
    //         ok: false,
    //         message: "存在しない日付です。"
    //     }
    // }
    return {
        ok: true,
        message: ""
    };
}

/**
 * @param {HTMLInputElement} passwordInputElement ユーザーがパスワードを入力したInputElement
 * @param {HTMLInputElement} checkInputElement ユーザーがパスワードを入力したInputElement(入力確認用)
 * @returns {{ ok: (boolean | undefined), strength: ("High" | "Middle" | "Low" | "Vulnerable" | undefined), message: string}} ok: validationが成功したら、true。message: validationが失敗した場合にユーザーように表示させるメッセージ。成功した場合は空文字
 */
function checkPassword(passwordInputElement, checkInputElement) {


    console.log("checkpassword");
    // input type がpasswordでない場合は動作未定義。
    if (passwordInputElement.type !== "password" || checkInputElement.type !== "password") {
        return {
            ok: undefined,
            strength: undefined,
            message: "予期しないエラーです。"
        };
    }
    // どちらかが空ならundefinedを返す。
    if (passwordInputElement.value === "" || checkInputElement.value === "") {
        return {
            ok: undefined,
            strength: undefined,
            message: "パスワード欄が空です。"
        };
    }
    if (passwordInputElement.value !== checkInputElement.value) {
        return {
            ok: false,
            strength: undefined,
            message: "同じパスワードを入力してください"
        };
    }
    // パスワードの脆弱性により、蹴るかどうか判定
    const result = zxcvbn(passwordInputElement.value);
    //  * 0 too guessable: risky password. (guesses < 10^3)
    //  * 1 very guessable: protection from throttled online attacks. (guesses < 10^6)
    if (result.score <= 1) {
        return {
            ok: false,
            strength: "Vulnerable",
            message: "脆弱なパスワードです。"
        }; 
    //  * 2 somewhat guessable: protection from unthrottled online attacks. (guesses < 10^8)
    }else if (result.score = 2) {
        return {
            ok: true,
            strength: "Low",
            message: ""
        };  
    //  * 3 safely unguessable: moderate protection from offline slow-hash scenario. (guesses < 10^10)
    }else if (result.score = 3) {
        return {
            ok: true,
            strength: "Middle",
            message: ""
        };
    //  * 4 very unguessable: strong protection from offline slow-hash scenario. (guesses >= 10^10)
    }else if (result.score = 4) {
        return {
            ok: true,
            strength: "High",
            message: ""
        };
    }

    return {
        ok: false,
        strength: undefined,
        message: "定義されていない強さです。"
    };
}

const htmlValidator = {
    emailAddress,
    existDate,
    checkPassword
}

export {
    htmlValidator
}

