import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  social: any = [
    {
      url: 'https://www.facebook.com/sumer.labs',
      alt: 'Social facebook',
      logo: 'assets/logos/social/facebook.png',
    },
    {
      url: 'https://www.instagram.com/sumer.latam/',
      alt: 'Social instagram',
      logo: 'assets/logos/social/instagram.png',
    },
    {
      url: 'https://www.youtube.com/channel/UC5w8VzETzelhwZn8RXWrFEw',
      alt: 'Social youtube',
      logo: 'assets/logos/social/youtube.png',
    },
    {
      url: 'https://www.tiktok.com/@sumer.latam',
      alt: 'Social tiktok',
      logo: 'assets/logos/social/tiktok.png',
    },
    {
      url: 'https://www.linkedin.com/company/sumerlatam',
      alt: 'Social linkedin',
      logo: 'assets/logos/social/linkedin.png',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
