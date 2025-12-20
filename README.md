# ACA Archive Website

A family website for tracking annual book recommendations ("Culture Awards").

## Tech Stack

- **Frontend**: React with TypeScript, styled with Tailwind CSS
- **Backend**: Supabase for authentication, database, and storage
- **External APIs**: Google Books API for book information

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- A Supabase account
- A Google Cloud project with OAuth credentials

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/aca-website.git
   cd aca-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   REACT_APP_SUPABASE_URL=your_supabase_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
   REACT_APP_GOOGLE_BOOKS_API_KEY=your_google_books_api_key
   ```

4. Set up your Supabase database:
   - Create a new Supabase project
   - Run the SQL queries from `setup_database.sql` in the SQL editor

5. Configure Google OAuth:
   - Set up OAuth credentials in Google Cloud Console
   - Configure the redirect URI in Supabase Auth settings
   - Link your Google project ID in Supabase

### Development

Start the development server:
```bash
npm start
```

The app will be running at [http://localhost:3000](http://localhost:3000).

## Testing

### UI Testing

1. Start the development server and visually verify the UI components.
2. Test responsive design by resizing the browser window or using device emulation.

### Authentication Testing

1. Test the Google OAuth login flow by clicking "Sign In" on the login page.
2. Verify that user state is maintained across page navigation.
3. Test logout functionality.

### Data Testing

1. With sample data in the database, verify that books, years, and recommendations display correctly.
2. Test the search functionality on the Books page.
3. Test filtering by year on the Years page.

### Admin Testing

1. Login as an admin user.
2. Verify that admin-only buttons and pages are accessible.
3. Test admin functionality like adding/editing books, years, and recommendations.

## Deployment

1. Build the production version:
   ```bash
   npm run build
   ```

2. Deploy the `build` folder to your hosting provider of choice (Vercel, Netlify, etc.)
