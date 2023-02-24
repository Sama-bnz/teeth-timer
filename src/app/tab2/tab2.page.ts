import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  settingsForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private route: Router ) {
    this.buildForm();
  }

  /**
   * @method buildForm
   * @description permets de construire le formulaire réactif avec les validators
   * @returns void
   */
  buildForm(): void {
    this.settingsForm = this.formBuilder.group({
      zone: [15, [Validators.pattern("^(0|[1-9][0-9]*)$")]],
      brushing: [16, [Validators.pattern("^(0|[1-9][0-9]*)$")]],
      waiting: [6, [Validators.pattern("^(0|[1-9][0-9]*)$")]],
      name: ['', [Validators.required]]
    })
  }

  /**
   * @method setDefaultValues
   * @description Permet d'attribuer des valeurs par défault si l'utilisateur n'a rien indiqué
   * @returns void
   */
  setDefaultValues(): void {
    let name!: string;
    let defaultValue!: string | number;

    const control = this.settingsForm.get(name);

    if (control?.value === '' || control?.value === null || control?.value === undefined) {
      switch (name) {
        case "zone":
          defaultValue = 15;
          break;
        case 'brushing':
          defaultValue = 16;
          break;
        case 'waiting':
          defaultValue = 6;
          break;
      }
      control?.setValue(defaultValue);
    }
  }

  /**
   * @method getAllValues
   * @description Permet d'enregistrer les valeurs entrées dans le formulaire dans le localStorage
   */
  saveAllValues() {
    Object.keys(this.settingsForm.controls).forEach(async name => {
      const controlName = name;
      const control = this.settingsForm.get(name)
      const controlValue = control?.value;
      await Preferences.set({
        key: controlName,
        value: controlValue
      })
    })
  }


  /**
   * @method submitForm
   * @description Permet de submit le formulaire, de renvoyer les valeurs dans le localStorage et de rediriger vers la page du Timer.
   * @callback setDefaultValues
   * @callback setAllValues
   */
  submitForm() {
    this.setDefaultValues();
    if (this.settingsForm.valid) {
      this.saveAllValues();
      this.route.navigate(['tabs'])
    }
  }

}
