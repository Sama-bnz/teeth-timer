import { Component } from '@angular/core';
import { BatteryInfo, Device, DeviceInfo } from '@capacitor/device';
import { Preferences } from '@capacitor/preferences';
import { from, Observable } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  // Déclaration des variables pour le timer + la récuperation des données

  // public nameKid = '';
  zone!: number;
  brushing!: number;
  waiting!: number;
  name!: string;
  public timer= 0;
  interval: any;

  constructor() {}


  //Fonction qui met en place le timer
  formatTimer(timer: number){
    const minutes = Math.floor( timer / 60 );
    const seconds = timer % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  //Début du timer
  timerStart(){
    this.interval = setInterval(() =>{
      this.timer++;
        if (this.timer == this.brushing) {
          this.zone--;
        } 
    }, 1000);
  }

  // Je met pause sur le timer 
  timerStop(){
    clearInterval(this.interval);
  }

  // Je reset le timer de brossage
  timerReset(){
    this.timer = 0;
    clearInterval(this.interval);
  }


  //Je récupère les paramètres stockés en mémoire

  async ionViewWillEnter(){
    this.zone = parseInt((await Preferences.get({
      key:'zone' })).value!,10);
    this.brushing = parseInt((await Preferences.get({
      key:'brushing' })).value!,10);
    this.waiting = parseInt((await Preferences.get({
      key:'waiting' })).value!,10);
    this.name = ((await Preferences.get({
      key:'name' })).value!);
  }
 
  
  

}
