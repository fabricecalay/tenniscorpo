export function compare(a, b, isAsc):number {
    if (a==null) return (isAsc ? 1 : -1);
    if (b==null) return (isAsc ? -1 : 1);
    if (a==b){
        return 0;
    }
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

export function addLeadingZero(value:number):string{
  if (value<10){
    return "0"+value;
  }else{
    return ""+value;
  }
}

export function formatDate(date:Date){
  let dateStr:string = "";
  if (date){
    dateStr+=date.getFullYear();
    dateStr+=addLeadingZero(date.getMonth()+1);
    dateStr+=addLeadingZero(date.getDate());
  }
  return dateStr;
}

