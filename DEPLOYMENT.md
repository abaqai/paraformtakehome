# Deployment Guide

## Vercel Deployment

### Step 1: Prepare Your Repository

1. **Initialize Git** (if not already done)
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Paraform takehome project"
   ```

2. **Create GitHub Repository**
   - Go to GitHub and create a new repository
   - Push your code to GitHub:
   ```bash
   git remote add origin https://github.com/yourusername/paraform-takehome.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Environment Variables**
   In the Vercel project settings, add these environment variables:
   ```
   GREENHOUSE_API_KEY=f06b2b153e016f8e7c3632627af56b1d-7
   GREENHOUSE_JOB_ID=4285367007
   GREENHOUSE_USER_ID=4280249007
   ```

3. **Deploy**
   - Vercel will automatically detect it's a Next.js project
   - Click "Deploy"
   - Your app will be live at `https://your-project-name.vercel.app`

### Step 3: Verify Deployment

1. **Test the Application**
   - Navigate to your deployed URL
   - Verify the job details are displayed
   - Test the candidate selection modal
   - Test the application submission process

2. **Check API Endpoints**
   - Test the `/api/submit-application` endpoint
   - Verify Greenhouse integration is working

## Environment Variables

### Required Variables
- `GREENHOUSE_API_KEY`: Your Greenhouse API key
- `GREENHOUSE_JOB_ID`: The job ID to submit applications to
- `GREENHOUSE_USER_ID`: User ID for API requests

### Optional Variables
- `NEXT_PUBLIC_APP_URL`: Your deployed app URL (for production)

## Troubleshooting

### Common Issues

1. **Build Errors**
   - Check that all dependencies are installed
   - Verify TypeScript compilation
   - Run `npm run build` locally to test

2. **API Errors**
   - Verify environment variables are set correctly
   - Check Greenhouse API key permissions
   - Test API endpoints locally first

3. **Styling Issues**
   - Ensure Tailwind CSS is properly configured
   - Check that all CSS classes are valid

### Debugging

1. **Local Testing**
   ```bash
   npm run dev
   # Test at http://localhost:3000
   ```

2. **Build Testing**
   ```bash
   npm run build
   npm run start
   ```

3. **Linting**
   ```bash
   npm run lint
   ```

## Performance Optimization

### Vercel Optimizations
- Automatic image optimization
- Edge functions for API routes
- CDN distribution
- Automatic HTTPS

### Code Optimizations
- Lazy loading of components
- Optimized bundle size
- Efficient API calls
- Proper error handling

## Monitoring

### Vercel Analytics
- Enable Vercel Analytics in project settings
- Monitor performance metrics
- Track user interactions

### Error Tracking
- Set up error monitoring (e.g., Sentry)
- Monitor API response times
- Track Greenhouse API usage

## Security

### Best Practices
- Environment variables for sensitive data
- API key rotation
- HTTPS enforcement
- Input validation
- Rate limiting (if needed)

### Greenhouse API Security
- Use API keys with minimal required permissions
- Monitor API usage
- Implement proper error handling
- Validate all inputs

## Maintenance

### Regular Tasks
- Update dependencies
- Monitor API usage
- Check for security updates
- Review performance metrics

### Updates
- Keep Next.js updated
- Update Greenhouse API integration
- Monitor for breaking changes
- Test thoroughly before deploying

---

For support, refer to:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Greenhouse API Documentation](https://developers.greenhouse.io/) 