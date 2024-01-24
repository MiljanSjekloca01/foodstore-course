import { AbstractControl } from "@angular/forms"

export const PasswordMatchValidator = (passwordControlName: string,
    confirmPasswordControlName: string) => {
    const validator = (form: AbstractControl) => {
        const passwordControl = form.get(passwordControlName);
        const confirmpasswordControl = form.get(confirmPasswordControlName);

        if(!passwordControl || !confirmpasswordControl) return;

        if(passwordControl.value !== confirmpasswordControl.value){
            confirmpasswordControl.setErrors({notMatch: true});
        }else{
            const errors = confirmpasswordControl.errors;
            if(!errors) return;

            delete errors.notMatch;
            confirmpasswordControl.setErrors(errors);
        }

    }
    return validator;
}