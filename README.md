# Music Portfolio Website

A dark-themed design and art portfolio website inspired by modern music streaming services like Spotify. Built with React, TypeScript, and Framer Motion.

## Features

### 🎵 Work Tab (Music Player Interface)
- **Music Player Controls**: Play/pause, previous/next track buttons
- **Auto-play**: Automatically cycles through projects every 8 seconds when playing
- **Progress Bar**: Visual progress indicator for current project cycle
- **Project Display**: Full project details with images, descriptions, and technologies
- **Live Links**: Direct links to live demos and source code

### 🖼️ Art Gallery Tab
- **Grid Layout**: Organized by year with clean section headers
- **Modal View**: Click any artwork to open expanded view
- **Navigation**: Previous/next navigation within modal
- **Detailed Info**: Title, year, medium, dimensions, and descriptions

### 👤 About Tab
- **Professional Bio**: Personal information and background
- **Skills Grid**: Organized by category (Frontend, Backend, Design, Tools)
- **Contact Section**: Email and social media links
- **Resume Download**: Direct download functionality

### ✨ Additional Features
- **Keyboard Controls**: 
  - Spacebar for play/pause
  - Arrow keys for navigation (Work tab)
- **Responsive Design**: Mobile-first approach with breakpoints
- **Dark Theme**: Modern color scheme with Spotify-inspired design
- **Smooth Animations**: Page transitions and micro-interactions
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Styled Components
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Development**: Hot Module Replacement (HMR)

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd music-portfolio
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   ├── Navigation/      # Top navigation component
│   ├── Work/           # Music player interface
│   ├── Art/            # Gallery and modal components
│   ├── About/          # About page layout
│   └── UI/             # Reusable UI components
├── contexts/           # React Context for state management
├── hooks/              # Custom React hooks
├── styles/             # Theme and global styles
├── data/              # Placeholder data
├── types/             # TypeScript type definitions
└── App.tsx            # Main application component
```

## Customization

### Adding Your Content

1. **Projects**: Update `src/data/projects.ts` with your portfolio projects
2. **Artwork**: Update `src/data/artwork.ts` with your art pieces
3. **Personal Info**: Update the About tab content in `src/components/About/AboutTab.tsx`
4. **Theme**: Modify colors and styles in `src/styles/theme.ts`

### Images
Replace the placeholder images with your own:
- Use high-quality images (recommended: 800x600px for projects)
- Ensure images are optimized for web
- Consider using a CDN or image hosting service

## Keyboard Shortcuts

When on the Work tab:
- **Spacebar**: Toggle play/pause
- **Left Arrow**: Previous project
- **Right Arrow**: Next project

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Performance

- Lazy loading for images
- Optimized animations
- Minimal bundle size
- Fast development with Vite

## License

This project is open source and available under the MIT License.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Contact

For questions or feedback about this portfolio template, please reach out through the contact form on the About page.
