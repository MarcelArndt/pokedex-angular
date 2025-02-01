import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WikiServiceService {

  constructor() { }
  id?: number;
  currentNavi: string = 'overview';
  previousNavi: string = 'off';

  changeId(id: number) {
    this.id = id
  }

  getNaviClass(naviState: string): { [className: string]: boolean } {
    return {
      'show': this.currentNavi === naviState && this.previousNavi !== this.currentNavi,
      'hidden': this.previousNavi === naviState,
      'off': this.currentNavi !== naviState && this.previousNavi !== naviState,
      'init': naviState == 'overview' && this.currentNavi == 'overview' && this.previousNavi == 'off'
    };
  }

  switchToNavi(newNavi: string) {
    this.previousNavi = this.currentNavi !== newNavi ? this.currentNavi : this.previousNavi;
    this.currentNavi = newNavi;
  }


}
