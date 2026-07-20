import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Terms = () => {
  // Scroll to top when page loaded
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />

      <main className="flex-1 py-16 px-6 relative overflow-hidden">
        {/* Glow blobs */}
        <div className="absolute top-24 -left-36 w-96 h-96 rounded-full glow-blob-indigo blur-[120px] pointer-events-none z-0 opacity-30" />
        <div className="absolute bottom-48 -right-36 w-96 h-96 rounded-full glow-blob-amber blur-[120px] pointer-events-none z-0 opacity-20" />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-150 dark:border-indigo-900/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              Legal Documents
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
              Terms & Conditions
            </h1>
            <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mt-3">
              Last updated: July 20, 2026
            </p>
          </div>

          {/* Terms Content Container */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-12 shadow-sm space-y-8 text-slate-650 dark:text-slate-300 leading-relaxed text-sm md:text-base">
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <span className="text-indigo-600 dark:text-indigo-400">1.</span> Acceptance of Terms
              </h2>
              <p>
                Welcome to the official portal of <strong>OPTIMIX CLUB</strong>. By accessing, browsing, registering an account, or participating in our hackathons, tech quizzes, workshops, or notice updates, you acknowledge that you have read, understood, and agreed to be legally bound by these Terms & Conditions. If you do not agree to these terms, please refrain from registering or using our portal.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <span className="text-indigo-600 dark:text-indigo-400">2.</span> Account Registration & Security
              </h2>
              <p>
                To utilize certain services (e.g., event registration, notice management, submitting testimonials), users are required to sign up. 
              </p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>You must provide accurate, current, and complete information during registration.</li>
                <li>You are solely responsible for maintaining the confidentiality of your account credentials (email and password).</li>
                <li>You agree to upload a professional student profile photo. Uploading inappropriate media, graphics, or content violating student codes of conduct is strictly prohibited and can lead to account suspension.</li>
                <li>You must immediately notify the Club administrators of any unauthorized use or security breach of your account.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <span className="text-indigo-600 dark:text-indigo-400">3.</span> Event Registrations & Approvals
              </h2>
              <p>
                The OPTIMIX Club hosts multiple technical hackathons, quizzes, and workshops. While registration is open to eligible students of Rajkiya Engineering College, Azamgarh, final participation is subject to admin approval.
              </p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>Submitting an event registration form does not guarantee admission. Admins review and approve entries based on eligibility, seat limit, or pre-requisites.</li>
                <li>Approved users will be notified on their student dashboard under the "My Registrations" section.</li>
                <li>No duplicate registrations are permitted for the same event by a single student.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <span className="text-indigo-600 dark:text-indigo-400">4.</span> Code of Conduct
              </h2>
              <p>
                Members and users of the OPTIMIX Club portal are expected to maintain the highest standards of integrity, respect, and academic honesty.
              </p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li><strong>Respectful Collaboration:</strong> Any form of harassment, hate speech, spamming, or abuse against students, faculty, or administrators is strictly forbidden.</li>
                <li><strong>No Cheating:</strong> Cheating, copying code, plagiarism, or tampering with files/systems during club-organized hackathons, quizzes, and technical events will trigger immediate disqualification and possible institutional action.</li>
                <li><strong>System Integrity:</strong> You agree not to distribute malicious software, bypass security measures, or attempt to hack/disrupt the server infrastructure or APIs.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <span className="text-indigo-600 dark:text-indigo-400">5.</span> Notice Board & Announcements
              </h2>
              <p>
                The Notice Board is managed by Club coordinators, admins, and superadmins. While general users can view announcements, only authorized administrators may post or edit notices. Any information posted on the platform is property of OPTIMIX Club.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <span className="text-indigo-600 dark:text-indigo-400">6.</span> Limitation of Liability & Termination
              </h2>
              <p>
                The OPTIMIX Club portal and all information, services, and events hosted therein are provided on an "as-is" and "as-available" basis without warranty of any kind. 
              </p>
              <p>
                Administrators reserve the right to suspend or terminate user accounts immediately and without prior notice in the event of a breach of these Terms & Conditions.
              </p>
            </section>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-450 dark:text-slate-500">
              For queries or clarifications regarding these terms, please connect with us via the <a href="/contact" className="text-indigo-600 dark:text-indigo-400 hover:underline font-bold">Contact Page</a>.
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
