export function formatDateToStringWithTime(inputDate, incluirHora) {
    const date = new Date(inputDate);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Sumar 1 al mes ya que los meses van de 0 a 11
    const day = String(date.getDate()).padStart(2, '0');
    
    if (!incluirHora) {
        return `${day}/${month}/${year}`;
    }

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}