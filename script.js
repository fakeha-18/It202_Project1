/* Moving On Up - Project 1 */

const form = document.getElementById("loginForm");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

/* Ten sample moving representative accounts */
const representatives = [
    ["Sarah", "Johnson", "!Move1", "1001", "7325550101", "101", "sarah@mou.com"],
    ["Michael", "Brown", "@Truck2", "1002", "7325550102", "102", "michael@mou.com"],
    ["Emily", "Davis", "#Boxes3", "1003", "7325550103", "103", "emily@mou.com"],
    ["David", "Wilson", "$Shift4", "1004", "7325550104", "104", "david@mou.com"],
    ["Olivia", "Taylor", "%Drive5", "1005", "7325550105", "105", "olivia@mou.com"],
    ["James", "Miller", "&Carry6", "1006", "7325550106", "106", "james@mou.com"],
    ["Sophia", "Moore", "*Route7", "1007", "7325550107", "107", "sophia@mou.com"],
    ["Daniel", "Clark", "!Cargo8", "1008", "7325550108", "108", "daniel@mou.com"],
    ["Ava", "White", "@Fleet9", "1009", "7325550109", "109", "ava@mou.com"],
    ["Noah", "Martin", "#Move10", "1010", "7325550110", "110", "noah@mou.com"]
].map(([firstName, lastName, password, id, phone, extension, email]) => ({
    firstName, lastName, password, id, phone, extension, email
}));

/* Show or hide the password */
togglePassword.addEventListener("click", function () {
    const hidden = passwordInput.type === "password";
    passwordInput.type = hidden ? "text" : "password";
    togglePassword.textContent = hidden ? "Hide" : "Show";
    togglePassword.setAttribute(
        "aria-label",
        hidden ? "Hide password" : "Show password"
    );
});

/* Display one error at a time */
function showError(field, message) {
    alert(message);
    field.focus();
    field.select();
    return false;
}

/* Validate all form fields using regular expressions */
function validate() {
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const password = document.getElementById("password");
    const repId = document.getElementById("repId");
    const phone = document.getElementById("phone");
    const extension = document.getElementById("extension");
    const email = document.getElementById("email");
    const confirmation = document.getElementById("confirmation");
    const transaction = document.getElementById("transaction");

    const namePattern = /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/;
    const passwordPattern =
        /^[^A-Za-z0-9][A-Za-z0-9!@#$%^&*]{0,6}$/;
    const idPattern = /^\d{4}$/;
    const phonePattern =
        /^(?:\d{10}|\d{3}[- ]\d{3}[- ]\d{4})$/;
    const extensionPattern = /^\d+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,5}$/;

    if (!namePattern.test(firstName.value.trim())) {
        return showError(firstName,
            "Enter a valid first name using letters only.");
    }

    if (!namePattern.test(lastName.value.trim())) {
        return showError(lastName,
            "Enter a valid last name using letters only.");
    }

    if (
        !passwordPattern.test(password.value) ||
        !/[A-Z]/.test(password.value) ||
        !/[0-9]/.test(password.value)
    ) {
        return showError(password,
            "Password must be at most 7 characters, start with a special character, and contain an uppercase letter and a number.");
    }

    if (!idPattern.test(repId.value.trim())) {
        return showError(repId,
            "Representative ID must contain exactly 4 digits.");
    }

    if (!phonePattern.test(phone.value.trim())) {
        return showError(phone,
            "Enter a valid 10-digit phone number, with optional spaces or dashes.");
    }

    if (!extensionPattern.test(extension.value.trim())) {
        return showError(extension,
            "Enter a valid numeric phone extension.");
    }

    if (
        confirmation.checked &&
        !emailPattern.test(email.value.trim())
    ) {
        return showError(email,
            "Enter a valid email address because email confirmation is requested.");
    }

    if (
        !confirmation.checked &&
        email.value.trim() !== "" &&
        !emailPattern.test(email.value.trim())
    ) {
        return showError(email,
            "Enter a valid email address or leave it blank.");
    }

    if (transaction.value === "") {
        return showError(transaction,
            "Please select a transaction.");
    }

    return verify();
}

/* Verify against the ten existing accounts */
function verify() {
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const password = document.getElementById("password").value;
    const repId = document.getElementById("repId").value.trim();
    const phone = document.getElementById("phone").value.replace(/[- ]/g, "");
    const extension = document.getElementById("extension").value.trim();
    const email = document.getElementById("email").value.trim();
    const confirmation = document.getElementById("confirmation").checked;
    const transaction = document.getElementById("transaction").value;

    const account = representatives.find(rep =>
        rep.firstName.toLowerCase() === firstName.toLowerCase() &&
        rep.lastName.toLowerCase() === lastName.toLowerCase() &&
        rep.password === password &&
        rep.id === repId &&
        rep.phone === phone &&
        rep.extension === extension &&
        (!confirmation ||
            rep.email.toLowerCase() === email.toLowerCase())
    );

    if (!account) {
        alert(
            "An account for " + firstName + " " + lastName +
            " could not be found. Please check your information."
        );
        return false;
    }

    alert(
        "Welcome, " + account.firstName + " " +
        account.lastName + "!\n\n" +
        "You have successfully entered the Moving On Up system.\n" +
        "Selected Transaction: " + transaction
    );

    return true;
}

/* Submit button */
form.addEventListener("submit", function (event) {
    event.preventDefault();
    validate();
});

/* Reset button */
form.addEventListener("reset", function () {
    passwordInput.type = "password";
    togglePassword.textContent = "Show";
    togglePassword.setAttribute("aria-label", "Show password");
});