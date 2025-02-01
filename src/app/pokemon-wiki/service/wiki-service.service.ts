import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WikiServiceService {

  constructor() { }
  id?: number;
  currentNaviState: string = 'overview';

  changeId(id: number) {
    this.id = id
  }

  changeNavigation(router: string) {
    this.currentNaviState = router.length > 0 ? router : this.currentNaviState;
  }


}
