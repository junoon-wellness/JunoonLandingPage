// Auto-generated from the source .docx legal documents.
// Internal drafting notes ("Legal notice", "LEGAL REVIEW REQUIRED",
// "Sources and references") were stripped; em dashes normalised to " - ".

export type LegalBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "callout"; paras: string[] }
  | { type: "table"; head: string[]; rows: string[][] };

export type LegalDoc = {
  title: string;
  subtitle: string;
  updated: string;
  blocks: LegalBlock[];
};

export const termsOfService: LegalDoc = {
  "title": "Terms of Service",
  "subtitle": "Junoon Wellness, Inc.",
  "updated": "Last updated: June 2, 2026",
  "blocks": [
    {
      "type": "h2",
      "text": "1. Agreement to Terms"
    },
    {
      "type": "p",
      "text": "These Terms of Service (\"Terms\") form a legally binding agreement between you (\"you\" or \"User\") and Junoon Wellness, Inc. (\"Junoon,\" \"we,\" \"us,\" or \"our\") governing your access to and use of the Junoon mobile application (the \"App\") and all related services (collectively, the \"Services\")."
    },
    {
      "type": "p",
      "text": "By downloading, installing, or using the App, you confirm that you have read, understood, and agree to be bound by these Terms and our Privacy Policy, which is incorporated herein by reference. If you do not agree to these Terms, do not download or use the App."
    },
    {
      "type": "p",
      "text": "Apple Acknowledgement: You acknowledge that these Terms are between you and Junoon only, and not with Apple, Inc. (\"Apple\"). Apple is not responsible for the App or its content. Apple has no obligation whatsoever to furnish any maintenance and support services with respect to the App."
    },
    {
      "type": "h2",
      "text": "2. Eligibility"
    },
    {
      "type": "p",
      "text": "You must be at least 13 years of age to use the App. If you are under 18, you represent that a parent or legal guardian has reviewed and agreed to these Terms on your behalf."
    },
    {
      "type": "p",
      "text": "By using the App, you represent and warrant that:"
    },
    {
      "type": "ul",
      "items": [
        "You are at least 13 years of age",
        "You have the legal capacity to enter into a binding agreement",
        "Your use of the App does not violate any applicable law or regulation",
        "You are not located in a country subject to a US government embargo or designated as a \"terrorist supporting\" country",
        "You are not listed on any US government list of prohibited or restricted parties"
      ]
    },
    {
      "type": "p",
      "text": "If you do not meet these requirements, you must not access or use the App."
    },
    {
      "type": "h2",
      "text": "3. Account Registration"
    },
    {
      "type": "h3",
      "text": "3.1 Creating an Account"
    },
    {
      "type": "p",
      "text": "Certain features of the App require you to create an account. You may register using an email address and password, Sign in with Apple, or, where available, Sign in with Google. When creating an account, you agree to provide accurate, current, and complete information and to keep that information updated."
    },
    {
      "type": "h3",
      "text": "3.2 Account Security"
    },
    {
      "type": "p",
      "text": "You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. You agree to:"
    },
    {
      "type": "ul",
      "items": [
        "Choose a strong password and not share it with any third party",
        "Notify us immediately at admin@junoonwellness.com if you become aware of any unauthorised use of your account or any other breach of security",
        "Ensure you log out of your account at the end of each session on shared devices"
      ]
    },
    {
      "type": "p",
      "text": "We are not liable for any loss or damage arising from your failure to comply with these requirements."
    },
    {
      "type": "h3",
      "text": "3.3 Guest Mode"
    },
    {
      "type": "p",
      "text": "You may access limited features of the App without creating an account (\"Guest Mode\"). Guest Mode functionality is provided without guarantee and may be changed or removed at any time. Account-gated features such as saving progress, personalised coaching, and weekly plans require a registered account."
    },
    {
      "type": "h3",
      "text": "3.4 Account Deletion"
    },
    {
      "type": "p",
      "text": "You may delete your account at any time via Settings > Account > Delete Account in the App. See our Privacy Policy (Section 10) for details on data deletion."
    },
    {
      "type": "h2",
      "text": "4. Subscriptions and Billing"
    },
    {
      "type": "h3",
      "text": "4.1 Free and Paid Features"
    },
    {
      "type": "p",
      "text": "The App offers both free features and premium features available through a paid subscription. Free features may be used without charge. Premium subscription features require an active paid subscription."
    },
    {
      "type": "h3",
      "text": "4.2 Subscription Plans"
    },
    {
      "type": "p",
      "text": "Junoon currently offers a Monthly subscription at $15/month. Current pricing is always displayed in the App at the time of purchase."
    },
    {
      "type": "h3",
      "text": "4.3 In-App Purchases via Apple"
    },
    {
      "type": "p",
      "text": "All purchases of premium subscriptions are processed through Apple's App Store using Apple's in-app purchase system (StoreKit). By making a purchase, you also agree to Apple's Media Services Terms and Conditions."
    },
    {
      "type": "p",
      "text": "Important billing terms:"
    },
    {
      "type": "ul",
      "items": [
        "Payment will be charged to your Apple ID account at confirmation of purchase",
        "Subscriptions automatically renew unless auto-renewal is turned off at least 24 hours before the end of the current subscription period",
        "Your Apple ID account will be charged for renewal within 24 hours prior to the end of the current period at the then-current subscription rate",
        "You may manage and cancel your subscription at any time through your Apple ID account settings (iOS Settings > [Your Name] > Subscriptions)",
        "No cancellation of the current subscription is allowed during an active subscription period; you will retain access until the end of that period"
      ]
    },
    {
      "type": "h3",
      "text": "4.4 Free Trials"
    },
    {
      "type": "p",
      "text": "Where a free trial is offered, it begins on the date of subscription and ends at the expiration of the stated trial period. At the end of the free trial, you will automatically be charged the applicable subscription fee unless you cancel before the trial period ends."
    },
    {
      "type": "h3",
      "text": "4.5 Refunds"
    },
    {
      "type": "p",
      "text": "All refunds are processed by Apple in accordance with Apple's refund policy. Junoon does not process refunds directly. To request a refund, visit reportaproblem.apple.com."
    },
    {
      "type": "h3",
      "text": "4.6 Price Changes"
    },
    {
      "type": "p",
      "text": "We reserve the right to change subscription pricing at any time. Price changes will be notified to you in advance through the App and/or via email. Your continued subscription after a price change constitutes acceptance of the new price."
    },
    {
      "type": "h3",
      "text": "4.7 Restore Purchases"
    },
    {
      "type": "p",
      "text": "If you have previously purchased a subscription and need to restore it on a new device, use the \"Restore Purchases\" function in the App. This connects to Apple's App Store and restores any active subscriptions associated with your Apple ID."
    },
    {
      "type": "h2",
      "text": "5. Licences"
    },
    {
      "type": "h3",
      "text": "5.1 Licence Grant to You"
    },
    {
      "type": "p",
      "text": "Subject to your compliance with these Terms, Junoon grants you a limited, non-exclusive, non-transferable, non-sublicensable, revocable licence to download, install, and use the App on any Apple-branded device that you own or control, solely for your personal, non-commercial use, as permitted by the Usage Rules set forth in Apple's Media Services Terms and Conditions."
    },
    {
      "type": "h3",
      "text": "5.2 Restrictions"
    },
    {
      "type": "p",
      "text": "You may not:"
    },
    {
      "type": "ul",
      "items": [
        "Copy, modify, adapt, translate, reverse engineer, disassemble, decompile, or create derivative works based on the App or its content",
        "Remove, alter, or obscure any proprietary notices in the App",
        "Use the App for any commercial purpose or for any public display (commercial or non-commercial)",
        "Transfer, sublicence, or otherwise make the App available to any third party",
        "Use the App in any manner that could damage, disable, overburden, or impair our servers or networks",
        "Attempt to gain unauthorised access to any part of the App or its related systems"
      ]
    },
    {
      "type": "h3",
      "text": "5.3 App Store Terms"
    },
    {
      "type": "p",
      "text": "The licence granted under Section 5.1 is further limited to use on Apple devices owned or controlled by you and as permitted by the Usage Rules set forth in the Apple Media Services Terms and Conditions."
    },
    {
      "type": "h2",
      "text": "6. User Content"
    },
    {
      "type": "h3",
      "text": "6.1 Your Coach Messages"
    },
    {
      "type": "p",
      "text": "You may submit messages, text, and other content through the AI coach interface (\"User Content\"). You retain ownership of User Content you submit. By submitting User Content, you grant Junoon a worldwide, non-exclusive, royalty-free licence to use, store, process, and transmit your User Content solely for the purpose of operating and improving the Services."
    },
    {
      "type": "h3",
      "text": "6.2 Content Standards"
    },
    {
      "type": "p",
      "text": "You agree not to submit User Content that:"
    },
    {
      "type": "ul",
      "items": [
        "Is unlawful, harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable",
        "Infringes any third party's intellectual property rights",
        "Contains personal information of third parties without their consent",
        "Constitutes spam or unsolicited commercial communications",
        "Attempts to elicit harmful, illegal, or dangerous information from the AI coach",
        "Impersonates any person or entity"
      ]
    },
    {
      "type": "h3",
      "text": "6.3 Content Moderation"
    },
    {
      "type": "p",
      "text": "We reserve the right to review, flag, restrict, or remove User Content that violates these Terms. If your use of the coach is flagged for safety concerns, we may restrict your access to the AI coach and notify you through the App. We are not obligated to store, maintain, or return any User Content."
    },
    {
      "type": "h2",
      "text": "7. Health, Wellness, and Medical Disclaimer"
    },
    {
      "type": "h3",
      "text": "7.1 Not Medical Advice"
    },
    {
      "type": "callout",
      "paras": [
        "THE APP AND ALL CONTENT PROVIDED THROUGH IT, INCLUDING AI COACH RESPONSES, WELLNESS PLANS, ARTICLES, AND VIDEOS, ARE FOR GENERAL INFORMATIONAL AND WELLNESS PURPOSES ONLY. THEY DO NOT CONSTITUTE MEDICAL ADVICE, DIAGNOSIS, OR TREATMENT, AND ARE NOT A SUBSTITUTE FOR PROFESSIONAL MEDICAL ADVICE."
      ]
    },
    {
      "type": "p",
      "text": "Always seek the advice of your physician, physical therapist, or other qualified healthcare provider before beginning any exercise programme, making changes to your diet, or if you have questions regarding any medical condition. Never disregard professional medical advice or delay seeking it because of something you have read or received through the App."
    },
    {
      "type": "h3",
      "text": "7.2 AI Coach Limitations"
    },
    {
      "type": "p",
      "text": "The AI coaching feature uses artificial intelligence to generate personalised wellness recommendations. You acknowledge that:"
    },
    {
      "type": "ul",
      "items": [
        "Coach responses are generated by an AI system and may not always be accurate, complete, or appropriate for your specific situation",
        "The AI coach is not a licensed medical professional, therapist, psychologist, dietitian, or personal trainer",
        "Junoon makes no representation that the AI coach's output is equivalent to or a substitute for professional advice from any licensed healthcare provider",
        "The AI coach should not be used in any situation requiring urgent professional attention"
      ]
    },
    {
      "type": "h3",
      "text": "7.3 Physical Activity Risk"
    },
    {
      "type": "p",
      "text": "Physical activity, including yoga and movement exercises, carries inherent risk of injury. By using the App and following workout or movement guidance, you voluntarily assume all risks of injury. You represent that you are in adequate physical condition to participate in the activities the App recommends, or that you have consulted a healthcare professional where appropriate."
    },
    {
      "type": "h3",
      "text": "7.4 Postpartum and Medical Conditions"
    },
    {
      "type": "p",
      "text": "If you are pregnant, postpartum, recovering from surgery, or have a medical condition that may be affected by physical activity, you must consult a qualified healthcare professional before using the App for exercise guidance. You assume full responsibility for ensuring that your use of the App is safe given your individual health circumstances."
    },
    {
      "type": "h2",
      "text": "8. AI-Generated Content"
    },
    {
      "type": "p",
      "text": "You acknowledge and agree that:"
    },
    {
      "type": "ul",
      "items": [
        "Certain content in the App is generated by artificial intelligence",
        "AI-generated content may occasionally be inaccurate, misleading, or outdated",
        "Junoon reviews AI systems to maintain quality but does not guarantee the accuracy or completeness of AI-generated outputs",
        "You should apply your own judgement when acting on any AI-generated recommendation",
        "You must not rely solely on AI-generated content for decisions that could significantly affect your health, safety, or wellbeing"
      ]
    },
    {
      "type": "h2",
      "text": "9. Intellectual Property"
    },
    {
      "type": "h3",
      "text": "9.1 Junoon's Rights"
    },
    {
      "type": "p",
      "text": "The App, its content (excluding User Content), features, functionality, design, logos, trademarks, service marks, and all underlying technology are owned by Junoon or its licensors and are protected by copyright, trademark, patent, and other intellectual property laws. Nothing in these Terms transfers any intellectual property rights to you other than the limited licence in Section 5.1."
    },
    {
      "type": "h3",
      "text": "9.2 Feedback"
    },
    {
      "type": "p",
      "text": "If you submit suggestions, feedback, or ideas about the App (\"Feedback\"), you grant Junoon a perpetual, irrevocable, worldwide, royalty-free licence to use that Feedback for any purpose without compensation or attribution to you."
    },
    {
      "type": "h2",
      "text": "10. Privacy and Health Data"
    },
    {
      "type": "p",
      "text": "Your use of the App is also governed by our Privacy Policy, which is incorporated into these Terms by reference. You consent to the collection and use of your information as described in our Privacy Policy, including the optional use of Apple Health data to personalise your coaching experience."
    },
    {
      "type": "h2",
      "text": "11. Prohibited Uses"
    },
    {
      "type": "p",
      "text": "In addition to the restrictions in Section 5.2, you agree not to:"
    },
    {
      "type": "ul",
      "items": [
        "Use the App to engage in any illegal activity",
        "Probe, scan, or test the vulnerability of the App or our systems",
        "Use automated scripts, bots, or scrapers to access or interact with the App",
        "Interfere with or disrupt the integrity or performance of the App",
        "Attempt to impersonate another user or gain access to another user's account",
        "Use the App in any way that violates these Terms, our Privacy Policy, or Apple's App Store guidelines"
      ]
    },
    {
      "type": "h2",
      "text": "12. Third-Party Services and Content"
    },
    {
      "type": "p",
      "text": "The App integrates with or links to third-party services including Apple HealthKit, Apple's App Store payment systems, and Anthropic's AI infrastructure. These third-party services are governed by their own terms and privacy policies, and Junoon is not responsible for the practices of third-party services."
    },
    {
      "type": "p",
      "text": "Teacher-produced video content and articles available in the App are provided by independent wellness practitioners. Junoon makes reasonable efforts to ensure content quality but does not independently verify all professional credentials of content creators. Content does not constitute endorsement of any specific healthcare approach."
    },
    {
      "type": "h2",
      "text": "13. Disclaimers of Warranties"
    },
    {
      "type": "p",
      "text": "THE APP AND SERVICES ARE PROVIDED \"AS IS\" AND \"AS AVAILABLE\" WITHOUT WARRANTY OF ANY KIND. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, JUNOON AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, PARTNERS, SUPPLIERS, AND LICENSORS EXPRESSLY DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING:"
    },
    {
      "type": "ul",
      "items": [
        "IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT",
        "WARRANTIES THAT THE APP WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS",
        "WARRANTIES REGARDING THE ACCURACY, RELIABILITY, OR COMPLETENESS OF ANY CONTENT, INCLUDING AI-GENERATED CONTENT",
        "WARRANTIES THAT DEFECTS WILL BE CORRECTED"
      ]
    },
    {
      "type": "p",
      "text": "Some jurisdictions do not allow the exclusion of implied warranties, so the above exclusions may not apply to you in full."
    },
    {
      "type": "h2",
      "text": "14. Limitation of Liability"
    },
    {
      "type": "p",
      "text": "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL JUNOON, ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, OR LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO:"
    },
    {
      "type": "ul",
      "items": [
        "PERSONAL INJURY OR BODILY HARM ARISING FROM YOUR USE OF THE APP OR ANY PHYSICAL ACTIVITY UNDERTAKEN IN RELIANCE ON THE APP",
        "LOSS OF DATA, REVENUE, PROFITS, OR GOODWILL",
        "RELIANCE ON AI-GENERATED CONTENT THAT IS INACCURATE OR INAPPROPRIATE FOR YOUR SITUATION",
        "DAMAGE TO DEVICES OR SYSTEMS"
      ]
    },
    {
      "type": "p",
      "text": "IN JURISDICTIONS THAT LIMIT LIABILITY, JUNOON'S TOTAL LIABILITY TO YOU FOR ANY CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR THE APP SHALL NOT EXCEED THE GREATER OF (A) THE AMOUNT YOU PAID TO JUNOON IN THE 12 MONTHS PRECEDING THE CLAIM OR (B) USD $50.00."
    },
    {
      "type": "p",
      "text": "NOTHING IN THESE TERMS LIMITS LIABILITY FOR FRAUD, FRAUDULENT MISREPRESENTATION, DEATH OR PERSONAL INJURY CAUSED BY NEGLIGENCE, OR ANY LIABILITY THAT CANNOT BE LIMITED BY LAW IN YOUR JURISDICTION."
    },
    {
      "type": "p",
      "text": "Apple's Liability: Apple has no warranty obligation whatsoever with respect to the App, and any other claims, losses, liabilities, damages, costs, or expenses attributable to any failure to conform to any warranty are Junoon's responsibility alone."
    },
    {
      "type": "h2",
      "text": "15. Indemnification"
    },
    {
      "type": "p",
      "text": "You agree to defend, indemnify, and hold harmless Junoon and its officers, directors, employees, agents, and licensors from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of or relating to:"
    },
    {
      "type": "ul",
      "items": [
        "Your violation of these Terms",
        "Your User Content",
        "Your use of the App in violation of applicable law",
        "Your negligence or wilful misconduct"
      ]
    },
    {
      "type": "h2",
      "text": "16. Apple-Specific Terms"
    },
    {
      "type": "p",
      "text": "The following terms apply specifically to your use of the App on Apple devices, as required by Apple's App Store guidelines:"
    },
    {
      "type": "p",
      "text": "Product Claims: Junoon, not Apple, is responsible for addressing any claims by you or any third party relating to the App or your possession and/or use of the App, including (i) product liability claims; (ii) any claim that the App fails to conform to any applicable legal or regulatory requirement; and (iii) claims arising under consumer protection, privacy, or similar legislation."
    },
    {
      "type": "p",
      "text": "Intellectual Property: In the event of a third-party claim that the App or your possession and use of the App infringes that third party's intellectual property rights, Junoon, not Apple, will be solely responsible for the investigation, defence, settlement and discharge of any such intellectual property infringement claim."
    },
    {
      "type": "p",
      "text": "Third-Party Beneficiary: You acknowledge and agree that Apple and Apple's subsidiaries are third-party beneficiaries of these Terms, and that, upon your acceptance of these Terms, Apple will have the right (and will be deemed to have accepted the right) to enforce these Terms against you as a third-party beneficiary thereof."
    },
    {
      "type": "h2",
      "text": "17. Termination"
    },
    {
      "type": "h3",
      "text": "17.1 Termination by You"
    },
    {
      "type": "p",
      "text": "You may stop using the App at any time. To close your account, see Section 3.4 and our Privacy Policy (Section 10)."
    },
    {
      "type": "h3",
      "text": "17.2 Termination by Junoon"
    },
    {
      "type": "p",
      "text": "We may suspend or terminate your access to the App at any time, with or without notice, if:"
    },
    {
      "type": "ul",
      "items": [
        "We reasonably believe you have violated these Terms",
        "We are required to do so by law",
        "Continued provision of the App is no longer commercially viable in our reasonable judgement"
      ]
    },
    {
      "type": "p",
      "text": "Upon termination, the licence granted in Section 5.1 will automatically expire."
    },
    {
      "type": "h3",
      "text": "17.3 Effect of Termination"
    },
    {
      "type": "p",
      "text": "Sections 7, 8, 9, 13, 14, 15, 19, 20, and 21 of these Terms shall survive termination. Upon termination of a paid subscription, access to premium features will continue until the end of the paid subscription period, after which access will revert to free features only."
    },
    {
      "type": "h2",
      "text": "18. Changes to These Terms"
    },
    {
      "type": "p",
      "text": "We may modify these Terms at any time. If we make material changes, we will provide at least 14 days' advance notice by posting a notice in the App and, where we have your email address, by sending you an email. Your continued use of the App after the effective date of the revised Terms constitutes your acceptance. If you do not agree to the revised Terms, you must stop using the App."
    },
    {
      "type": "h2",
      "text": "19. Governing Law and Dispute Resolution"
    },
    {
      "type": "p",
      "text": "These Terms are governed by the laws of the State of Delaware, without regard to its conflict of law principles."
    },
    {
      "type": "p",
      "text": "Informal Resolution: Before filing a formal dispute, you agree to attempt to resolve any dispute by contacting us at admin@junoonwellness.com. We will attempt to resolve disputes informally within 30 days."
    },
    {
      "type": "p",
      "text": "Binding Arbitration: If a dispute cannot be resolved informally, you and Junoon agree that any dispute, claim, or controversy arising out of or relating to these Terms, the App, or the Services that is not resolved informally shall be resolved exclusively by final and binding individual arbitration, rather than in court, except as expressly set out in this Section. This agreement to arbitrate is governed by the Federal Arbitration Act (9 U.S.C. § 1 et seq.) and evidences a transaction involving interstate commerce."
    },
    {
      "type": "p",
      "text": "Arbitration Procedure: The arbitration will be administered by the American Arbitration Association (AAA) under its Consumer Arbitration Rules in effect at the time the arbitration is commenced, as modified by these Terms. The AAA Rules are available at adr.org. The arbitration may be conducted, at your election, through the submission of documents, by telephone or video conference, or in person in the county where you reside or at another mutually agreed location. The arbitrator will have exclusive authority to resolve any dispute relating to the interpretation, applicability, enforceability, or formation of this agreement to arbitrate. The arbitrator's award will be final and binding, and judgment on the award may be entered in any court of competent jurisdiction."
    },
    {
      "type": "p",
      "text": "Arbitration Fees: For any arbitration you initiate, you are responsible only for the consumer filing fee specified by the AAA Consumer Arbitration Rules, and Junoon will pay all remaining AAA administrative fees and the arbitrator's fees and expenses. Each party will bear its own attorneys' fees and costs, except where the arbitrator is authorised by applicable law to award them to a prevailing party."
    },
    {
      "type": "p",
      "text": "Your Right to Opt Out of Arbitration: You may opt out of this agreement to arbitrate within 30 days after you first accept these Terms by sending written notice to admin@junoonwellness.com with the subject line \"Arbitration Opt-Out\" and including your name and the email address associated with your account. If you opt out, neither you nor Junoon will be required to arbitrate, and disputes will instead be resolved in the courts identified in the Jurisdiction provision below. Opting out of arbitration has no effect on any other provision of these Terms."
    },
    {
      "type": "p",
      "text": "Small Claims and Individual Basis: Notwithstanding the foregoing, either party may bring an individual claim in a small claims court of competent jurisdiction if the claim qualifies. All arbitrations will proceed on an individual basis only. The arbitrator may award declaratory or injunctive relief only in favor of the individual party seeking relief and only to the extent necessary to provide relief warranted by that party's individual claim."
    },
    {
      "type": "p",
      "text": "Exceptions: Nothing in this Section prevents either party from seeking injunctive or other equitable relief in a court of competent jurisdiction where necessary to prevent irreparable harm."
    },
    {
      "type": "p",
      "text": "Jurisdiction: For any disputes not subject to arbitration, you consent to the exclusive jurisdiction of the courts located in Delaware."
    },
    {
      "type": "h2",
      "text": "20. Class Action Waiver"
    },
    {
      "type": "p",
      "text": "To the maximum extent permitted by applicable law, you and Junoon agree that each party may bring claims against the other only in your or its individual capacity, and not as a plaintiff or class member in any purported class, collective, consolidated, private attorney general, or representative proceeding. The arbitrator may not consolidate or join the claims of more than one person and may not otherwise preside over any form of a representative or class proceeding."
    },
    {
      "type": "p",
      "text": "You and Junoon also waive any right to a trial by jury for any dispute that proceeds in court rather than arbitration, to the extent permitted by law."
    },
    {
      "type": "p",
      "text": "If a court or arbitrator decides that this Class Action Waiver is unenforceable as to a particular claim or request for relief, then that claim or request for relief (and only that claim or request) will be severed and may be brought in a court of competent jurisdiction, while the remainder of this Class Action Waiver and the agreement to arbitrate will remain in full force and effect. Some jurisdictions do not permit class action or representative action waivers in consumer contracts, in which case this Section may not apply to you to the extent prohibited by law."
    },
    {
      "type": "h2",
      "text": "21. General"
    },
    {
      "type": "p",
      "text": "Entire Agreement: These Terms (together with the Privacy Policy) constitute the entire agreement between you and Junoon regarding the App and supersede all prior agreements."
    },
    {
      "type": "p",
      "text": "Severability: If any provision of these Terms is held to be invalid or unenforceable, that provision will be modified to the minimum extent necessary to make it enforceable, and the remaining provisions will remain in full force."
    },
    {
      "type": "p",
      "text": "No Waiver: Junoon's failure to enforce any right or provision of these Terms will not be considered a waiver of those rights."
    },
    {
      "type": "p",
      "text": "Assignment: You may not assign or transfer your rights or obligations under these Terms. Junoon may assign its rights and obligations without restriction."
    },
    {
      "type": "p",
      "text": "No Agency: Nothing in these Terms creates any partnership, joint venture, agency, franchise, or employment relationship between you and Junoon."
    },
    {
      "type": "p",
      "text": "Force Majeure: Junoon will not be liable for any delay or failure to perform resulting from causes outside its reasonable control."
    },
    {
      "type": "p",
      "text": "Notices: Notices to Junoon must be sent to admin@junoonwellness.com. Notices to you will be sent to the email address associated with your account."
    },
    {
      "type": "h2",
      "text": "22. Contact Information"
    },
    {
      "type": "p",
      "text": "For questions about these Terms:"
    },
    {
      "type": "p",
      "text": "Email: admin@junoonwellness.com"
    },
    {
      "type": "p",
      "text": "Mailing address: 611 South Dupont Highway, Suite 102, Dover, Delaware"
    },
    {
      "type": "p",
      "text": "For App Store-related issues or claims: admin@junoonwellness.com"
    }
  ]
};

export const privacyPolicy: LegalDoc = {
  "title": "Privacy Policy",
  "subtitle": "Junoon Wellness, Inc.",
  "updated": "Last updated: June 2, 2026",
  "blocks": [
    {
      "type": "h2",
      "text": "1. Who We Are"
    },
    {
      "type": "p",
      "text": "Junoon Wellness, Inc. (\"Junoon,\" \"we,\" \"us,\" or \"our\") operates the Junoon mobile application (the \"App\") and related services (collectively, the \"Services\"). We are the data controller for personal information collected through the App."
    },
    {
      "type": "p",
      "text": "Contact us at: admin@junoonwellness.com"
    },
    {
      "type": "p",
      "text": "Mailing address: 611 South Dupont Highway, Suite 102, Dover, Delaware"
    },
    {
      "type": "h2",
      "text": "2. Who This Policy Applies To"
    },
    {
      "type": "p",
      "text": "This Privacy Policy applies to all users of the Junoon App, including users who access the App without creating an account (\"Guest Mode\"). By using the App, you agree to the collection and use of information in accordance with this Policy."
    },
    {
      "type": "p",
      "text": "The App is not directed to children under the age of 13 (or 16 in the European Economic Area). If you are under this age, you may not use the App. See Section 14 (Children's Privacy) for details."
    },
    {
      "type": "h2",
      "text": "3. Information We Collect"
    },
    {
      "type": "p",
      "text": "We collect information you provide directly, information generated by your use of the App, and - with your explicit permission - health data from Apple Health."
    },
    {
      "type": "h3",
      "text": "3.1 Information You Provide"
    },
    {
      "type": "p",
      "text": "Account and identity information:"
    },
    {
      "type": "ul",
      "items": [
        "Full name",
        "Email address",
        "Password (stored in hashed form; we never store your plaintext password)",
        "WhatsApp phone number (optional, used for service communications)",
        "Timezone"
      ]
    },
    {
      "type": "p",
      "text": "Wellness profile (collected during onboarding):"
    },
    {
      "type": "ul",
      "items": [
        "Gender",
        "Age band",
        "Height and weight (optional)",
        "Wellness goals and focus areas (habits, movement, mental health)",
        "Stress baseline",
        "Existing yoga or meditation practice level",
        "Dietary restrictions or preferences",
        "Physical considerations or limitations (including postpartum, joint pain, chronic fatigue)",
        "Available time per day for practice",
        "Preferred time of day for practice",
        "30-day personal goal"
      ]
    },
    {
      "type": "p",
      "text": "Coach interactions:"
    },
    {
      "type": "ul",
      "items": [
        "Messages you send to the AI coach",
        "Your responses during weekly check-ins",
        "Your reactions to coach-proposed content (accepted, swapped, removed)"
      ]
    },
    {
      "type": "p",
      "text": "Profile updates:"
    },
    {
      "type": "ul",
      "items": [
        "Changes to your name, timezone, or profile settings at any time"
      ]
    },
    {
      "type": "h3",
      "text": "3.2 Information Generated by Your Use of the App"
    },
    {
      "type": "p",
      "text": "Practice activity:"
    },
    {
      "type": "ul",
      "items": [
        "Videos watched and time spent watching each video",
        "Videos and articles you save or bookmark",
        "Teachers you follow",
        "Weekly plan items you complete, skip, or swap",
        "Progress snapshots across practice pillars"
      ]
    },
    {
      "type": "p",
      "text": "Technical and device information:"
    },
    {
      "type": "ul",
      "items": [
        "Session authentication tokens (stored locally on your device)",
        "App preferences stored locally (saved content, onboarding state)",
        "Standard server logs (IP address, request timestamps, error reports)"
      ]
    },
    {
      "type": "h3",
      "text": "3.3 Health Information from Apple Health (with your permission)"
    },
    {
      "type": "p",
      "text": "If you grant permission, the App reads the following data types from Apple Health to personalise your coaching experience:"
    },
    {
      "type": "ul",
      "items": [
        "Step count - to understand your baseline daily activity",
        "Resting heart rate - to understand cardiovascular recovery",
        "Heart rate variability (HRV) - to understand stress and recovery signals",
        "Exercise time - to understand your existing movement habits",
        "Sleep analysis - to understand your rest and recovery",
        "Mindful session data - to understand your existing mindfulness practice",
        "Workout history - to contextualise your overall fitness activity"
      ]
    },
    {
      "type": "p",
      "text": "The App also writes the following data to Apple Health when you complete a practice session:"
    },
    {
      "type": "ul",
      "items": [
        "Workout records - to log completed Junoon yoga and movement sessions",
        "Mindful session records - to log completed Junoon meditation and breathwork sessions"
      ]
    },
    {
      "type": "callout",
      "paras": [
        "Important: Health data read from Apple Health is used solely to inform and personalise your AI coaching experience within the App. It is transmitted to our servers only in anonymised, aggregated summary form to generate coaching responses. We do not store raw HealthKit records on our servers, do not share your health data with third-party advertisers, and do not use health data for any commercial purpose beyond delivering your coaching service.",
        "Granting or denying health permissions is voluntary. The App functions without health data access; granting access improves the personalisation of your coaching plan."
      ]
    },
    {
      "type": "h2",
      "text": "4. How We Use Your Information"
    },
    {
      "type": "p",
      "text": "We use the information we collect for the following purposes, each of which has a lawful basis under applicable law:"
    },
    {
      "type": "table",
      "head": [
        "Purpose",
        "Lawful basis (GDPR)"
      ],
      "rows": [
        [
          "Creating and managing your account",
          "Performance of contract"
        ],
        [
          "Delivering the AI coaching service, weekly plans, and content recommendations",
          "Performance of contract"
        ],
        [
          "Personalising your practice plan based on your wellness profile and health data",
          "Performance of contract / Legitimate interests"
        ],
        [
          "Processing subscription payments through Apple's App Store",
          "Performance of contract"
        ],
        [
          "Sending service communications (password resets, account notices)",
          "Performance of contract / Legal obligation"
        ],
        [
          "Content moderation and safety (detecting harmful or abusive coach interactions)",
          "Legitimate interests"
        ],
        [
          "Improving the App and fixing bugs",
          "Legitimate interests"
        ],
        [
          "Complying with legal obligations",
          "Legal obligation"
        ],
        [
          "Communicating with you about major policy changes",
          "Legal obligation / Legitimate interests"
        ]
      ]
    },
    {
      "type": "p",
      "text": "We do not currently sell or share your personal information, use it for targeted advertising, or provide it to data brokers. If this ever changes, we will update this Policy and notify you in advance, will never include Apple Health or other health data, and will provide the opt-out or consent choices required by law (including a \"Do Not Sell or Share My Personal Information\" option) before any such use begins."
    },
    {
      "type": "h2",
      "text": "5. Artificial Intelligence and Your Coach Conversations"
    },
    {
      "type": "p",
      "text": "The Junoon coach is powered by a large language model (LLM) provided by Anthropic, PBC. When you send a message to your coach, that message - along with relevant context from your wellness profile and health summary - is transmitted to Anthropic's API to generate a coaching response."
    },
    {
      "type": "p",
      "text": "What this means for you:"
    },
    {
      "type": "ul",
      "items": [
        "Your coach messages are processed by Anthropic's infrastructure in the United States",
        "Anthropic acts as a data processor on our behalf, bound by a data processing agreement",
        "Anthropic's use of data sent via API is governed by their API usage policy, which prohibits using API data to train models without consent",
        "We do not share your name or directly identifying information with Anthropic; messages are associated with an anonymised user identifier",
        "You should not share sensitive personal information (financial details, government ID numbers, passwords) in coach messages"
      ]
    },
    {
      "type": "p",
      "text": "Anthropic's privacy policy is available at: https://www.anthropic.com/privacy"
    },
    {
      "type": "h2",
      "text": "6. How We Share Your Information"
    },
    {
      "type": "p",
      "text": "We share personal information only in the following circumstances:"
    },
    {
      "type": "p",
      "text": "Service providers (data processors): We use Supabase, Inc. as our database and authentication provider. Supabase stores your account data, wellness profile, coach conversation history, and practice activity on our behalf. Supabase acts as a data processor bound by a Data Processing Agreement. For more information: https://supabase.com/privacy"
    },
    {
      "type": "p",
      "text": "Apple, Inc.: If you use Sign in with Apple or make purchases through the App Store, Apple processes your identity and payment information pursuant to Apple's own Privacy Policy."
    },
    {
      "type": "p",
      "text": "Email and waitlist provider (beehiiv): If you join our waitlist or subscribe to updates through our website, we collect your email address and process it using beehiiv, Inc. to manage our waitlist and send newsletters and product updates. beehiiv acts as a data processor on our behalf. You can unsubscribe at any time using the link in any email. For more information: https://www.beehiiv.com/privacy"
    },
    {
      "type": "p",
      "text": "Legal requirements: We may disclose personal information if required to do so by law, court order, or governmental authority, or if we believe in good faith that such disclosure is necessary to protect the rights, property, or safety of Junoon, our users, or the public."
    },
    {
      "type": "p",
      "text": "Business transfers: If Junoon is involved in a merger, acquisition, or sale of assets, your personal information may be transferred as part of that transaction. We will notify you via prominent notice in the App or by email before your personal information is transferred and becomes subject to a different Privacy Policy."
    },
    {
      "type": "p",
      "text": "We do not currently sell your personal information or share it with third parties for their own marketing purposes. If this ever changes, we will update this Policy, notify you in advance, exclude all health data, and offer the opt-out or consent choices required by law before doing so."
    },
    {
      "type": "h2",
      "text": "7. Data Retention"
    },
    {
      "type": "p",
      "text": "We keep personal information only for as long as necessary for the purposes described in this Policy. The actual period depends on the type of information, the purpose for which it was collected, and our legal, security, and operational obligations."
    },
    {
      "type": "ul",
      "items": [
        "Account data, coach conversation history, and practice activity: kept while your account is active, then deleted or anonymised after your account is closed, unless we need to retain it longer to meet legal obligations, resolve disputes, or enforce our agreements.",
        "Health data summaries: kept only as long as needed to generate your coaching responses, and not beyond what is necessary to deliver the Services.",
        "Server logs: kept for a limited period for security and debugging, then deleted or anonymised.",
        "Backups: residual copies in backups are removed on our routine backup-rotation cycle."
      ]
    },
    {
      "type": "p",
      "text": "When you delete your account, we will delete or anonymise your personal information from our active systems without undue delay, subject to legal retention obligations."
    },
    {
      "type": "h2",
      "text": "8. Data Security"
    },
    {
      "type": "p",
      "text": "We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction, including:"
    },
    {
      "type": "ul",
      "items": [
        "All data transmitted between the App and our servers is encrypted using TLS",
        "Passwords are hashed using industry-standard cryptographic methods; we cannot retrieve your plaintext password",
        "Authentication tokens are stored securely on-device",
        "Access to production databases is restricted to authorised personnel only"
      ]
    },
    {
      "type": "p",
      "text": "No method of transmission over the internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee absolute security. In the event of a data breach that affects your personal information, we will notify you in accordance with applicable law."
    },
    {
      "type": "h2",
      "text": "9. Your Rights"
    },
    {
      "type": "p",
      "text": "Depending on where you live, you have certain rights regarding your personal information."
    },
    {
      "type": "h3",
      "text": "9.1 All Users"
    },
    {
      "type": "p",
      "text": "Regardless of where you live, you have the following rights with respect to your personal information, which you can exercise within the App or by contacting us at admin@junoonwellness.com:"
    },
    {
      "type": "ul",
      "items": [
        "Access: Request a copy of the personal information we hold about you, and review your account and wellness profile at any time in the App.",
        "Correction: Update or correct inaccurate or incomplete information, including your name, timezone, and wellness profile, through your account settings or by contacting us.",
        "Deletion: Delete your account and associated personal information at any time via Settings > Account > Delete Account, as described in Section 10.",
        "Withdraw consent: Where processing is based on your consent, withdraw it at any time, for example by revoking Apple Health access in your device settings or turning off push notifications, without affecting the lawfulness of processing before withdrawal.",
        "Object or restrict: Ask us to stop or limit certain processing of your information by contacting us.",
        "Complaint: Raise a concern about how we handle your information by contacting us; you may also have the right to complain to your local data protection or consumer protection authority."
      ]
    },
    {
      "type": "h3",
      "text": "9.2 European Economic Area, United Kingdom, and Switzerland (GDPR)"
    },
    {
      "type": "p",
      "text": "If you are located in the EEA, UK, or Switzerland, you have additional rights under the General Data Protection Regulation (EU) 2016/679 and equivalent UK and Swiss law:"
    },
    {
      "type": "ul",
      "items": [
        "Right of access (Article 15): obtain confirmation of whether we process your personal data and a copy of that data.",
        "Right to rectification (Article 16): have inaccurate personal data corrected and incomplete data completed.",
        "Right to erasure (Article 17): have your personal data deleted in the circumstances provided by law (the \"right to be forgotten\").",
        "Right to restriction of processing (Article 18): have the processing of your personal data restricted in certain circumstances.",
        "Right to data portability (Article 20): receive the personal data you provided to us in a structured, commonly used, machine-readable format and have it transmitted to another controller where technically feasible.",
        "Right to object (Article 21): object to processing carried out on the basis of our legitimate interests.",
        "Rights regarding automated decision-making (Article 22): not be subject to a decision based solely on automated processing that produces legal or similarly significant effects concerning you.",
        "Right to withdraw consent (Article 7(3)): withdraw any consent you have given, at any time.",
        "Right to lodge a complaint (Article 77): lodge a complaint with your local supervisory authority."
      ]
    },
    {
      "type": "p",
      "text": "We rely on a lawful basis for each processing activity as described in Section 4. The legal basis for transferring personal information from the EEA to the United States is Standard Contractual Clauses."
    },
    {
      "type": "h3",
      "text": "9.3 California Residents (CCPA/CPRA)"
    },
    {
      "type": "p",
      "text": "California residents have the following rights under the CCPA as amended by the CPRA:"
    },
    {
      "type": "ul",
      "items": [
        "Right to know and access (Cal. Civ. Code §§ 1798.100, 1798.110, 1798.115): request that we disclose the categories and specific pieces of personal information we have collected about you, the sources, the business or commercial purposes for collecting it, and the categories of third parties with whom we share it.",
        "Right to delete (Cal. Civ. Code § 1798.105): request deletion of personal information we collected from you, subject to certain exceptions.",
        "Right to correct (Cal. Civ. Code § 1798.106): request that we correct inaccurate personal information we maintain about you.",
        "Right to opt out of sale or sharing (Cal. Civ. Code § 1798.120): we do not currently sell or share your personal information for cross-context behavioral advertising. If we begin to, we will provide a \"Do Not Sell or Share My Personal Information\" opt-out and honor your request; you retain this right at all times.",
        "Right to limit use of sensitive personal information (Cal. Civ. Code § 1798.121): direct us to limit the use of your sensitive personal information to what is necessary to provide the Services. We use your health and fitness data only to deliver and personalise your coaching, and not for any other purpose.",
        "Right to non-discrimination (Cal. Civ. Code § 1798.125): we will not discriminate against you for exercising any of your CCPA rights."
      ]
    },
    {
      "type": "p",
      "text": "Categories of personal information collected under CCPA: Identifiers (name, email, phone); personal information (account data, wellness profile); sensitive personal information (health and fitness data with your consent); internet/electronic network activity (app usage data); inferences drawn to create a wellness profile."
    },
    {
      "type": "p",
      "text": "To exercise any of these rights, contact us at admin@junoonwellness.com or use the in-app account tools. Because Junoon operates exclusively online and interacts with you directly through the App, email and our in-app tools are the designated methods for submitting requests; we do not maintain a toll-free telephone number. We will respond within 45 days (extendable by an additional 45 days where necessary)."
    },
    {
      "type": "p",
      "text": "To make a request, we may need to verify your identity. We will not require you to create an account solely to exercise your rights."
    },
    {
      "type": "p",
      "text": "Authorised agents may submit requests on your behalf with proof of authorisation."
    },
    {
      "type": "h2",
      "text": "10. Account Deletion"
    },
    {
      "type": "p",
      "text": "You may request deletion of your Junoon account and associated personal information at any time. To delete your account:"
    },
    {
      "type": "ul",
      "items": [
        "In-app: Settings > Account > Delete Account"
      ]
    },
    {
      "type": "p",
      "text": "We will process deletion requests without undue delay and within the timeframes required by applicable law. Residual copies may persist in backups until they are removed on our routine backup-rotation cycle, and we may retain information required by law (such as transaction records) for the period required by applicable regulation."
    },
    {
      "type": "h2",
      "text": "11. International Data Transfers"
    },
    {
      "type": "p",
      "text": "Junoon is based in the United States. If you access the App from outside the United States, your personal information will be transferred to and processed in the United States, where data protection laws may differ from those in your country."
    },
    {
      "type": "p",
      "text": "For transfers from the EEA, UK, or Switzerland, we rely on Standard Contractual Clauses as the appropriate transfer mechanism."
    },
    {
      "type": "p",
      "text": "By using the App, you acknowledge and agree to the transfer of your information to the United States as described in this Privacy Policy."
    },
    {
      "type": "h2",
      "text": "12. Third-Party Links and Services"
    },
    {
      "type": "p",
      "text": "The App may contain links to third-party websites or services (such as teacher profiles or referenced articles). This Privacy Policy does not apply to those third-party services. We encourage you to review the privacy policies of any third-party services you access through the App."
    },
    {
      "type": "h2",
      "text": "13. Push Notifications"
    },
    {
      "type": "p",
      "text": "If you grant permission, we may send push notifications to your device for reminders, plan updates, and coaching prompts. You may opt out of push notifications at any time in your device's Settings > Notifications > Junoon."
    },
    {
      "type": "h2",
      "text": "14. Children's Privacy"
    },
    {
      "type": "p",
      "text": "The App is not directed to individuals under the age of 13 (or 16 in the EEA). We do not knowingly collect personal information from children under these ages. If you are a parent or guardian and believe your child has provided us with personal information, please contact us at admin@junoonwellness.com and we will delete that information promptly."
    },
    {
      "type": "h2",
      "text": "15. Medical and Health Disclaimer"
    },
    {
      "type": "callout",
      "paras": [
        "Junoon is a wellness and lifestyle application. It is not a medical device, is not intended to diagnose, treat, cure, or prevent any disease or medical condition, and does not constitute medical advice. The AI coaching content is for general informational and wellness purposes only.",
        "The health data we read from Apple Health is used to personalise wellness recommendations - not to make medical assessments. Nothing in the App should be construed as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.",
        "If you have a serious medical condition, physical limitation, or are pregnant or postpartum, consult a qualified healthcare professional before beginning any exercise or wellness programme."
      ]
    },
    {
      "type": "h2",
      "text": "16. Changes to This Privacy Policy"
    },
    {
      "type": "p",
      "text": "We may update this Privacy Policy from time to time. If we make material changes, we will notify you by posting a prominent notice in the App and, where required by law, by sending you an email notification at least 7 days before the changes take effect. The \"Last updated\" date at the top of this Policy reflects the most recent revision. Your continued use of the App after the effective date of a revised Policy constitutes your acceptance of the changes."
    },
    {
      "type": "h2",
      "text": "17. Contact Us"
    },
    {
      "type": "p",
      "text": "For privacy-related questions, requests, or complaints:"
    },
    {
      "type": "p",
      "text": "Email: admin@junoonwellness.com"
    },
    {
      "type": "p",
      "text": "Mailing address: 611 South Dupont Highway, Suite 102, Dover, Delaware"
    },
    {
      "type": "p",
      "text": "We will respond to all privacy-related inquiries within 30 days."
    }
  ]
};
