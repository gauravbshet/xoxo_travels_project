function toggleSeat(event) {
    const seat = event.currentTarget;
    if (seat.classList.contains('seat--disabled')) return;
    seat.classList.toggle('seat--selected');
}

function initBookingSeats() {
    document.querySelectorAll('.seat').forEach(seat => seat.addEventListener('click', toggleSeat));
}

document.addEventListener('DOMContentLoaded', initBookingSeats);
