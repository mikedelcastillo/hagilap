import { format } from "date-fns"

export function dateToInputDate(date?: Date): string{
    try{
        return format(date, "yyyy-MM-dd'T'hh:mm")
    } catch(e){
        console.warn(e)
    }
    return format(new Date(), "yyyy-MM-dd'T'hh:mm")
}

export function getTimeLeft(milliseconds: number):{
    number:number,
    unit:string,
    progress: number,
} {
    const sign = Math.sign(milliseconds)
    milliseconds = Math.abs(milliseconds)
    const output = {
        number: 0,
        unit: "",
        progress: 0,
    }
    
    const steps: Array<[string,number,number]> = [
        ["Secs", 1000, 1000*60],
        ["Mins", 1000*60, 1000*60*60],
        ["Hours", 1000*60*60, 1000*60*60*24],
        ["Days", 1000*60*60*24, 1000*60*60*24*365],
        ["Months", 1000*60*60*24*30, Infinity]
    ]

    let bottomRange = 0
    for(let [unit, division, topRange] of steps){
        if(milliseconds > topRange){
            bottomRange = topRange
            continue
        }
        output.number = Math.floor(milliseconds/division)
        output.unit = unit
        if(sign == -1) output.unit += " ago"
        output.progress = milliseconds / topRange
        break    
    }

    return output
}