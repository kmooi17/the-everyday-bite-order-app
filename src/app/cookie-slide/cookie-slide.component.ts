import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-cookie-slide',
  templateUrl: './cookie-slide.component.html',
  styleUrls: ['./cookie-slide.component.scss'],
})
export class CookieSlideComponent implements AfterViewInit {
  #slideIndex = 1;

  cookies: Cookie[] = [
    {
      image: 'astros',
      flavour: 'Astronomical Swirl',
      description: `A vanilla soft cookie with the most amount of astros you can imagine, topped off with velvet cream cheese frosting with a twist.`,
      price: [75, 115],
    },
    {
      image: 'bday-cake',
      flavour: 'Confetti Bomb',
      description: `Your childhood dream in a cookie. It tastes just like your mom's cake batter, topped with the best tasting cream cheese frosting.`,
      price: [70, 110],
    },
    {
      image: 'candy-floss',
      flavour: 'Candy Rain',
      description: `Have you ever had a carnival in your mouth? Well now you can! You think it tastes great... wait until you smell it.`,
      price: [70, 110],
    },
    {
      image: 'coffee',
      flavour: 'Cappa-Cookie',
      description: `Coffee lovers, this one is for you. Have you ever wanted to eat your coffee instead of drink it? Now's your chance.`,
      price: [60, 100],
    },
    {
      image: 'pancakes',
      flavour: 'Surgary-Cin',
      description: ` Ever taken a bite from heaven? Here's your chance with the perfect balance between sweet & savoury. It will always have you coming back for more.`,
      price: [60, 100],
    },
    {
      image: 'mint',
      flavour: 'Mental Mint Bombs',
      description: `Love chocolate but find it too sweet? This is the perfect balance. Chocolate & Mint - name a better duo.`,
      price: [60, 100],
    },
    {
      image: 'choc',
      flavour: 'Chocolate Typhoon',
      description: `Attention all choco-holics! Chocolate three ways, sounds like a party at your place. A bite to die for worth every moment on the hips.`,
      price: [60, 100],
    },
    {
      image: 'nutella',
      flavour: 'Delicate Surprise',
      description: `Every Nutella lover's dream in one cookie, topped with the smoothest Nutella frosting & strawberries just to balance it.`,
      price: [90, 130],
    },
    {
      image: 'oreos',
      flavour: 'Nostalgic Delight',
      description: `This cookie came to shake your taste buds awake. Two cookies for the price of one. A win-win kind of situation.`,
      price: [75, 115],
    },
    {
      image: 'peanutbutter',
      flavour: 'Pean-nutty & nice',
      description:
        'What is better than peanut butter? Mmm... yep I thought so, nothing! It will make you go nuts... in a good way.',
      price: [60, 100],
    },
    {
      image: 'redvelvet',
      flavour: 'Queen of Hearts',
      description:
        'Red Velvet cookie, that will leave even the Queen of Hearts jealous, with the smoothest cream cheese frosting.',
      price: [60, 100],
    },
    // {
    //   image: 'coconut',
    //   flavour: 'Back to the Beach',
    //   description: '',
    //   price: [75, 115],
    // },
    // {
    //   image: 'rooibos',
    //   flavour: 'Mad Hatters Tea Party',
    //   description: '',
    //   price: [60, 100],
    // },
    {
      image: 'straw-cream',
      flavour: 'Lovers Paradise',
      description: `We are taking it back to the basics with a twist on a popular dessert. You can have it all in a few simple bites.`,
      price: [60, 100],
    },
    {
      image: 'twix',
      flavour: 'Twixed Dreams',
      description: `Craving something caramel? We think Twix will satisfy that for you in a split second or even sooner...`,
      price: [70, 110],
    },
  ];

  constructor() {}

  ngAfterViewInit(): void {
    this.#showSlides(this.#slideIndex);
  }

  plusSlides(n: number) {
    this.#showSlides((this.#slideIndex += n));
  }

  currentSlide(n: number) {
    this.#showSlides((this.#slideIndex = n));
  }

  #showSlides(n: number) {
    let slides = document.getElementsByClassName('slides');

    if (n > slides.length) {
      this.#slideIndex = 1;
    }

    if (n < 1) {
      this.#slideIndex = slides.length;
    }

    let slidesArray = Array.prototype.slice.call(slides);
    slidesArray.forEach((element: any) => {
      element.style.display = 'none';
    });

    slidesArray[this.#slideIndex - 1].style.display = 'block';
  }
}

type Cookie = {
  description: string;
  flavour: string;
  image: string;
  price: [number, number];
};
