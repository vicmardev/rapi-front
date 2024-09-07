import { FormGroup } from "@angular/forms";

export function MustMatch(controlName: string, matchingControlName: string){
    return (formgroup: FormGroup) =>{
        const control = formgroup.controls[controlName];
        const matchingControl = formgroup.controls[matchingControlName]
        if(matchingControl.errors  && !matchingControl.errors["mustMatch"]){
            return
        }

        if(control.value !== matchingControl.value){
            matchingControl.setErrors({mustMatch:true})
        }
        else {
            matchingControl.setErrors(null)
        }
    }
}