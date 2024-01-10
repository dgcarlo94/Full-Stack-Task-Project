import { Directive } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appEndDate]',
  providers: [{provide: NG_VALIDATORS, useExisting: EndDateDirective, multi: true}],
  standalone: true
})
/*con l'istruzione all'interno dell'attributo providers stiamo assegnando il validator EndDateDirective all'array di validators
NG_VALIDATORS. La dicitura multi: true mi dice che il validator non va a sostituire tutti gli elementi dell'array NG_VALIDATORS
e invece si aggiunge in coda. In questo modo non vado a perdere i validators di default come Validators.required*/
export class EndDateDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {
    if(!(control instanceof FormGroup))
    {
      return null;
    }

    const start_date_control = control.get('start_date');
    const end_date_control = control.get('end_date');

    if(!start_date_control || !end_date_control)
    {
      return null;
    }

    const start_date = start_date_control.value;
    const end_date = end_date_control.value

    if(start_date && end_date && new Date(start_date) > new Date(end_date))
    {
      return {endDateInvalidDirective:  true};
    }

    return null;
  }
}
/*Fatto in questo modo non va bene, perchè il validatore deve dare errore anche quando il campo non è stato impostato. Se il FormControll
non ha nessuna scelta il validator deve ritornare null, e quindi errore. L'approccio più corretto è il secondo*/
export function endDateValidatorIncorrect(group: AbstractControl): ValidationErrors | null {

  const start_date = group.get('start_date')?.value;
  const end_date = group.get('end_date')?.value;

  if(!start_date || !end_date)
    return null;
  else if (start_date && end_date && new Date(start_date) > new Date(end_date))
    return {endDateValidatorIncorrect: true};

  return null;
}

//Approccio corretto

export function endDateValidator(group: AbstractControl): ValidationErrors | null {

  const start_date_control = group.get('start_date');
  const end_date_control = group.get('end_date');

  if(!start_date_control || ! end_date_control)
    return null;

  const start_date = group.get('start_date')?.value;
  const end_date = group.get('end_date')?.value;

  if (start_date && end_date && new Date(start_date) > new Date(end_date))
    return {endDateInvalid: true};

  return null;
}
