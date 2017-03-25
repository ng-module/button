import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
})
export class AppComponent  {
    loading = false;
    handleOK(){
      console.log("click")
    };
}
