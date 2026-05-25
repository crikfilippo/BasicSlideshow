# BasicSlideshow.js

A simple JS class to render a scrollable slideshow from a list of slide objects.

**Notes:**
- Single file class, no dependencies needed (optionally integrates with `BasicConsoleLogger`).
- Slides are rendered as `<a>` elements with a background image, title, and optional link.
- Supports dummy placeholder slides while real content loads.
- Default fallback image is built-in as a base64 PNG — no external asset required.
- Remote images can optionally be converted to base64 before rendering.

---

## Usage

Include the class in your project and instantiate it with your preferred options.

```js
let slideshow = new BasicSlideshow({
    wrapperQuery : '#my-slideshow',
    isLogEnabled : true
});
```

- The class queries the DOM for the wrapper element and builds the slideshow inside it.
- If no `slides` array is provided, dummy placeholder slides are rendered automatically.
- Call `addSlide(slide)` at any time to append a new slide to the slideshow.

---

## Constructor options

```js
new BasicSlideshow({
    wrapperQuery       : '#my-slideshow',   // CSS selector for the wrapper element
    instanceName       : 'Basic Slideshow', // string prefix shown in every log line
    isLogEnabled       : true,              // set to false to silence all logs
    defaultImageUrl    : '/path/image.png', // fallback image URL (built-in base64 if omitted)
    convertDefaultToB64: false,             // fetch and convert defaultImageUrl to base64
    slides             : [ /* slide objects */ ],
    dummySlides        : [{},{},{},{},{},{}] // placeholders shown before real slides load
});
```

---

## Slide object

Each entry in the `slides` array supports the following properties:

| Property        | Type     | Default        | Description                                      |
|-----------------|----------|----------------|--------------------------------------------------|
| `texts.title`   | `string` | `'Lorem Ipsum'`| Title text rendered on the slide                 |
| `href`          | `string` | `'#'`          | Link target of the slide                         |
| `target`        | `string` | `'_self'`      | Link `target` attribute (`_blank`, etc.)         |
| `image.url`     | `string` | default image  | Background image URL for the slide               |
| `order`         | `number` | slide index    | CSS `order` value for custom sorting             |

```js
new BasicSlideshow({
    wrapperQuery : '#my-slideshow',
    slides : [
        {
            texts  : { title: 'First slide' },
            href   : 'https://example.com',
            target : '_blank',
            image  : { url: '/img/slide1.jpg' },
            order  : 0
        },
        {
            texts  : { title: 'Second slide' },
            href   : 'https://example.com/two',
            image  : { url: '/img/slide2.jpg' }
        }
    ]
});
```

---

## Adding slides dynamically

```js
// Synchronous (default)
slideshow.addSlide({ texts: { title: 'New slide' }, href: '/new' });

// Async — appended after a short timeout (useful for non-blocking rendering)
slideshow.addSlide({ texts: { title: 'New slide' }, href: '/new' }, true);
```

---

## CSS

Include `BasicSlideshow.css` in your page. The class applies the following CSS hooks:

| Class                            | Element          |
|----------------------------------|------------------|
| `.basic-slideshow`               | wrapper          |
| `.basic-slideshow-scroller`      | inner scroll row |
| `.basic-slideshow-slide`         | each `<a>` slide |
| `.basic-slideshow-slide-dummy`   | placeholder slide|
| `.basic-slideshow-image`         | image layer      |
| `.basic-slideshow-title`         | title layer      |

---

*@author Filippo Maria Grilli — [@crikfilippo](https://github.com/crikfilippo)*  
*@license MIT*  
*@version 1.0.0*
