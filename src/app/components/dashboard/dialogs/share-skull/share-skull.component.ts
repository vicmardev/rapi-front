import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';


@Component({
  selector: 'app-share-skull',
  templateUrl: './share-skull.component.html',
  styleUrls: ['./share-skull.component.scss']
})
export class ShareSkullComponent  implements OnInit{
  constructor(private router: ActivatedRoute,
              private routing: Router){
  }

  ngOnInit(): void {
    console.log('Entro a la pagina de la calavaerita')
    console.log(this.router.snapshot.paramMap.get('idSkull'))

  }

}
