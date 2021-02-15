module.exports = {
    root: true,
    env: {
        node: true,
        jest:true
    },
    extends: ["plugin:vue/vue3-essential", "eslint:recommended", "@vue/prettier"],
    parserOptions: {
        parser: "babel-eslint",
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "prettier/prettier": [
            "warn",
            {
                // singleQuote: none,单引号双引号
                // semi: false,分号
                trailingComma: "es5",
            },
        ],
    },
};