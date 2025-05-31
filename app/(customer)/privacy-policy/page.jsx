import SectionTitle from "@/components/shared/SectionTitle";
import React from "react";

const PrivacyAndPolicy = () => {
  return (
    <div className="py-4 px-2 flex flex-col gap-4">
      <SectionTitle title="Privacy & Policy" />
      <div className="text-gray-800">
        <div className="space-y-4">
          <p>
            <span className="font-semibold">Website:</span>{" "}
            <a
              href="https://www.bdhalalbazar.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 underline"
            >
              https://www.bdhalalbazar.com
            </a>
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-900">
            App Information
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>App Name:</strong> HalalBazar: Grocery shop
            </li>
            <li>
              <strong>App Package Name:</strong> com.bdhalalbazar.doo
            </li>
            <li>
              <strong>Developer Console Name:</strong> Tanvir Ahmmed
            </li>
            <li>
              <strong>App Development Company:</strong> Digital Opera Ocean
            </li>
          </ul>

          <hr className="my-6 border-gray-300" />

          <h2 className="text-2xl font-semibold text-gray-900">
            Data Deletion Policy
          </h2>
          <p>
            We respect your right to control your personal data. If you wish to
            have your data deleted from our systems, you may contact us at:
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:pay2tanjil@gmail.com"
              className="text-teal-600 underline"
            >
              pay2tanjil@gmail.com
            </a>
          </p>
          <p>Upon receiving your request, we will:</p>
          <ol className="list-decimal list-inside space-y-1 ml-4">
            <li>Verify your identity to ensure the request is legitimate.</li>
            <li>
              Delete all personal data associated with your account, including
              but not limited to account information, comments, and saved
              preferences.
            </li>
            <li>Complete the deletion process within 7 business days.</li>
          </ol>
          <p>
            <strong>Please note:</strong> Some data may be retained as required
            by law or for legitimate security and operational purposes.
          </p>

          <hr className="my-6 border-gray-300" />

          <h2 className="text-2xl font-semibold text-gray-900">
            Terms & Policy
          </h2>

          <h3 className="text-xl font-semibold mt-4">1. Acceptance of Terms</h3>
          <p>
            By accessing and using the HalalBazar app or website, you agree to
            be bound by these Terms and Policies. If you do not agree, please do
            not use our services.
          </p>

          <h3 className="text-xl font-semibold mt-4">
            2. Product Availability
          </h3>
          <p>
            All products listed are subject to availability. We reserve the
            right to cancel or modify orders based on stock levels or other
            constraints.
          </p>

          <h3 className="text-xl font-semibold mt-4">3. Pricing & Payment</h3>
          <p>
            Prices are subject to change without notice. Payment must be
            completed via the available payment options before order dispatch.
          </p>

          <h3 className="text-xl font-semibold mt-4">4. Delivery Policy</h3>
          <p>
            Orders are delivered to the address provided by the user. Delivery
            timelines may vary based on location, availability, and external
            factors.
          </p>

          <h3 className="text-xl font-semibold mt-4">
            5. Return & Refund Policy
          </h3>
          <p>
            Returns are only accepted{" "}
            <strong>in the presence of the deliveryman</strong> at the time of
            delivery. Once the delivery is completed and the deliveryman has
            left, returns will no longer be accepted. Please inspect your items
            before accepting the order.
          </p>

          <h3 className="text-xl font-semibold mt-4">
            6. Account Responsibilities
          </h3>
          <p>
            Users are responsible for maintaining the confidentiality of their
            login credentials. Any activity under your account is your
            responsibility.
          </p>

          <h3 className="text-xl font-semibold mt-4">7. Prohibited Conduct</h3>
          <p>
            Users must not misuse the service, engage in fraudulent
            transactions, or attempt to interfere with the apps functionality.
          </p>

          <h3 className="text-xl font-semibold mt-4">
            8. Limitation of Liability
          </h3>
          <p>
            HalalBazar is not liable for any indirect, incidental, or
            consequential damages resulting from the use or inability to use the
            app or services.
          </p>

          <h3 className="text-xl font-semibold mt-4">9. Changes to Terms</h3>
          <p>
            We reserve the right to update these terms at any time. Continued
            use of the service after changes indicates acceptance of the new
            terms.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyAndPolicy;
