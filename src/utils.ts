import { format } from "date-fns"

export function dateToInputDate(date?: Date): string{
    try{
        return format(date, "yyyy-MM-dd'T'hh:mm")
    } catch(e){
        console.warn(e)
    }
    return format(new Date(), "yyyy-MM-dd'T'hh:mm")
}