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
  industries: any;
  solutions: any;
  about_exela: any;
  link1: any
  link2: any
  link3: any

  ngOnInit(): void {
    this.getHeaders()
    this.getEntries()
  }

  getHeaders(){
    this.http.get('https://api.contentstack.io/v3/content_types/header', {headers: {
      'api_key': 'bltf5554c294d5460cc',
      'authorization':'cs0ed02087da26660b1edb05ab',
      'Content-Type':'application/json'
    }}).subscribe((data1: any) => {
      this.contentType = data1?.content_type?.schema;
    })
  }

  getEntries(){
    this.http.get('https://api.contentstack.io/v3/content_types/header/entries', {headers: {
      'api_key': 'bltf5554c294d5460cc',
      'authorization':'cs0ed02087da26660b1edb05ab',
      'Content-Type':'application/json'
    }}).subscribe((data1: any) => {
      this.entries = this.filterObject(data1.entries[0])
      this.pages = this.entries?.page
      this.menu = this.entries?.header_components
      this.industries = this.entries?.header_components[0]
      this.link1 = this.industries?.industries?.link
      this.solutions = this.entries?.header_components[1]
      this.link2 = this.solutions?.link
      this.about_exela = this.entries?.header_components[2]
      this.link3 = this.about_exela?.link
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
