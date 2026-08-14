import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function AboutUs() {
  return (
    <main className="bg-white">
      <Navbar />

      {/* PAGE HEADER */}
      <section className="bg-black px-6 py-16 text-center text-white">
        <p className="text-sm text-gray-400">
          Connecting talent with opportunity
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          About MeriJob
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-400">
          A modern career platform designed to make discovering and
          managing job opportunities simpler, smarter and more accessible.
        </p>
      </section>

      {/* ABOUT MERIJOB */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">

          <div className="grid gap-10 md:grid-cols-2 md:items-center">

            <div>
              <p className="text-sm font-medium text-[#309689]">
                Who We Are
              </p>

              <h2 className="mt-3 text-3xl font-bold leading-tight text-gray-900">
                Building a simpler way to discover better career opportunities.
              </h2>
            </div>

            <div>
              <p className="text-sm leading-7 text-gray-500">
                MeriJob is a modern job discovery and career platform
                created to simplify the way candidates find, explore and
                manage employment opportunities.
              </p>

              <p className="mt-4 text-sm leading-7 text-gray-500">
                From discovering relevant jobs to saving opportunities,
                applying for positions and tracking applications, MeriJob
                brings essential parts of the job search journey together
                in one convenient platform.
              </p>

              <p className="mt-4 text-sm leading-7 text-gray-500">
                We believe that searching for the right opportunity should
                be straightforward, organized and focused on what matters
                most — helping people move forward in their careers.
              </p>
            </div>

          </div>

          {/* BRAND VISUAL */}
          <div className="mt-12 flex h-[300px] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 via-gray-800 to-black">
            <div className="text-center text-white">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-[#309689] text-3xl">
                💼
              </div>

              <h3 className="mt-5 text-2xl font-bold">
                MeriJob
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                Discover opportunities. Build your future.
              </p>

            </div>
          </div>

        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="bg-[#f8faf9] px-6 py-20">
        <div className="mx-auto max-w-6xl">

          <div className="mb-12 text-center">
            <p className="text-sm font-medium text-[#309689]">
              What Drives Us
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              Our Mission & Vision
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">

            {/* Mission */}
            <div className="rounded-xl bg-white p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#ebf5f4] text-xl">
                🎯
              </div>

              <h3 className="mt-6 text-xl font-bold text-gray-900">
                Our Mission
              </h3>

              <p className="mt-4 text-sm leading-7 text-gray-500">
                Our mission is to make the job search process simpler,
                more transparent and accessible by connecting job seekers
                with relevant career opportunities through an intuitive
                digital platform.
              </p>

              <p className="mt-4 text-sm leading-7 text-gray-500">
                We aim to reduce the complexity of job searching and help
                candidates make better-informed decisions about their
                career opportunities.
              </p>
            </div>

            {/* Vision */}
            <div className="rounded-xl bg-white p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#ebf5f4] text-xl">
                🚀
              </div>

              <h3 className="mt-6 text-xl font-bold text-gray-900">
                Our Vision
              </h3>

              <p className="mt-4 text-sm leading-7 text-gray-500">
                Our vision is to create a trusted career platform where
                talent and opportunity can come together efficiently,
                regardless of where a candidate is in their professional
                journey.
              </p>

              <p className="mt-4 text-sm leading-7 text-gray-500">
                We aspire to continuously improve the way people discover
                opportunities and build meaningful careers through
                technology.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">

          <div className="mb-10 text-center">
            <p className="text-sm font-medium text-[#309689]">
              The MeriJob Experience
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              How MeriJob Works
            </h2>

            <p className="mt-2 text-xs text-gray-500">
              Everything you need to organize your job search.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-4">

            {[
              [
                "01",
                "Create Account",
                "Create your account and securely access your MeriJob profile."
              ],
              [
                "02",
                "Discover Jobs",
                "Explore available opportunities and find jobs matching your interests."
              ],
              [
                "03",
                "Save & Apply",
                "Save interesting opportunities or apply to jobs directly."
              ],
              [
                "04",
                "Track Progress",
                "Keep track of your applications and manage your job search."
              ],
            ].map(([number, title, text]) => (
              <div
                key={number}
                className="rounded-lg border border-gray-100 p-6 text-center"
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

      {/* WHY MERIJOB */}
      <section className="bg-[#f8faf9] px-6 py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">

          <div>
            <p className="text-sm font-medium text-[#309689]">
              Why MeriJob
            </p>

            <h2 className="mt-3 text-3xl font-bold leading-tight text-gray-900">
              Designed around the needs of modern job seekers.
            </h2>

            <p className="mt-5 text-sm leading-7 text-gray-500">
              Job searching can become overwhelming when opportunities,
              applications and important information are spread across
              different platforms. MeriJob aims to bring these essential
              activities together through one simple experience.
            </p>

            <p className="mt-4 text-sm leading-7 text-gray-500">
              Our platform focuses on simplicity, organization and
              accessibility so candidates can spend more time exploring
              opportunities and less time managing the process.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">

            {[
              [
                "Simple Discovery",
                "Find and explore opportunities through an easy-to-use interface."
              ],
              [
                "Organized Search",
                "Save interesting jobs and keep your opportunities organized."
              ],
              [
                "Application Tracking",
                "Keep track of the jobs you have applied for."
              ],
              [
                "Candidate Focused",
                "A clean experience designed around the job seeker's journey."
              ],
            ].map(([title, text]) => (
              <div
                key={title}
                className="rounded-lg border border-gray-100 bg-white p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#ebf5f4] text-[#309689]">
                  ✓
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

      {/* OUR VALUES */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">

          <div className="mb-10 text-center">
            <p className="text-sm font-medium text-[#309689]">
              Our Principles
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              Our Values
            </h2>

            <p className="mt-2 text-xs text-gray-500">
              The principles that shape the MeriJob experience.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">

            {[
              [
                "Accessibility",
                "We believe career opportunities should be easier to discover and access."
              ],
              [
                "Simplicity",
                "We focus on clear experiences that reduce unnecessary complexity."
              ],
              [
                "Continuous Improvement",
                "We continuously work towards making the career discovery experience better."
              ],
            ].map(([title, text]) => (
              <div
                key={title}
                className="rounded-xl border border-gray-100 p-7 text-center"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#ebf5f4] text-[#309689]">
                  ✓
                </div>

                <h3 className="mt-5 text-base font-semibold text-gray-900">
                  {title}
                </h3>

                <p className="mt-3 text-xs leading-6 text-gray-500">
                  {text}
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* PLATFORM FEATURES */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">

          <div className="mb-10 text-center">
            <p className="text-sm font-medium text-[#309689]">
              Platform
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              What You Can Do With MeriJob
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">

            {[
              "Discover Jobs",
              "View Job Details",
              "Save Jobs",
              "Apply for Jobs",
              "Track Applications",
              "Manage Your Dashboard",
              "Secure Authentication",
              "Responsive Experience",
            ].map((feature) => (
              <div
                key={feature}
                className="rounded-lg border border-gray-100 bg-white px-5 py-5 text-center"
              >
                <span className="text-sm font-medium text-gray-700">
                  {feature}
                </span>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* FOUNDER / LEADERSHIP */}
      <section className="bg-black px-6 py-20 text-white">
        <div className="mx-auto max-w-6xl">

          <div className="grid gap-10 md:grid-cols-2 md:items-center">

            <div className="flex min-h-[280px] items-center justify-center rounded-xl bg-gradient-to-br from-gray-800 to-gray-900">
              <div className="text-center">

                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#309689] text-2xl font-bold">
                  KG
                </div>

                <h3 className="mt-5 text-xl font-bold">
                  Krishna Garg
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                  Founder & Developer
                </p>

              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-[#309689]">
                Leadership
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                Building technology with a purpose.
              </h2>

              <p className="mt-5 text-sm leading-7 text-gray-400">
                MeriJob is founded and developed by Krishna Garg, a
                Full Stack Developer focused on creating practical
                technology solutions and digital products.
              </p>

              <p className="mt-4 text-sm leading-7 text-gray-400">
                With a focus on modern web technologies and user-centric
                product development, MeriJob represents a vision of using
                technology to make career opportunities easier to discover
                and manage.
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20">
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
              "What is the vision behind MeriJob?",
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

      {/* FUTURE */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">

          <div className="rounded-xl bg-[#ebf5f4] px-8 py-14 text-center">

            <p className="text-sm font-medium text-[#309689]">
              Looking Ahead
            </p>

            <h2 className="mt-3 text-2xl font-bold text-gray-900">
              Building the future of career discovery.
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-gray-500">
              MeriJob is being built with a long-term vision of creating
              a more connected and efficient career ecosystem. As the
              platform grows, we aim to introduce new capabilities that
              make discovering opportunities and managing career journeys
              even more useful for candidates.
            </p>

          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}

export default AboutUs;