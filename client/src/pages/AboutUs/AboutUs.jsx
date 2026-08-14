import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function AboutUs() {
  return (
    <main className="bg-white">
      <Navbar />

      {/* PAGE HEADER */}
      <section className="bg-black px-6 py-14 text-center text-white">
        <p className="text-sm text-gray-400">
          Learn more about MeriJob
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          About MeriJob
        </h1>
      </section>

      {/* INTRO */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">

          <div className="grid gap-10 md:grid-cols-2 md:items-center">

            <div>
              <p className="text-sm font-medium text-[#309689]">
                About the Platform
              </p>

              <h2 className="mt-3 text-3xl font-bold leading-tight text-gray-900">
                Making the job search simple, organized and accessible.
              </h2>
            </div>

            <div>
              <p className="text-sm leading-7 text-gray-500">
                MeriJob is a full-stack job portal designed to help
                job seekers discover relevant opportunities and manage
                their job search from one place.
              </p>

              <p className="mt-4 text-sm leading-7 text-gray-500">
                Users can explore jobs, view detailed job information,
                save interesting opportunities, apply for jobs and keep
                track of their applications through a personal dashboard.
              </p>
            </div>

          </div>

          {/* PROJECT IMAGE / VISUAL */}
          <div className="mt-10 flex h-[320px] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-gray-800 via-gray-700 to-black">
            <div className="text-center text-white">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-[#309689] text-3xl">
                💼
              </div>

              <h3 className="mt-5 text-2xl font-bold">
                MeriJob
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                Find opportunities. Build your career.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ABOUT THE DEVELOPER */}
      <section className="bg-[#f8faf9] px-6 py-20">
        <div className="mx-auto max-w-6xl">

          <div className="grid gap-10 md:grid-cols-2 md:items-center">

            {/* Developer Card */}
            <div className="flex min-h-[320px] items-center justify-center rounded-xl bg-gradient-to-br from-gray-800 via-gray-700 to-black p-8">
              <div className="text-center text-white">

                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#309689] text-3xl font-bold">
                  KG
                </div>

                <h3 className="mt-5 text-2xl font-bold">
                  Krishna Garg
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                  Full Stack Developer
                </p>

              </div>
            </div>

            {/* Developer Information */}
            <div>
              <p className="text-sm font-medium text-[#309689]">
                About the Developer
              </p>

              <h2 className="mt-3 text-3xl font-bold text-gray-900">
                Built by a developer who loves building practical
                applications.
              </h2>

              <p className="mt-5 text-sm leading-7 text-gray-500">
                Hi, I'm Krishna Garg, a Full Stack Developer and MCA
                student with an interest in building modern and
                practical web applications.
              </p>

              <p className="mt-4 text-sm leading-7 text-gray-500">
                MeriJob is one of my personal full-stack projects,
                created to bring together frontend development,
                backend API development, authentication, database
                management and production deployment in a single
                application.
              </p>

              <p className="mt-4 text-sm leading-7 text-gray-500">
                The project also represents my approach to learning:
                building real applications, solving practical problems
                and continuously improving the user experience and
                technical implementation.
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* TECHNOLOGY STACK */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">

          <div className="mb-10 text-center">
            <p className="text-sm font-medium text-[#309689]">
              Technology
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              Built with modern web technologies
            </h2>

            <p className="mx-auto mt-2 max-w-2xl text-xs leading-5 text-gray-500">
              MeriJob uses a full-stack architecture to provide a
              responsive frontend, secure backend APIs and persistent
              database storage.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4">

            {[
              [
                "01",
                "React + Vite",
                "Used to build the responsive frontend and user interface."
              ],
              [
                "02",
                "Node.js + Express",
                "Powers the backend server and REST API endpoints."
              ],
              [
                "03",
                "MongoDB",
                "Stores users, jobs, applications and saved jobs."
              ],
              [
                "04",
                "JWT Authentication",
                "Provides token-based authentication for protected features."
              ],
            ].map(([number, title, text]) => (
              <div
                key={number}
                className="rounded-lg border border-gray-100 p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ebf5f4] text-sm font-semibold text-[#309689]">
                  {number}
                </div>

                <h3 className="mt-5 text-sm font-semibold text-gray-900">
                  {title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-gray-500">
                  {text}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-[#f8faf9] px-6 py-20">
        <div className="mx-auto max-w-6xl">

          <div className="mb-10 text-center">
            <p className="text-sm font-medium text-[#309689]">
              User Journey
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              How MeriJob works
            </h2>

            <p className="mt-2 text-xs text-gray-500">
              A simple workflow for managing your job search.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-4">

            {[
              [
                "01",
                "Create Account",
                "Register for a MeriJob account and securely access your profile."
              ],
              [
                "02",
                "Explore Jobs",
                "Browse available opportunities and view detailed job information."
              ],
              [
                "03",
                "Save or Apply",
                "Save interesting jobs for later or apply to opportunities directly."
              ],
              [
                "04",
                "Track Applications",
                "View and manage your submitted applications from your dashboard."
              ],
            ].map(([number, title, text]) => (
              <div
                key={number}
                className="rounded-lg border border-gray-100 bg-white p-6 text-center"
              >
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#ebf5f4] text-sm font-semibold text-[#309689]">
                  {number}
                </div>

                <h3 className="mt-5 text-sm font-semibold text-gray-900">
                  {title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-gray-500">
                  {text}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* PROJECT VISION */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">

          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-800 via-gray-700 to-black px-8 py-16 text-center text-white">

            <div className="absolute inset-0 bg-black/20" />

            <div className="relative mx-auto max-w-3xl">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#309689] text-2xl">
                💼
              </div>

              <h2 className="mt-6 text-2xl font-bold md:text-3xl">
                Built as a real-world full-stack project
              </h2>

              <p className="mt-5 text-sm leading-7 text-gray-300">
                MeriJob was built to go beyond a basic frontend project.
                The application brings together authentication, REST APIs,
                database operations, job discovery, saved jobs, application
                tracking and cloud deployment into one complete product.
              </p>

            </div>
          </div>

        </div>
      </section>

      {/* PROJECT FEATURES */}
      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">

          <div>
            <p className="text-sm font-medium text-[#309689]">
              What MeriJob provides
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              Everything you need to manage your job search
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-500">
              The platform focuses on keeping the job discovery and
              application process simple while providing useful tools
              for managing opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            {[
              "Job Discovery",
              "Detailed Job Information",
              "User Authentication",
              "Saved Jobs",
              "Job Applications",
              "Application Tracking",
              "Personal Dashboard",
              "Responsive Interface",
            ].map((feature) => (
              <div
                key={feature}
                className="rounded-lg border border-gray-100 bg-white px-5 py-4 text-sm text-gray-700"
              >
                <span className="mr-2 font-semibold text-[#309689]">
                  ✓
                </span>

                {feature}
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">

          <div className="mb-10 text-center">
            <p className="text-sm font-medium text-[#309689]">
              FAQ
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>

            <p className="mt-2 text-xs text-gray-500">
              Some common questions about MeriJob.
            </p>
          </div>

          <div className="space-y-2">

            {[
              "What is MeriJob?",
              "Can I save jobs for later?",
              "Can I track the jobs I have applied for?",
              "Do I need an account to use MeriJob?",
              "What technologies were used to build MeriJob?",
            ].map((question, index) => (
              <div
                key={question}
                className={`flex items-center justify-between border-b border-gray-200 px-4 py-5 ${
                  index === 0 ? "rounded-lg bg-[#ebf5f4]" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs text-[#309689]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="text-sm text-gray-700">
                    {question}
                  </span>
                </div>

                <span className="text-lg text-[#309689]">
                  +
                </span>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* PROJECT GOAL */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">

          <div className="rounded-xl bg-[#ebf5f4] px-8 py-12 text-center">

            <h2 className="text-2xl font-bold text-gray-900">
              The goal behind MeriJob
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-gray-500">
              The goal of MeriJob is to create a practical and easy-to-use
              job portal while demonstrating the complete lifecycle of a
              modern full-stack web application — from designing the
              interface and building APIs to managing data, authentication
              and deploying the application to production.
            </p>

          </div>

        </div>
      </section>

      {/* BLOG / CAREER RESOURCES */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">

          <div className="mb-10 text-center">
            <p className="text-sm font-medium text-[#309689]">
              Career Resources
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              Helpful Job Search Tips
            </h2>

            <p className="mt-2 text-xs text-gray-500">
              Practical ideas to improve your job search and career journey.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">

            {[
              [
                "How to Build a Strong Resume for Your Next Opportunity",
                "A good resume should clearly present your skills, experience and projects in a way that is easy for recruiters to understand."
              ],
              [
                "How to Prepare for a Successful Job Interview",
                "Research the company, understand the role, prepare relevant examples and communicate your skills with confidence."
              ],
            ].map(([title, text]) => (
              <article
                key={title}
                className="rounded-lg border border-gray-100 p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#ebf5f4] text-xl">
                  💼
                </div>

                <h3 className="mt-5 text-base font-semibold text-gray-900">
                  {title}
                </h3>

                <p className="mt-3 text-xs leading-6 text-gray-500">
                  {text}
                </p>
              </article>
            ))}

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default AboutUs;