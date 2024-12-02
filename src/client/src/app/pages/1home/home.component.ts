import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {CarouselComponent} from '../../components/carousel/carousel.component';

@Component({
  selector: 'app-home',
  imports: [
    CarouselComponent
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  title = 'Stock Market Insights';

  carouselImages = [
    {
      src: '/images/Stocks.jpg',
      alt: 'Stock Market Insights',
      title: 'Stock Market Insights',
      caption: 'Get real-time updates on stock market trends.',
      width: '1600',
      height: '900',
    },
    {
      src: '/images/Stocks1.jpg',
      alt: 'Client Management',
      title: 'Client Management',
      caption: "Effortlessly manage your clients' portfolios.",
      width: '1400',
      height: '934',
    },
    {
      src: '/images/Stocks2.jpg',
      alt: 'Portfolio Simulation',
      title: 'Portfolio Simulation',
      caption: 'Simulate portfolio performance with accuracy.',
      width: '3200',
      height: '1800',
    },
  ];

}
