import React, { useState } from 'react';

const faqs = [
  {
    q: "What is Optimix Club?",
    a: "Optimix Club is the official technical and innovation club of Rajkiya Engineering College, Azamgarh. We foster creativity, leadership, and technical excellence among students through events, workshops, and collaborative projects."
  },
  {
    q: "How do I join the club?",
    a: "You can join by registering on this website. Click on 'Login / Sign Up' in the navbar, create your account, and you're automatically part of our community. Membership is open to all students of the college."
  },
  {
    q: "Who can register for events?",
    a: "Any registered user (student) can browse and register for events. Simply log in, navigate to the Events section, and click on the event you want to join. Admins can approve or manage registrations."
  },
  {
    q: "How do I register for an event?",
    a: "After logging in, go to the Events section on the home page or your dashboard. Each event has a 'Register' button. Click it to fill out the registration form. You'll receive a status update (pending / approved) on your dashboard."
  },
  {
    q: "What types of events does the club organize?",
    a: "We organize a wide range of events including hackathons, coding contests, tech talks, workshops on emerging technologies, quizzes, cultural activities, and inter-college competitions."
  },
  {
    q: "Can I submit a testimonial about my experience?",
    a: "Yes! After logging in, navigate to your User Dashboard and find the 'Submit Testimonial' section. Your testimonial will be reviewed by an admin before appearing on the home page."
  },
  {
    q: "How do I contact the club?",
    a: "You can reach us through the Contact page accessible from the navbar. Fill in the contact form and our team will get back to you promptly. You can also reach us via our social media channels linked in the footer."
  },
  {
    q: "What are the different user roles on the platform?",
    a: "There are three roles: User (regular student members), Admin (can create/manage events, notices, and approve registrations), and Superadmin (has full platform control including user management). Roles are assigned by the platform administrators."
  },
  {
    q: "Is club membership free?",
    a: "Yes, joining the Optimix Club and accessing the platform is completely free for all students of Rajkiya Engineering College, Azamgarh. Specific events may have their own participation criteria."
  },
  {
    q: "How do I view or update my profile?",
    a: "After logging in, click on your profile avatar in the top-right corner of the navbar or visit your Dashboard. Your profile card shows your name, email, and role. Admins can update user profiles and pictures from the admin panel."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  const visibleFaqs = showAll ? faqs : faqs.slice(0, 5);

  return (
    <section
      id="faq"
      className="relative overflow-hidden py-24 px-6 border-b border-amber-100/50 dark:border-slate-900/60 transition-colors duration-300"
      style={{ backgroundColor: 'var(--bg-cream-warm)' }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/30 transition-colors duration-300 pointer-events-none" />

      {/* Math decoration layer */}
      <div className="absolute inset-0 pointer-events-none select-none z-0" aria-hidden="true">
        <div className="absolute inset-0 math-lines" />
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <line x1="0%" y1="60%" x2="20%" y2="0%" stroke="rgba(99,102,241,0.12)" strokeWidth="0.9" />
          <line x1="100%" y1="60%" x2="78%" y2="0%" stroke="rgba(99,102,241,0.12)" strokeWidth="0.9" />
          <line x1="40%" y1="100%" x2="90%" y2="5%" stroke="rgba(99,102,241,0.07)" strokeWidth="0.5" />
        </svg>
        <span className="absolute top-8 left-[4%] text-[110px] font-serif font-bold text-amber-900/[0.07] dark:text-white/[0.03] -rotate-12 leading-none">?</span>
        <span className="absolute top-[12%] right-[5%] text-[80px] font-serif text-amber-800/[0.06] dark:text-white/[0.028] rotate-6 leading-none">∴</span>
        <span className="absolute bottom-[18%] left-[6%] text-[60px] font-mono text-amber-800/[0.06] dark:text-white/[0.025] rotate-3 leading-none">Q&A</span>
        <span className="absolute bottom-[8%] right-[10%] text-[90px] font-serif text-indigo-700/[0.07] dark:text-indigo-300/[0.045] -rotate-12 leading-none">∵</span>
        <span className="absolute top-[40%] right-[2%] text-[65px] font-serif text-amber-700/[0.055] dark:text-white/[0.022] rotate-6 leading-none">≡</span>
        <span className="absolute top-[60%] left-[2%] text-[50px] font-mono text-amber-700/[0.05] dark:text-white/[0.02] -rotate-6 leading-none">∞</span>
      </div>

      {/* Glow blobs */}
      <div className="absolute -top-36 -right-36 w-[480px] h-[480px] rounded-full glow-blob-indigo blur-[110px] pointer-events-none z-0" aria-hidden="true" />
      <div className="absolute -bottom-36 -left-36 w-[400px] h-[400px] rounded-full glow-blob-amber blur-[95px] pointer-events-none z-0" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-1.5 bg-amber-100/70 dark:bg-indigo-950/40 text-amber-700 dark:text-indigo-400 border border-amber-200/60 dark:border-indigo-900/30 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest">
            Help Center
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-slate-100 tracking-tight mt-3">
            ❓ Frequently Asked Questions
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-3 max-w-xl mx-auto">
            Everything you need to know about Optimix Club.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {visibleFaqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-indigo-300/60 dark:border-indigo-700/50 shadow-lg shadow-indigo-100/40 dark:shadow-indigo-950/30 bg-white dark:bg-slate-900/90'
                    : 'border-amber-200/60 dark:border-slate-800/70 bg-white/70 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-900/80 hover:shadow-md'
                }`}
              >
                {/* Question button */}
                <button
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  id={`faq-btn-${i}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300 ${
                      isOpen
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
                        : 'bg-amber-100 dark:bg-slate-800 text-amber-700 dark:text-indigo-400'
                    }`}>
                      {i + 1}
                    </span>
                    <span className={`font-bold text-base transition-colors duration-200 ${
                      isOpen
                        ? 'text-indigo-700 dark:text-indigo-300'
                        : 'text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
                    }`}>
                      {faq.q}
                    </span>
                  </div>
                  {/* Plus/Minus icon */}
                  <span className={`flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full transition-all duration-300 ${
                    isOpen
                      ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rotate-45'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30 group-hover:text-indigo-500'
                  }`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </button>

                {/* Answer */}
                <div
                  className={`faq-answer ${isOpen ? 'open' : ''}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                >
                  <div className="px-6 pb-5">
                    <div className="pl-10 border-l-2 border-indigo-200 dark:border-indigo-800/60">
                      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* See More Toggle Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-400 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-450 text-sm font-bold rounded-xl transition-all shadow-sm hover:shadow-md"
          >
            {showAll ? "See Less FAQs 🔼" : "See More FAQs 🔽"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
