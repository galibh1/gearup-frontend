"use client";


import * as React from "react";

import {CalendarIcon} from "lucide-react";

import {format} from "date-fns";

import {Button} from "@/components/ui/button";

import {Calendar} from "@/components/ui/calendar";

import {
Popover,
PopoverContent,
PopoverTrigger
}
from "@/components/ui/popover";




export default function DatePicker({

value,

onChange

}:{

value?:Date;

onChange:(date?:Date)=>void;

}){


return (

<Popover>


<PopoverTrigger asChild>


<Button

variant="outline"

className="
w-full
justify-start
"

>


<CalendarIcon className="mr-2 h-4 w-4"/>


{

value

?

format(value,"PPP")

:

"Pick a date"

}


</Button>


</PopoverTrigger>




<PopoverContent>


<Calendar

mode="single"

selected={value}

onSelect={onChange}

/>


</PopoverContent>




</Popover>

);


}