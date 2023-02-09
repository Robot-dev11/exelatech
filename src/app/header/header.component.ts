import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private http: HttpClient) { }

  entries: any;
  contentType: any;
  pages: any;
  menu: any;


  ngOnInit(): void {
    this.getHeaders()
    this.getEntries()
  }

  getHeaders(){
    this.http.get('https://api.contentstack.io/v3/content_types/header', {headers: {
      'api_key': 'Your ContentStack Stack api',
      'authorization':'Your Contentstack Managment Token',
      'Content-Type':'application/json'
    }}).subscribe((data1: any) => {
      console.log('contenttype: ',data1)
      this.contentType = data1?.content_type?.schema;
    })
  }

  getEntries(){
    this.http.get('https://api.contentstack.io/v3/content_types/header/entries', {headers: {
      'api_key': 'Your ContentStack Stack api',
      'authorization':'Your Contentstack Managment Token',
      'Content-Type':'application/json'
    }}).subscribe((data1: any) => {
      console.log('entries: ',data1.entries[0])
      this.entries = this.filterObject(data1.entries[0])
      console.log("entries : ", this.entries);
      this.pages = this.entries?.page
      console.log(this.pages)
      this.menu = this.entries?.header_components
    })
  }

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

}
