import { Injectable } from '@angular/core';
import { RestRequestService } from './rest-request.service';


@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  private skills: String[];
  constructor(private restRequestService:RestRequestService) { 
  }

  caricaSkills(response : any){
    if(!response['success']){
      return false;
    }
    this.skills = response['data'];
    return true;
  }


  getSkills() : String[]{
    return this.skills;
  }
}
