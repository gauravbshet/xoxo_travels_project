function updateStrengthMeter(input) {
    const meter = document.getElementById('strengthMeterFill');
    const label = document.getElementById('strengthLabel');
    if (!meter || !label) return;
    const value = input.value;
    let score = 0;
    if (value.length > 7) score += 1;
    if (/[A-Z]/.test(value)) score += 1;
    if (/[0-9]/.test(value)) score += 1;
    if (/[^A-Za-z0-9]/.test(value)) score += 1;
    meter.style.width = `${score * 25}%`;
    label.textContent = score <= 1 ? 'Weak' : score === 2 ? 'Fair' : score === 3 ? 'Strong' : 'Secure';
}

function moveOtpFocus(event, index) {
    const inputs = document.querySelectorAll('.otp-input');
    if (event.key === 'Backspace' && !event.target.value && index > 0) {
        inputs[index - 1].focus();
    }
    if (/[0-9]/.test(event.key) && index < inputs.length - 1) {
        setTimeout(() => inputs[index + 1].focus(), 10);
    }
}
