import { Component, OnInit } from '@angular/core';
import { bootstrap, mount } from 'src/main.single-spa';

@Component({
  selector: 'iview-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
