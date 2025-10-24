import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors mb-6 cursor-pointer"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-500 mb-10">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="space-y-6 text-sm leading-relaxed">
          <p>
            Mind Map Generator (“we”, “our”, or “us”) provides tools that help
            you create AI-generated mind maps based on your text inputs. This
            Privacy Policy explains how we collect, use, and protect your data
            when you use our website.
          </p>

          <h2 className="text-xl font-semibold mt-8">1. Data We Collect</h2>
          <p>
            We collect limited data necessary to provide our service:
            <ul className="list-disc ml-6 mt-2">
              <li>
                <strong>Account information</strong> — such as your name, email
                address, and login credentials.
              </li>
              <li>
                <strong>Mind map inputs</strong> — text or documents you provide
                to generate mind maps.
              </li>
              <li>
                <strong>Usage data</strong> — anonymous analytics such as page
                views and feature interactions to improve performance.
              </li>
            </ul>
          </p>

          <h2 className="text-xl font-semibold mt-8">2. How We Use Data</h2>
          <p>
            - To generate, store, and visualize mind maps you create. <br />
            - To improve our algorithms and user experience. <br />
            - To communicate service updates or security notifications. <br />
            - We <strong>do not</strong> sell or share your data with third
            parties for advertising purposes.
          </p>

          <h2 className="text-xl font-semibold mt-8">
            3. Data Storage & Retention
          </h2>
          <p>
            Your mind maps are securely stored in our database and linked to
            your account. You can delete your data at any time by contacting us
            or deleting your account.
          </p>

          <h2 className="text-xl font-semibold mt-8">4. Third-Party Services</h2>
          <p>
            We may use cloud hosting, analytics, or AI APIs to process and store
            data. Each provider complies with industry-standard security
            practices (e.g., Google Cloud, Vercel, OpenAI).
          </p>

          <h2 className="text-xl font-semibold mt-8">5. Security</h2>
          <p>
            We use encryption (HTTPS/TLS) and authentication controls to
            safeguard your information. However, no online service can guarantee
            100% security.
          </p>

          <h2 className="text-xl font-semibold mt-8">6. Your Rights</h2>
          <p>
            You can request to access, modify, or delete your personal data at
            any time by emailing us at 
            <a
              href="mailto:contact@mindmapgenerator.ai"
              className="text-blue-600 underline"
            >
              contact@mindmapgenerator.ai
            </a>.
          </p>

          <h2 className="text-xl font-semibold mt-8">7. Updates</h2>
          <p>
            We may update this Privacy Policy periodically. Continued use of the
            service after changes means you accept the revised terms.
          </p>

          <p className="mt-8">
            If you have questions, contact us at 
            <a
              href="mailto:contact@mindmapgenerator.ai"
              className="text-blue-600 underline"
            >
              contact@mindmapgenerator.ai
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
