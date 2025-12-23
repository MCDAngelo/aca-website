import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg p-8 border border-library-saddle/20">
        <h1 className="text-4xl font-serif font-bold text-library-wood mb-2">Privacy Policy</h1>
        <p className="text-sm text-library-wood/60 mb-8">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div className="prose prose-library max-w-none font-serif text-library-wood/90">
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-library-wood mb-4">Overview</h2>
            <p className="mb-4">
              The ACA Archive ("we", "our", or "us") is a private family website for tracking book, movie/TV, and music/podcast recommendations 
              and managing our family's annual culture awards. This Privacy Policy explains how we collect, use, and 
              protect information when you use our website at <a href="https://the-aca-archive.ca" className="text-library-burgundy hover:text-library-burgundy/80">https://the-aca-archive.ca</a>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-library-wood mb-4">Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-library-wood mb-3">1. Google Account Information</h3>
            <p className="mb-4">
              When you sign in with Google OAuth, we collect:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Email address:</strong> Used to identify and authorize family members</li>
              <li><strong>Name:</strong> Used to display your identity in the application</li>
              <li><strong>Profile picture:</strong> Used for display purposes (if available)</li>
              <li><strong>Google User ID:</strong> Used to link your Google account to your family member profile</li>
            </ul>

            <h3 className="text-xl font-semibold text-library-wood mb-3">2. User-Generated Content</h3>
            <p className="mb-4">
              As you use the application, we store:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Book information (titles, authors, ISBNs, descriptions)</li>
              <li>Book recommendations and ratings</li>
              <li>Uploaded book cover images</li>
              <li>Family member profiles and relationships</li>
              <li>Annual "Culture Awards" data</li>
            </ul>

            <h3 className="text-xl font-semibold text-library-wood mb-3">3. Technical Information</h3>
            <p className="mb-4">
              We automatically collect:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Authentication tokens (stored securely in your browser)</li>
              <li>Session information for maintaining your logged-in state</li>
              <li>Error logs for debugging and improving the application</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-library-wood mb-4">How We Use Your Information</h2>
            <p className="mb-4">We use the collected information to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Authenticate users:</strong> Verify that you are an authorized family member</li>
              <li><strong>Provide functionality:</strong> Enable you to add, edit, and view books and recommendations</li>
              <li><strong>Personalize experience:</strong> Display your name and contributions</li>
              <li><strong>Maintain security:</strong> Ensure only authorized family members can access the application</li>
              <li><strong>Improve the service:</strong> Debug issues and add new features</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-library-wood mb-4">Data Storage and Security</h2>
            
            <h3 className="text-xl font-semibold text-library-wood mb-3">Where Your Data is Stored</h3>
            <p className="mb-4">
              Your data is securely stored using <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-library-burgundy hover:text-library-burgundy/80">Supabase</a>, 
              a secure, cloud-based database service. Supabase provides:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>End-to-end encryption for data in transit</li>
              <li>Secure database hosting with regular backups</li>
              <li>Row Level Security (RLS) policies ensuring users can only access authorized data</li>
              <li>Compliance with industry-standard security practices</li>
            </ul>

            <h3 className="text-xl font-semibold text-library-wood mb-3">Book Cover Images</h3>
            <p className="mb-4">
              Uploaded book cover images are stored in Supabase Storage with the following security measures:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Only authenticated family members can upload images</li>
              <li>Images are stored in a secure, private bucket</li>
              <li>Access is controlled through Row Level Security policies</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-library-wood mb-4">Data Sharing and Third Parties</h2>
            
            <h3 className="text-xl font-semibold text-library-wood mb-3">We DO NOT:</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Sell or rent your personal information to anyone</li>
              <li>Share your data with advertisers</li>
              <li>Use your data for marketing purposes</li>
              <li>Transfer your data to third parties (except as noted below)</li>
            </ul>

            <h3 className="text-xl font-semibold text-library-wood mb-3">Third-Party Services We Use:</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                <strong>Google OAuth:</strong> For authentication (covered by <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-library-burgundy hover:text-library-burgundy/80">Google's Privacy Policy</a>)
              </li>
              <li>
                <strong>Supabase:</strong> For database and storage (covered by <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-library-burgundy hover:text-library-burgundy/80">Supabase's Privacy Policy</a>)
              </li>
              <li>
                <strong>Google Books API:</strong> For retrieving book information and cover images (covered by <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-library-burgundy hover:text-library-burgundy/80">Google's Privacy Policy</a>)
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-library-wood mb-4">Your Rights and Choices</h2>
            <p className="mb-4">As a user, you have the right to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Access your data:</strong> View all information associated with your account</li>
              <li><strong>Update your data:</strong> Edit your profile information and contributions</li>
              <li><strong>Delete your data:</strong> Request removal of your account and associated data</li>
              <li><strong>Revoke access:</strong> Disconnect your Google account at any time through Google's security settings</li>
              <li><strong>Sign out:</strong> End your session at any time using the "Sign Out" button</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-library-wood mb-4">Access Control</h2>
            <p className="mb-4">
              The ACA Archive is a <strong>private, family-only application</strong>. Access is restricted to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Authorized family members whose email addresses are pre-registered in our database</li>
              <li>Users who sign in with a Google account matching a registered family member email</li>
            </ul>
            <p className="mb-4">
              If you sign in with a Google account that is not associated with a registered family member, 
              you will be automatically signed out and denied access.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-library-wood mb-4">Cookies and Local Storage</h2>
            <p className="mb-4">
              We use browser local storage to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Maintain your authentication session</li>
              <li>Remember your preferences</li>
              <li>Store temporary data for improved performance</li>
            </ul>
            <p className="mb-4">
              You can clear this data at any time through your browser settings or by signing out of the application.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-library-wood mb-4">Children's Privacy</h2>
            <p className="mb-4">
              This is a private family website. We do not knowingly collect information from children under 13 without 
              parental consent. As a family application, use by minors is at the discretion of their parents or guardians.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-library-wood mb-4">Changes to This Privacy Policy</h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. We will notify users of any material changes by 
              updating the "Last Updated" date at the top of this page. Your continued use of the application after 
              changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-library-wood mb-4">Data Retention</h2>
            <p className="mb-4">
              We retain your data for as long as you remain an active family member in the application. If you wish 
              to have your data removed, please contact us using the information below.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-library-wood mb-4">Contact Us</h2>
            <p className="mb-4">
              If you have questions about this Privacy Policy or wish to exercise your rights regarding your data, 
              please contact the website administrator through your family channels.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-library-wood mb-4">Consent</h2>
            <p className="mb-4">
              By using The ACA Archive, you consent to this Privacy Policy and agree to its terms.
            </p>
          </section>
        </div>

        <div className="mt-8 pt-6 border-t border-library-saddle/20">
          <Link 
            to="/" 
            className="text-library-burgundy hover:text-library-burgundy/80 font-medium transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;

