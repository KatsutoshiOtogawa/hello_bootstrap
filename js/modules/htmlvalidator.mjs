// @ts-check

import validator from 'validator'

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

    // 脆弱かどうか
    const isVulneable = !validator.isStrongPassword(passwordInputElement.value);
    if (isVulneable) {
        return {
            ok: false,
            strength: "Vulnerable",
            message: "脆弱なパスワードです。"
        };
    }
    const passwordLength = passwordInputElement.value.length;
    // 16以下だとLow。
    if (passwordLength <= 16) {
        return {
            ok: true,
            strength: "Low",
            message: ""
        }; 
    } else if (passwordLength <= 20) {
        return {
            ok: true,
            strength: 'Middle',
            message: ""
        };  
    } else {
        return {
            ok: true,
            strength: 'High',
            message: ""
        };  
    }
}

const htmlValidator = {
    emailAddress,
    existDate,
    checkPassword
}

export {
    htmlValidator
}

