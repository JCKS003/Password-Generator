document.addEventListener("DOMContentLoaded", function() {
    function generatePassword() {
        const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
        const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numberChars = '0123456789';
        const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        const includeLowercase = document.getElementById('chkLowercase').checked;
        const includeUppercase = document.getElementById('chkUppercase').checked;
        const includeNumbers = document.getElementById('chkNumbers').checked;
        const includeSymbols = document.getElementById('chkSymbols').checked;
        const includeSpaces = document.getElementById('chkIncludeSpaces').checked;

        let charset = '';
        if (includeLowercase) {
            charset += lowercaseChars;
        }
        if (includeUppercase) {
            charset += uppercaseChars;
        }
        if (includeNumbers) {
            charset += numberChars;
        }
        if (includeSymbols) {
            charset += symbolChars;
        }
        if (includeSpaces) {
            charset += ' ';
        }

        let password = '';
        const length = 12; // You can change the length as per your requirement
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }

        const passwordResult = document.querySelector('.password-result');
        passwordResult.innerText = password;

        // Update the strength indicator
        const strengthIndicator = document.querySelector('.strength-indicator');
        const strength = calculatePasswordStrength(password);
        updateStrengthIndicator(strengthIndicator, strength);
    }

    function calculatePasswordStrength(password) {
        // Sample logic to calculate password strength (you can replace with your own)
        const length = password.length;
        if (length < 8) {
            return "weak";
        } else if (length < 12) {
            return "medium";
        } else {
            return "strong";
        }
    }

    function updateStrengthIndicator(strengthIndicator, strength) {
        switch (strength) {
            case "weak":
                strengthIndicator.style.backgroundColor = "red";
                strengthIndicator.style.width = "33%";
                break;
            case "medium":
                strengthIndicator.style.backgroundColor = "yellow";
                strengthIndicator.style.width = "66%";
                break;
            case "strong":
                strengthIndicator.style.backgroundColor = "green";
                strengthIndicator.style.width = "100%";
                break;
        }

        // Adjust the strength line length based on the strength
        const strengthLine = document.querySelector('.strength-line');
        strengthLine.style.width = strengthIndicator.style.width;
    }

    function copyPassword() {
        const passwordResult = document.querySelector('.password-result');
        const password = passwordResult.innerText;
        navigator.clipboard.writeText(password);
        const copyButton = document.querySelector('.copy-button');
        setTimeout(() => {
        }, 1500); // Reset button text after 1.5 seconds
    }

    document.querySelector('.generate-button').addEventListener('click', generatePassword);
    document.querySelector('.copy-button').addEventListener('click', copyPassword);
});
