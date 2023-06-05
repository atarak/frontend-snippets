# Frontend Mentor - QR code component solution

This is a solution to the [QR code component challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/qr-code-component-iux_sIO_H). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Frontend Mentor - QR code component solution](#frontend-mentor---qr-code-component-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [Screenshot](#screenshot)
    - [Links](#links)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
      - [**Custom CSS Properties**](#custom-css-properties)
      - [**BEM Methodology**](#bem-methodology)
      - [**CSS Grid with Minimum Column Width for Responsive Design**](#css-grid-with-minimum-column-width-for-responsive-design)
  - [Author](#author)

## Overview

### Screenshot

![](./design/desktop-screenshot-zoom-20230524.png)

### Links

- GitHub Repo: [QR-Code-Component](https://atarak.github.io/fm-qr-code-component/)

## My process

### Built with

- Semantic HTML5 Markup
- CSS Custom Properties
- CSS Grid
- BEM Methodology
- [Challenge style guide](style-guide.md)


### What I learned
#### **Custom CSS Properties**
Using custom CSS properties can be a helpful way to translate style guidelines into reusable variables.

For example, in the style-guide.md file, we see that 2 font weights are specified (400, 700). We can turn these values into resuable variables with meaningful names.
```css
    :root {
        --fw-title: 700;
        --fw-caption: 400;
    }
```

#### **BEM Methodology**
The [Block-Element-Modifier Methodology](https://getbem.com/) makes CSS easy to read and maintain by applying a set of guidelines that encourage modular, flexible components and naming conventions.

As a first start to adopt this methodology, I created two custom CSS properties for the text color and property names for the elements of the QR code card.

```css
:root {
    --clr-text-light: hsl(220, 15%, 55%);
    --clr-text-dark: hsl(218, 44%, 22%);
}

.card__caption {
    color: var(--clr-text-light);
    font-weight: var(--fw-caption);
    margin: 1em 2em;
    font-size: 0.7em;
}
```

#### **CSS Grid with Minimum Column Width for Responsive Design**
Although this page was very simple, I decided to use CSS Grid for the formatting of the main content as well as the card itself. To improve the image's size and proportions as part of the responsive design, I set a value for the ideal width of the columns (QR code image).

```css
    grid-template-columns: repeat(auto-fit, 22em);
```

## Author

- GitHub - [Atarak](https://atarak.github.io/)
- Frontend Mentor - [@atarak](https://www.frontendmentor.io/profile/atarak)
