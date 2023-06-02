
import moment from "moment";
export const getTimeStamp = (timeStamp) => {

    const diff = moment(new Date(timeStamp)).utc().fromNow()
    if(diff.includes("few")) return "now"
    if(diff.includes("an hour")) return "1 h"
    const a= diff.split(" ")
    return new String(a[0]).slice(0)+" "+new String(a[0]+a[1][0]).slice(1)

}