import React from 'react';
import { Link } from 'react-router-dom';

const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg p-8 border border-library-saddle/20">
        <h1 className="text-4xl font-serif font-bold text-library-wood mb-2">Terms of Service</h1>
        <p className="text-sm text-library-wood/60 mb-8">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div className="prose prose-library max-w-none font-serif text-library-wood/90">
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-library-wood mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using The ACA Archive website at <a href="https://the-aca-archive.ca" className="text-library-burgundy hover:text-library-burgundy/80">https://the-aca-archive.ca</a> (the "Service"), 
              you accept and agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, 
              please do not use the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-library-wood mb-4">2. Description of Service</h2>
            <p className="mb-4">
              The ACA Archive is a <strong>private, family-only website</strong> designed to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Track annual book recommendations among family members</li>
              <li>Maintain a digital archive of family annual culture awards</li>
              <li>Store and display book information, covers, and recommendations</li>
              <li>Facilitate family engagement around shared reading experiences</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-library-wood mb-4">3. Eligibility and Access</h2>
            
            <h3 className="text-xl font-semibold text-library-wood mb-3">3.1 Authorized Users Only</h3>
            <p className="mb-4">
              Access to this Service is restricted to <strong>authorized family members only</strong>. To use the Service, you must:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Have your email address pre-registered in the family member database</li>
              <li>Sign in using a Google account that matches a registered family member email</li>
              <li>Be invited or approved by the family administrator</li>
            </ul>

            <h3 className="text-xl font-semibold text-library-wood mb-3">3.2 Account Security</h3>
            <p className="mb-4">
              You are responsible for:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Maintaining the security of your Google account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying the administrator immediately of any unauthorized access</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-library-wood mb-4">4. User Conduct</h2>
            <p className="mb-4">When using the Service, you agree to:</p>
            
            <h3 className="text-xl font-semibold text-library-wood mb-3">4.1 Permitted Use</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Use the Service for its intended purpose of family book tracking and recommendations</li>
              <li>Provide accurate and truthful information</li>
              <li>Respect other family members' contributions and opinions</li>
              <li>Upload only appropriate book cover images and content</li>
            </ul>

            <h3 className="text-xl font-semibold text-library-wood mb-3">4.2 Prohibited Conduct</h3>
            <p className="mb-4">You agree NOT to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Share your access credentials with unauthorized individuals</li>
              <li>Attempt to access accounts or data belonging to other users</li>
              <li>Upload malicious content, viruses, or harmful code</li>
              <li>Use the Service for any illegal or unauthorized purpose</li>
              <li>Interfere with or disrupt the Service or servers</li>
              <li>Scrape, copy, or extract data using automated means</li>
              <li>Upload content that infringes on intellectual property rights</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-library-wood mb-4">5. Content and Intellectual Property</h2>
            
            <h3 className="text-xl font-semibold text-library-wood mb-3">5.1 Your Content</h3>
            <p className="mb-4">
              You retain ownership of any content you submit (book recommendations, reviews, uploaded images). 
              By submitting content, you grant the Service a license to store, display, and use your content 
              solely for the purpose of operating the family archive.
            </p>

            <h3 className="text-xl font-semibold text-library-wood mb-3">5.2 Third-Party Content</h3>
            <p className="mb-4">
              Book information and cover images may be sourced from:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Google Books API:</strong> Subject to Google's terms of service</li>
              <li><strong>User uploads:</strong> Users are responsible for ensuring they have rights to upload images</li>
            </ul>

            <h3 className="text-xl font-semibold text-library-wood mb-3">5.3 Service Intellectual Property</h3>
            <p className="mb-4">
              The Service's design, code, features, and functionality are owned by the ACA Archive and protected by 
              copyright and other intellectual property laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-library-wood mb-4">6. Privacy</h2>
            <p className="mb-4">
              Your use of the Service is also governed by our <Link to="/privacy" className="text-library-burgundy hover:text-library-burgundy/80">Privacy Policy</Link>, 
              which describes how we collect, use, and protect your information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-library-wood mb-4">7. Disclaimers and Limitation of Liability</h2>
            
            <h3 className="text-xl font-semibold text-library-wood mb-3">7.1 "As Is" Service</h3>
            <p className="mb-4">
              The Service is provided "as is" and "as available" without warranties of any kind, either express or implied, 
              including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.
            </p>

            <h3 className="text-xl font-semibold text-library-wood mb-3">7.2 No Guarantee of Availability</h3>
            <p className="mb-4">
              We do not guarantee that the Service will be uninterrupted, timely, secure, or error-free. We may 
              suspend or terminate the Service at any time for maintenance or other reasons.
            </p>

            <h3 className="text-xl font-semibold text-library-wood mb-3">7.3 Limitation of Liability</h3>
            <p className="mb-4">
              To the fullest extent permitted by law, the ACA Archive shall not be liable for any indirect, incidental, 
              special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly 
              or indirectly, or any loss of data, use, goodwill, or other intangible losses.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-library-wood mb-4">8. Data Backup and Loss</h2>
            <p className="mb-4">
              While we implement reasonable backup procedures, we are not responsible for data loss. Users should 
              maintain their own copies of important information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-library-wood mb-4">9. Third-Party Services</h2>
            <p className="mb-4">
              The Service uses third-party services including:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Google OAuth:</strong> Subject to <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="text-library-burgundy hover:text-library-burgundy/80">Google's Terms of Service</a></li>
              <li><strong>Supabase:</strong> Subject to <a href="https://supabase.com/terms" target="_blank" rel="noopener noreferrer" className="text-library-burgundy hover:text-library-burgundy/80">Supabase's Terms</a></li>
              <li><strong>Google Books API:</strong> Subject to <a href="https://developers.google.com/terms" target="_blank" rel="noopener noreferrer" className="text-library-burgundy hover:text-library-burgundy/80">Google API Terms</a></li>
            </ul>
            <p className="mb-4">
              Your use of these third-party services is subject to their respective terms and policies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-library-wood mb-4">10. Termination</h2>
            
            <h3 className="text-xl font-semibold text-library-wood mb-3">10.1 By You</h3>
            <p className="mb-4">
              You may stop using the Service at any time by signing out and disconnecting your Google account.
            </p>

            <h3 className="text-xl font-semibold text-library-wood mb-3">10.2 By Us</h3>
            <p className="mb-4">
              We reserve the right to suspend or terminate your access to the Service at any time, with or without 
              notice, for any reason, including:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Violation of these Terms</li>
              <li>At the request of family administrators</li>
              <li>For maintenance or security reasons</li>
              <li>Discontinuation of the Service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-library-wood mb-4">11. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify these Terms at any time. We will notify users of material changes by 
              updating the "Last Updated" date at the top of this page. Your continued use of the Service after 
              changes constitutes acceptance of the modified Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-library-wood mb-4">12. Governing Law</h2>
            <p className="mb-4">
              These Terms shall be governed by and construed in accordance with the laws of Canada and the 
              province where the service administrator resides, without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-library-wood mb-4">13. Family Nature of Service</h2>
            <p className="mb-4">
              This is a private family service operated on a personal, non-commercial basis. The Terms reflect this 
              informal nature while ensuring appropriate protections for all users.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-library-wood mb-4">14. Severability</h2>
            <p className="mb-4">
              If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited 
              or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-library-wood mb-4">15. Contact</h2>
            <p className="mb-4">
              If you have questions about these Terms, please contact the website administrator through your family channels.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-library-wood mb-4">16. Entire Agreement</h2>
            <p className="mb-4">
              These Terms, together with the Privacy Policy, constitute the entire agreement between you and 
              The ACA Archive regarding the use of the Service.
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

export default TermsPage;

