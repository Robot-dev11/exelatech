import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit{

  constructor(private http: HttpClient){}
  contentType: any
  entries: any
  digitalNow: any
  group: any
  whitepaper: any

  filterObject(inputObject: any) {
    const unWantedProps = [
      "uid",
      "_version",
      "ACL",
      "_in_progress",
      "created_at",
      "created_by",
      "updated_at",
      "updated_by",
      "publish_details",
    ];
    for (const key in inputObject) {
      unWantedProps.includes(key) && delete inputObject[key];
      if (typeof inputObject[key] !== "object") {
        continue;
      }
      inputObject[key] = this.filterObject(inputObject[key]);
    }
    return inputObject;
  }


  ngOnInit(): void {
    this.getContentType()
    this.getEntries()
  }


  getContentType(){
    this.http.get('https://api.contentstack.io/v3/content_types/homepage', {headers: {
      'api_key': 'bltf5554c294d5460cc',
      'authorization':'cs0ed02087da26660b1edb05ab',
      'Content-Type':'application/json'
    }}).subscribe((data1: any) => {
      this.contentType = data1?.content_type?.schema;
    })
  }


  getEntries(){
    this.http.get('https://api.contentstack.io/v3/content_types/homepage/entries', {headers: {
      'api_key': 'bltf5554c294d5460cc',
      'authorization':'cs0ed02087da26660b1edb05ab',
      'Content-Type':'application/json'
    }}).subscribe((data1: any) => {
      this.entries = this.filterObject(data1.entries[0])
      this.group = this.entries?.group
      this.whitepaper = this.entries?.whitepapers
    })
  }

}
