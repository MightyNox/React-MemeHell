export default function convertDate(date) {
    const dateToConvert = new Date(date)
    let day = dateToConvert.getDate();
    let month = dateToConvert.getMonth();
    let year = dateToConvert.getFullYear();

    if(day.toString().length === 1){
        day = "0"+day
    }

    if(month.toString().length === 1){
        month = "0"+month
    }

    return (day+'-'+month+'-'+year)
}