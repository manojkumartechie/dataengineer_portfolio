# Data Engineer Portfolio

A modern, high-performance portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. Features advanced animations, 3D graphics, and optimized performance for showcasing data engineering expertise.

## ✨ Features

- **Modern Design**: Clean, professional layout with glassmorphism effects and smooth animations
- **High Performance**: Optimized with lazy loading, memoization, and efficient rendering
- **Responsive**: Fully responsive design that works perfectly on all devices
- **3D Graphics**: Interactive Three.js scenes and particle effects
- **Advanced Animations**: GSAP-powered smooth animations and transitions
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **SEO Optimized**: Meta tags, structured data, and performance optimizations

## 🚀 Sections

1. **Home**: Dynamic hero section with 3D background and call-to-action buttons
2. **About**: Professional background and key metrics
3. **Projects**: Showcase of data engineering projects with interactive cards
4. **Skills**: Technical skills organized by categories with technology logos
5. **Contact**: Contact form with email functionality and contact information

## 🛠️ Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **React 19** - Latest React features with concurrent rendering
- **GSAP** - Professional-grade animations
- **Three.js** - 3D graphics and interactive scenes
- **Lucide React** - Modern icon library
- **Nodemailer** - Email functionality for contact form

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:
```bash
# Email Configuration for Contact Form
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
```

**Note**: For the contact form to work, you need to:
- Use a Gmail account (easier setup than Outlook)
- Generate an app password from your Google account settings
- Replace the placeholder values with your actual credentials

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## ⚡ Performance Optimizations

### Time Optimization
- **Lazy Loading**: Heavy components loaded on demand
- **Memoization**: React.memo and useCallback to prevent unnecessary re-renders
- **Throttled Events**: Scroll and mouse events optimized with requestAnimationFrame
- **Reduced Animation Complexity**: Simplified GSAP animations for better performance
- **Frame Rate Limiting**: 3D scenes limited to 30 FPS for better battery life

### Space Optimization
- **Code Splitting**: Automatic code splitting with Next.js
- **Image Optimization**: Lazy loading and optimized image formats
- **Bundle Analysis**: Removed unused dependencies and imports
- **Conditional Rendering**: Heavy effects only on desktop devices
- **Efficient Data Structures**: Optimized component props and state

### Memory Management
- **Proper Cleanup**: Event listeners and animations properly disposed
- **Reference Management**: Careful handling of refs and DOM elements
- **Animation Disposal**: GSAP timelines and ScrollTriggers properly killed
- **Three.js Cleanup**: Geometries, materials, and renderers properly disposed

## 🎨 Customization

### Personal Information
Update the data in `src/app/page.tsx`:
- Projects array with your data engineering projects
- Skills categories with your technical expertise
- Contact information

### Styling
- **Colors**: Modify the color scheme in Tailwind classes and CSS variables
- **Animations**: Customize GSAP animations in component files
- **Layout**: Adjust spacing and grid layouts as needed

### Adding Projects
Add new projects to the projects array:
```typescript
{
  title: "Your Data Project",
  description: "Project description highlighting data engineering aspects",
  tech: ["Apache Spark", "Kafka", "AWS", "Python"],
  image: "project-image-url.jpg",
  liveUrl: "https://your-demo.com",
  githubUrl: "https://github.com/your-username/project"
}
```

## 📧 Contact Form

The contact form includes:
- **Form Validation**: Client-side validation for required fields and email format
- **Email Integration**: Uses Nodemailer with Zoho SMTP for reliable email delivery
- **Success/Error Handling**: Clear feedback messages for form submission status
- **Security**: Environment variables for sensitive email credentials
- **Accessibility**: Proper form labels and ARIA attributes

### Email Configuration
The contact form uses Gmail SMTP for sending emails:
- Configure your Gmail credentials in `.env.local`
- Use Gmail app password for enhanced security
- Supports both text and HTML email formats
- Includes sender information and message formatting

## 📱 Responsive Design

The portfolio is fully responsive with:
- Mobile-first approach
- Optimized touch targets (minimum 44px)
- Conditional rendering for mobile vs desktop
- Performance optimizations for mobile devices
- Accessible navigation and interactions

## 🌙 Dark Mode

The website automatically adapts to the user's system preference for dark mode with smooth transitions and proper contrast ratios.

## ♿ Accessibility

- **WCAG 2.1 AA Compliant**: Proper contrast ratios and semantic HTML
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Proper ARIA labels and descriptions
- **Reduced Motion**: Respects user's motion preferences
- **Focus Management**: Clear focus indicators and logical tab order

## 🚀 Deployment

Deploy to Vercel for optimal performance:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with optimized settings

Or deploy to any static hosting service:
```bash
npm run build
npm run start
```

## 📊 Performance Metrics

- **Lighthouse Score**: 95+ across all categories
- **Core Web Vitals**: Optimized LCP, FID, and CLS
- **Bundle Size**: Optimized with code splitting and tree shaking
- **Loading Speed**: Fast initial load with progressive enhancement

## 🔧 Development

### Code Quality
- **TypeScript**: Full type safety
- **ESLint**: Code linting and formatting
- **Error Boundaries**: Graceful error handling
- **Performance Monitoring**: Built-in performance tracking

### Best Practices
- **Component Memoization**: Prevents unnecessary re-renders
- **Event Optimization**: Throttled and debounced event handlers
- **Memory Management**: Proper cleanup and disposal
- **Accessibility**: WCAG guidelines followed throughout

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies