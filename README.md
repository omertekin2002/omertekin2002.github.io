# CV Website

A personal CV website built with the [cvless](https://github.com/piazzai/cvless) Jekyll theme. This website showcases professional experience, skills, and includes a blog section.

## Features

- **Clean Design**: Modern, minimalist design focused on content
- **Responsive**: Works perfectly on all devices
- **Fast**: Optimized for performance
- **Blog Support**: Built-in blog functionality with Jekyll
- **GitHub Pages Ready**: Easy deployment to GitHub Pages

## Pages

- **Home** (`/`): Introduction and about section
- **CV** (`/cv`): Detailed curriculum vitae
- **Blog** (`/posts`): Blog posts and articles
- **404**: Custom error page

## Local Development

### Prerequisites

- Ruby (version 2.6 or higher)
- Bundler gem

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/omertekin2002/omertekin2002.github.io.git
   cd omertekin2002.github.io
   ```

2. **Install dependencies**
   ```bash
   bundle install
   ```

3. **Run locally**
   ```bash
   bundle exec jekyll serve
   ```

4. **View the website**
   Open your browser and go to `http://localhost:4000`

## Customization

### Personal Information

Edit the following files to customize your personal information:

1. **`_config.yml`**: Update author information, contact details, and social media links
2. **`cv.md`**: Modify your CV content with your actual experience, education, and skills
3. **`index.md`**: Update the home page content
4. **`assets/files/photo.jpg`**: Replace with your actual photo
5. **`assets/files/cv.pdf`**: Replace with your actual CV PDF

### Styling

The website uses the cvless theme, which can be customized by:
- Modifying CSS in the `_sass` directory (if you want to override theme styles)
- Updating the theme configuration in `_config.yml`

## Deployment

### GitHub Pages

This website is configured to be deployed on GitHub Pages:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial CV website setup"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository settings on GitHub
   - Navigate to "Pages" section
   - Select "Deploy from a branch"
   - Choose the `main` branch
   - Select the root folder (`/`)
   - Click "Save"

3. **Wait for deployment**
   - GitHub Pages will automatically build and deploy your site
   - Your website will be available at `https://omertekin2002.github.io`

### Custom Domain (Optional)

To use a custom domain:

1. **Add CNAME file**
   Create a `CNAME` file in the root directory with your domain:
   ```
   yourdomain.com
   ```

2. **Configure DNS**
   - Add a CNAME record pointing to `omertekin2002.github.io`
   - Or add an A record pointing to GitHub Pages IP addresses

3. **Update GitHub Pages settings**
   - Go to repository settings > Pages
   - Enter your custom domain
   - Check "Enforce HTTPS" if available

## File Structure

```
├── _config.yml          # Site configuration
├── _posts/              # Blog posts
├── assets/              # Static assets (images, files)
│   └── files/           # CV PDF and photo
├── cv.md               # CV page content
├── index.md            # Home page content
├── posts.md            # Blog listing page
├── 404.md              # Error page
├── Gemfile             # Ruby dependencies
└── README.md           # This file
```

## Contributing

This is a personal website, but if you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License

This project is based on the [cvless](https://github.com/piazzai/cvless) Jekyll theme. Please refer to the original theme's license for more information.

## Support

For issues related to:
- **Jekyll**: [Jekyll Documentation](https://jekyllrb.com/docs/)
- **cvless theme**: [cvless GitHub Repository](https://github.com/piazzai/cvless)
- **GitHub Pages**: [GitHub Pages Documentation](https://docs.github.com/en/pages) 