/** Barcelona booking availability is evaluated in the studio's local time zone. */
const FORMATTER = new Intl.DateTimeFormat('en-GB', {
  timeZone:'Europe/Madrid', year:'numeric', month:'2-digit', day:'2-digit',
  hour:'2-digit', minute:'2-digit', hourCycle:'h23'
});

export function validCalendarDate(value:string):boolean {
  if(!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed=new Date(value+'T00:00:00Z');
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0,10)===value;
}

export function barcelonaNow(now:Date=new Date()):{date:string,time:string} {
  const parts=Object.fromEntries(FORMATTER.formatToParts(now).map(x=>[x.type,x.value]));
  return {date:`${parts.year}-${parts.month}-${parts.day}`,time:`${parts.hour}:${parts.minute}`};
}

export function isBookableSlot(date:string,time:string,now:Date=new Date()):boolean {
  if(!validCalendarDate(date)||!/^\d{2}:\d{2}$/.test(time))return false;
  const local=barcelonaNow(now);
  return date>local.date || (date===local.date && time>local.time);
}
