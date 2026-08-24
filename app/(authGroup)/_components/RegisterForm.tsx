"use client";


import {
    useActionState,
    useEffect
} from "react";


import {
    useRouter
} from "next/navigation";


import {
    toast
} from "sonner";


import {
    registerAction
} from "../_actions/authActions";


import {
    Button
} from "@/components/ui/button";


import {
    Input
} from "@/components/ui/input";


import {
    Label
} from "@/components/ui/label";





const RegisterForm = () => {


const router =
useRouter();




const [
    state,
    action,
    pending
]
=
useActionState(

    registerAction,

    null

);






useEffect(()=>{


    if(!state)
        return;



    if(state.success){


        toast.success(
            state.message
        );


        router.push(
            "/login"
        );


    }
    else{


        toast.error(
            state.message
        );


    }



},[state,router]);









return (

<form

action={action}

className="space-y-5"

>






<div className="space-y-2">

<Label>
Full Name
</Label>


<Input

name="name"

placeholder="Enter your full name"

required

/>

</div>








<div className="space-y-2">


<Label>
Email
</Label>


<Input

name="email"

type="email"

placeholder="Enter your email"

required

/>


</div>








<div className="space-y-2">


<Label>
Password
</Label>


<Input

name="password"

type="password"

placeholder="Enter your password"

required

/>


<p className="text-xs text-gray-500">

Minimum 8 characters, uppercase, lowercase, number required.

</p>


</div>









<div className="space-y-2">


<Label>
Register As
</Label>



<select


name="role"


required


defaultValue=""


className="
h-14
w-full
rounded-xl
border
px-4
bg-white
"


>


<option

value=""

disabled

>

Select your role

</option>



<option

value="CUSTOMER"

>

Customer

</option>



<option

value="PROVIDER"

>

Provider

</option>




</select>



</div>









<Button


type="submit"


disabled={pending}



className="
h-12
w-full
rounded-xl
bg-emerald-600
text-white
font-semibold
"



>


{

pending

?

"Creating Account..."

:

"Create Account"

}



</Button>





</form>


);


};


export default RegisterForm;