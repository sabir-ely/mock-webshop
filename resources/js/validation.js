import { extend, configure, setInteractionMode } from "vee-validate";

setInteractionMode("eager");

configure({
    classes: {
        passed: "is-valid",
        failed: "is-invalid"
    }
});

extend("required", {
    validate: value => ({
        required: true,
        valid: value !== ""
    }),
    message: "This field is required",
    computesRequired: true
});

extend("postalCode", {
    validate: value => /^[1-9][0-9]{3}[\s]?[A-Za-z]{2}$/i.test(value),
    message: "Postal code not in valid format"
});

extend("streetNumber", {
    validate: value =>
        /^[1-9][0-9]*(([-][1-9][0-9]*)|([\s]?[a-zA-Z]+))?$/i.test(value),
    message: "Not a valid street number"
});

extend("phoneNr", {
    validate: value => {
        const landln = /^(((0)[1-9]{2}[0-9][-]?[1-9][0-9]{5})|((\\+31|0|0031)[1-9][0-9][-]?[1-9][0-9]{6}))$/;
        const mobile = /^(((\\+31|0|0031)6){1}[1-9]{1}[0-9]{7})$/i;
        return landln.test(value) || mobile.test(value);
    },
    message: "Invalid phone number"
});

extend("email", {
    validate: value =>
        /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(
            value
        ),
    message: "Invalid email address"
});
