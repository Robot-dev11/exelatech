import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  contentType: any;
  entries: any;
  socialComponents: any
  discover: any
  resources: any
  company: any

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getHeaders()
    this.getEntries()
  }


  getHeaders(){
    this.http.get('https://api.contentstack.io/v3/content_types/footer', {headers: {
      'api_key': 'bltf5554c294d5460cc',
      'authorization':'cs0ed02087da26660b1edb05ab',
      'Content-Type':'application/json'
    }}).subscribe((data1: any) => {
      this.contentType = data1?.content_type?.schema;
    })
  }


  getEntries(){
    this.http.get('https://api.contentstack.io/v3/content_types/footer/entries', {headers: {
      'api_key': 'bltf5554c294d5460cc',
      'authorization':'cs0ed02087da26660b1edb05ab',
      'Content-Type':'application/json'
    }}).subscribe((data1: any) => {
      this.entries = this.filterObject(data1.entries[0])
      this.socialComponents = this.entries?.social_link
      this.discover = this.entries?.article[0]?.articles?.link
      this.resources = this.entries?.article[1]?.articles?.link
      this.company = this.entries?.article[2]?.articles?.link
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
