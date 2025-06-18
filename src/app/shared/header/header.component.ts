import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isEmpresaPage = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isEmpresaPage = this.router.url.includes('/empresas/novo') || this.router.url.includes('/empresas/') && this.router.url.includes('/editar');

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        this.isEmpresaPage = url.includes('/empresas/novo') || (url.includes('/empresas/') && url.includes('/editar'));
      }
    });
  }
}