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
      'authorization':'csd40c61797ce6413e1975fb8a',
      'Content-Type':'application/json'
    }}).subscribe((data1: any) => {
      console.log('contenttype: ',data1)
      // console.log(data?.content_type?.schema)
      this.contentType = data1?.content_type?.schema;
    })
  }


  getEntries(){
    this.http.get('https://api.contentstack.io/v3/content_types/homepage/entries', {headers: {
      'api_key': 'bltf5554c294d5460cc',
      'authorization':'csd40c61797ce6413e1975fb8a',
      'Content-Type':'application/json'
    }}).subscribe((data1: any) => {
      console.log('entries: ',data1.entries[0])
      this.entries = this.filterObject(data1.entries[0])
      console.log("entries : ", this.entries);
      // this.digitalNow = this.entries?.page_components[0]?.digital_now?.digital_now_images
      // console.log(this.digitalNow)
      // angular courousal
    })
  }

}
