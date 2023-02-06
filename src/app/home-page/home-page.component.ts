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
    this.http.get('https://api.contentstack.io/v3/content_types/home_page', {headers: {
      'api_key': 'blt778cc4f19e36f129',
      'authorization':'csa9c189912eb48effa68e2536',
      'Content-Type':'application/json'
    }}).subscribe((data1: any) => {
      console.log('contenttype: ',data1)
      // console.log(data?.content_type?.schema)
      this.contentType = data1?.content_type?.schema;
    })
  }


  getEntries(){
    this.http.get('https://api.contentstack.io/v3/content_types/home_page/entries', {headers: {
      'api_key': 'blt778cc4f19e36f129',
      'authorization':'csa9c189912eb48effa68e2536',
      'Content-Type':'application/json'
    }}).subscribe((data1: any) => {
      console.log('entries: ',data1.entries[0])
      this.entries = this.filterObject(data1.entries[0])
      console.log("entries : ", this.entries);
      this.digitalNow = this.entries?.page_components[0]?.digital_now?.digital_now_images
      console.log(this.digitalNow)
      // angular courousal
    })
  }

}
