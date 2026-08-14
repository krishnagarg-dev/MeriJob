function Footer() {
  return (
    <footer className="bg-black px-6 py-14 text-white">
      <div className="mx-auto max-w-6xl">

        <div className="grid gap-10 md:grid-cols-4">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#309689]">
                ðŸ’¼
              </div>

              <span className="text-lg font-semibold">
                MeriJob
              </span>
            </div>

            <p className="mt-5 max-w-xs text-sm leading-6 text-gray-400">
              Find your dream job and connect with the right
              opportunities to build a successful career.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-5 text-sm font-semibold">
              Company
            </h3>

            <div className="space-y-3 text-sm text-gray-400">
              <p>About Us</p>
              <p>Our Team</p>
              <p>Careers</p>
              <p>Contact Us</p>
            </div>
          </div>

          {/* Job Categories */}
          <div>
            <h3 className="mb-5 text-sm font-semibold">
              Job Categories
            </h3>

            <div className="space-y-3 text-sm text-gray-400">
              <p>Technology</p>
              <p>Healthcare</p>
              <p>Finance</p>
              <p>Marketing</p>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-5 text-sm font-semibold">
              Newsletter
            </h3>

            <p className="mb-4 text-sm leading-6 text-gray-400">
              Subscribe to our newsletter for the latest job
              opportunities and career updates.
            </p>

            <div className="flex overflow-hidden rounded-md border border-gray-700">
              <input
                type="email"
                placeholder="Your email address"
                className="min-w-0 flex-1 bg-transparent px-3 py-3 text-xs text-white outline-none placeholder:text-gray-500"
              />

              <button className="bg-[#309689] px-4 text-xs font-medium text-white">
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-gray-800 pt-6 text-xs text-gray-500 md:flex-row">
          <p>
            Â© 2026 MeriJob. All rights reserved.
          </p>

          <div className="flex gap-5">
            <span>Privacy Policy</span>
            <span>Terms & Conditions</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;




