export function formatDate(dateString: string) {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });

    return `${dayOfWeek}, ${day}/${month}/${year} ${hours}:${minutes}${ampm}`;
}

