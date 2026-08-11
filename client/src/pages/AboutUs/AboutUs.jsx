import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function AboutUs() {
  return (
    <main className="bg-white">
      <Navbar />

      {/* PAGE HEADER */}
      <section className="bg-black px-6 py-14 text-center text-white">
        <h1 className="text-4xl font-bold">
          About Us
        </h1>
      </section>

      {/* INTRO */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">

          <div className="grid gap-8 md:grid-cols-2">
            <h2 className="text-2xl font-bold leading-tight text-gray-900">
              Et nunc ut tempus duis nisl sed massa
            </h2>

            <p className="text-sm leading-6 text-gray-500">
              Find the right opportunities and connect with companies
              that value your skills. MeriJob helps talented people
              discover meaningful careers and build a better future.
            </p>
          </div>

          {/* IMAGE PLACEHOLDER */}
          <div className="mt-10 h-[320px] overflow-hidden rounded-xl bg-gradient-to-br from-gray-300 via-gray-400 to-gray-600">
            <div className="flex h-full items-center justify-center text-sm text-white/70">
              About Us Image
            </div>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white px-6 pb-20">
        <div className="mx-auto max-w-6xl">

          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              How it works
            </h2>

            <p className="mt-2 text-xs text-gray-500">
              Find your next opportunity in just a few simple steps.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-4">

            {[
              ["01", "Create Account", "Create your profile and tell us about yourself."],
              ["02", "Upload Resume", "Add your resume so employers can discover you."],
              ["03", "Find Jobs", "Discover opportunities that match your skills."],
              ["04", "Apply Job", "Apply to your favourite jobs with ease."],
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

      {/* VIDEO / COMPANY SECTION */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">

          <div className="relative h-[380px] overflow-hidden rounded-xl bg-gradient-to-br from-gray-500 via-gray-700 to-gray-900">

            <div className="absolute inset-0 bg-black/30" />

            <div className="relative flex h-full flex-col items-center justify-center text-center text-white">

              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-[#309689]">
                ▶
              </button>

              <h2 className="mt-6 text-2xl font-bold md:text-3xl">
                Good Life Begins With
                <br />
                A Good Company
              </h2>

            </div>
          </div>

        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">

          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>

            <p className="mt-2 text-xs text-gray-500">
              Find answers to some common questions.
            </p>
          </div>

          <div className="space-y-2">

            {[
              "Can I upload a CV?",
              "How long will the recruitment process take?",
              "Do you recruit for Graduates, Apprentices and Students?",
              "What does the recruitment and selection process involve?",
              "Can I receive notifications for any future jobs that may interest me?",
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

                <span className="text-[#309689]">
                  +
                </span>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* WORKING WITH BEST */}
      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2">

          <div className="grid h-[300px] grid-cols-2 gap-4">
            <div className="rounded-lg bg-gradient-to-br from-gray-400 to-gray-600" />
            <div className="rounded-lg bg-gradient-to-br from-gray-300 to-gray-500" />
            <div className="rounded-lg bg-gradient-to-br from-gray-500 to-gray-700" />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              We're Only Working
              <br />
              With The Best
            </h2>

            <p className="mt-4 text-sm leading-6 text-gray-500">
              We connect talented professionals with trusted companies
              and help create meaningful career opportunities.
            </p>

            <div className="mt-7 grid grid-cols-2 gap-4 text-xs text-gray-600">
              <span>✓ Quality Jobs</span>
              <span>✓ Resume Builder</span>
              <span>✓ Top Companies</span>
              <span>✓ Top Talents</span>
            </div>
          </div>

        </div>
      </section>

      {/* BLOG */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">

          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              News and Blog
            </h2>

            <p className="mt-2 text-xs text-gray-500">
              Latest career advice and useful job search information.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">

            {[
              "Revisiting Workplace Morale: Innovative Tactics For Boosting Employee Engagement",
              "How To Avoid The Top Six Most Common Job Interview Mistakes",
            ].map((title) => (
              <article key={title}>

                <div className="h-52 rounded-lg bg-gradient-to-br from-gray-300 via-gray-400 to-gray-600" />

                <p className="mt-4 text-[10px] text-gray-400">
                  30 March 2024
                </p>

                <h3 className="mt-2 text-sm font-semibold text-gray-900">
                  {title}
                </h3>

                <button className="mt-3 text-xs text-[#309689]">
                  Read more →
                </button>

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
