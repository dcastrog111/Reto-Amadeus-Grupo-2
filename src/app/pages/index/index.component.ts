import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  
  ngOnInit(): void {
    sessionStorage.clear();
    sessionStorage.setItem("avatar", "https://cdn-icons-png.flaticon.com/512/9187/9187532.png");
  }
  
}
