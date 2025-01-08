import { Component, OnInit, } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import {RestaurentData} from './restaurent.model';


@Component({
  selector: 'app-restaurent-dash',
  templateUrl: './restaurent-dash.component.html',
  styleUrls: ['./restaurent-dash.component.css'],
  standalone : false
})

export class RestaurentDashComponent implements OnInit {

  formValue!:FormGroup
  restaurentModelObj : RestaurentData = new RestaurentData;
  allRestaurentData: any;
  showAdd!:boolean;
  showBtn!:boolean;
  showPopup: boolean = false;
  showEmailPopup: boolean = false;

  constructor(private formbuilder: FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name: ['',Validators.required], 
      email: ['',[Validators.required, Validators.email]],
      mobile: ['',[Validators.required,Validators.pattern('^[0-9]{10}$')]],
      address: ['',Validators.required],
      services: ['',Validators.required],
    })
    this.getAllData();
  }

  

  clickAddResto()
  {
    this.formValue.reset();
    this.showAdd = true;
    this.showBtn = false;
  }
 
  addRestaurent()
  {
    
    if (this.formValue.invalid) {
      this.formValue.markAllAsTouched();
      if (!this.formValue.controls['mobile'].valid) {
        this.showPopup = true;
        setTimeout(() => this.showPopup = false, 3000); // Mobile pop-up disappears after 3 seconds
      } else if (!this.formValue.controls['email'].valid) {
        this.showEmailPopup = true;
        setTimeout(() => this.showEmailPopup = false, 3000); // Email pop-up disappears after 3 seconds
      } else {
        alert("Please fill all the required fields correctly before submitting");
      }
      return;
    }
    
    


    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;

  //   // Incrementing the ID while handling both string and number types
  // const highestId = Math.max(...this.allRestaurentData.map((item: any) => {
  //   // If the item.id is a string, convert it to a number for comparison
  //   return typeof item.id === 'string' ? Number(item.id) : item.id;
  // }), 0);

  // // After incrementing, ensure the ID is returned as a string
  // this.restaurentModelObj.id = (highestId + 1).toString(); // Convert the incremented value to a string

    this.api.postRestaurent(this.restaurentModelObj).subscribe(res => {
      console.log(res);
      alert("Restaurent Added Successfully");
      this.formValue.reset();

      let ref= document.getElementById('closeModal');
      ref?.click();

      this.getAllData();

    }, err=>{
      console.log(err);
      alert("Restaurent Added Failed!");
    })
  }

  
  getAllData()
  {
    this.api.getRestaurent().subscribe(res => {
      this.allRestaurentData= res;
    }, err=>{
      console.log(err);
    })
  }

  deleteResto(data: any)
  {
    this.api.deleteRestaurant(data).subscribe((res: any) => {
      console.log(res);
      alert("Restaurent Deleted Successfully");
      this.getAllData();
    })
  }

  onEditResto(data: any)
  {
    this.showAdd = false;
    this.showBtn = true;
    
    this.restaurentModelObj.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);

 
  }
  updateResto(){

    if (this.formValue.invalid) {
      this.formValue.markAllAsTouched();
      if (!this.formValue.controls['mobile'].valid) {
        this.showPopup = true;
        setTimeout(() => this.showPopup = false, 3000); // Mobile pop-up disappears after 3 seconds
      } else if (!this.formValue.controls['email'].valid) {
        this.showEmailPopup = true;
        setTimeout(() => this.showEmailPopup = false, 3000); // Email pop-up disappears after 3 seconds
      } else {
        alert("Please fill all the required fields correctly before submitting");
      }
      return;
    }


    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;

    this.api.updateRestaurant(this.restaurentModelObj.id, this.restaurentModelObj).subscribe((res: any) => {
      alert("Restaurent Updated Successfully");
      this.formValue.reset();

      let ref= document.getElementById('closeModal');
      ref?.click();

      this.getAllData();

    }) //cant remove  this.restaurentModelObj.id because make update button useless
    
  }

  
}
