# DreamJob Hub

Build a modern, fully responsive job hiring website called "HireHub" using React (or Next.js) with Tailwind CSS and Framer Motion for animations.

Design & Aesthetic:

Vibrant, colorful appearance: use a gradient-heavy palette (indigo → violet → pink, with coral/amber accents), soft glassmorphism cards, and generous rounded corners.

Smooth transitions everywhere: page transitions with fade + slide effects, scroll-triggered reveal animations, hover effects on cards (lift + glow), animated gradient backgrounds, and a smooth-scrolling navbar that changes style on scroll.

Micro-interactions: buttons with ripple/scale effects, animated counters for stats, and skeleton loaders for job listings.

Pages & Sections:

Home — hero section with animated gradient headline, a search bar (job title + location), floating illustration or animated blobs, stats section (jobs posted, companies, hires), featured job categories with colorful icon cards, and testimonials carousel.

Jobs Listing — filterable/searchable grid of job cards (filter by category, location, salary range, job type) with smooth filter animations and pagination or infinite scroll.

Job Details — full description, company info, salary, requirements, and an animated "Apply Now" modal with a multi-step form.

Companies — grid of company profile cards with logos and open-role counts.

Post a Job — employer form with animated field validation and a live preview of the job card.

Login / Sign Up — split-screen layout with a colorful illustration side and animated form side, toggle between job seeker and employer roles.

Functionality:

Use mock JSON data for jobs and companies (at least 12 sample jobs).

Working search and filters on the client side.

Dark mode toggle with smooth theme transition.

Mobile-first responsive design with an animated hamburger menu.

Quality bar: clean component structure, reusable UI components, accessible (semantic HTML, focus states, ARIA labels), and 60fps animations using transform/opacity only. Deliver polished, production-quality code.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://hirehublk.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/9d55bfa9-56cb-4dd8-ad83-ed5da5a3b87b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
