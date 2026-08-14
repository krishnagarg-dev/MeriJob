import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function ContactUs() {
  return (
    <main className="bg-white">
      <Navbar />

      {/* HEADER */}
      <section className="bg-black px-6 py-16 text-center text-white">
        <h1 className="text-4xl font-bold">
          Contact Us
        </h1>

        <p className="mx-auto mt-3 max-w-xl text-sm text-gray-400">
          Have a question? We'd love to hear from you.
          Get in touch with the MeriJob team.
        </p>
      </section>

      {/* CONTACT CONTENT */}
      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">

          {/* LEFT */}
          <div>
            <p className="text-sm font-medium text-[#309689]">
              Get In Touch
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              We're here to help
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-7 text-gray-500">
              Whether you have a question about jobs, applications,
              your account, or anything else, our team is ready to
              help you.
            </p>

            {/* Contact info */}
            <div className="mt-10 space-y-6">

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#ebf5f4] text-[#309689]">
                  âœ‰
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    Email
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    support@MeriJob.com
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#ebf5f4] text-[#309689]">
                  â˜Ž
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    Phone
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    +91 98765 43210
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#ebf5f4] text-[#309689]">
                  ðŸ“
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    Location
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    New Delhi, India
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* FORM */}
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">

            <h3 className="text-xl font-bold text-gray-900">
              Send us a message
            </h3>

            <p className="mt-2 text-xs text-gray-500">
              Fill out the form and we'll get back to you soon.
            </p>

            <form className="mt-7 space-y-5">

              <div>
                <label className="mb-2 block text-xs font-medium text-gray-700">
                  Your Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#309689]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-gray-700">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#309689]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-gray-700">
                  Subject
                </label>

                <input
                  type="text"
                  placeholder="What is this regarding?"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#309689]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-gray-700">
                  Message
                </label>

                <textarea
                  rows="5"
                  placeholder="Write your message..."
                  className="w-full resize-none rounded-md border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#309689]"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-[#309689] py-3 text-sm font-medium text-white transition hover:bg-[#267d73]"
              >
                Send Message
              </button>

            </form>
          </div>

        </div>
      </section>

      {/* MAP / LOCATION PLACEHOLDER */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">

          <div className="flex h-64 items-center justify-center rounded-xl bg-[#ebf5f4]">
            <div className="text-center">
              <div className="text-3xl">ðŸ“</div>

              <p className="mt-3 text-sm font-semibold text-gray-800">
                New Delhi, India
              </p>

              <p className="mt-1 text-xs text-gray-500">
                MeriJob Headquarters
              </p>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}

export default ContactUs;




