import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function SavedJobs() {
  const savedJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Adobe",
      location: "Noida, India",
      type: "Full Time",
      salary: "₹8L - ₹14L",
    },
    {
      id: 2,
      title: "Software Engineer",
      company: "Google",
      location: "Bangalore, India",
      type: "Full Time",
      salary: "₹15L - ₹25L",
    },
    {
      id: 3,
      title: "Product Manager",
      company: "Microsoft",
      location: "Hyderabad, India",
      type: "Full Time",
      salary: "₹14L - ₹22L",
    },
  ];

  return (
    <main className="bg-[#f8faf9]">
      <Navbar />

      {/* HEADER */}
      <section className="bg-black px-6 py-14 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm text-gray-400">
            Your favourite opportunities
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Saved Jobs
          </h1>
        </div>
      </section>

      {/* CONTENT */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">

          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Your Saved Jobs
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Jobs you've saved for later.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {savedJobs.map((job) => (
              <div
                key={job.id}
                className="rounded-lg border border-gray-200 bg-white p-6"
              >

                {/* Top */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">
                      {job.title}
                    </h3>

                    <p className="mt-2 text-sm text-gray-500">
                      {job.company}
                    </p>
                  </div>

                  <button className="text-xl text-[#309689]">
                    ♥
                  </button>
                </div>

                {/* Details */}
                <div className="mt-5 space-y-2 text-xs text-gray-500">
                  <p>📍 {job.location}</p>
                  <p>💼 {job.type}</p>
                  <p>💰 {job.salary}</p>
                </div>

                {/* Actions */}
                <div className="mt-6 flex gap-3">
                  <button className="flex-1 rounded-md bg-[#309689] py-2.5 text-xs font-medium text-white">
                    View Job
                  </button>

                  <button className="rounded-md border border-gray-200 px-4 py-2.5 text-xs text-gray-500">
                    Remove
                  </button>
                </div>

              </div>
            ))}

          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}

export default SavedJobs;
