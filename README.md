# NCC Website

A modern, responsive website for the National Cadet Corps (NCC) unit of a college/university. This website showcases NCC activities, events, and provides information for students interested in joining the organization.

## Features

- Responsive design that works on all devices
- Modern and patriotic color scheme
- Dynamic content loading
- Interactive gallery
- Event management system
- Contact form
- Google Maps integration
- Smooth scrolling navigation
- Animated sections
- Mobile-friendly layout

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap 5
- Font Awesome
- Google Maps API

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ncc-website.git
   ```

2. Navigate to the project directory:
   ```bash
   cd ncc-website
   ```

3. Create an `images` folder and add the following images:
   - `ncc-logo.png` - NCC logo for the navbar
   - `hero-bg.jpg` - Hero section background image
   - `training1.jpg`, `training2.jpg`, `training3.jpg` - Training section images
   - `gallery1.jpg` through `gallery6.jpg` - Gallery images

4. Get a Google Maps API key:
   - Go to the [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the Maps Embed API
   - Create credentials (API key)
   - Replace `YOUR_API_KEY` in `js/main.js` with your actual API key

5. Open `index.html` in your web browser to view the website.

## Project Structure

```
ncc-website/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/
│   ├── ncc-logo.png
│   ├── hero-bg.jpg
│   ├── training1.jpg
│   ├── training2.jpg
│   ├── training3.jpg
│   ├── gallery1.jpg
│   ├── gallery2.jpg
│   ├── gallery3.jpg
│   ├── gallery4.jpg
│   ├── gallery5.jpg
│   └── gallery6.jpg
└── README.md
```

## Customization

1. **Colors**: Edit the CSS variables in `css/style.css` to change the color scheme:
   ```css
   :root {
       --navy-blue: #000080;
       --saffron: #FF9933;
       --white: #FFFFFF;
       --light-gray: #f8f9fa;
       --dark-gray: #343a40;
   }
   ```

2. **Content**: 
   - Update the text content in `index.html`
   - Modify the events array in `js/main.js` to change the events section
   - Update the gallery images array in `js/main.js` to change the gallery section

3. **Images**:
   - Replace the images in the `images` folder with your own
   - Make sure to maintain the same file names or update the references in the code

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Bootstrap 5 for the responsive framework
- Font Awesome for the icons
- Google Maps API for the map integration 