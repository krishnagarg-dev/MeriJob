import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function Applications() {
  const applications = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Adobe",
      location: "Noida, India",
      date: "10 Aug 2026",
      status: "Interview",
    },
    {
      id: 2,
      title: "Software Engineer",
      company: "Google",
      location: "Bangalore, India",
      date: "08 Aug 2026",
      status: "Applied",
    },
    {
      id: 3,
      title: "Product Manager",
      company: "Microsoft",
      location: "Hyderabad, India",
      date: "05 Aug 2026",
      status: "Offer",
    },
    {
      id: 4,
      title: "UX Designer",
      company: "Amazon",
      location: "Bangalore, India",
      date: "02 Aug 2026",
      status: "Rejected",
    },
  ];

  const statusStyles = {
    Applied: "bg-blue-50 text-blue-600",
    Interview: "bg-yellow-50 text-yellow-600",
    Offer: "bg-green-50 text-green-600",
    Rejected: "bg-red-50 text-red-600",
  };

  return (
    <main className="bg-[#f8faf9]">
      <Navbar />

      {/* HEADER */}
      <section className="bg-black px-6 py-14 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm text-gray-400">
            Track your progress
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            My Applications
          </h1>
        </div>
      </section>

      {/* CONTENT */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">

          {/* TOP */}
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                All Applications
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Keep track of every job you've applied for.
              </p>
            </div>

            <select className="w-fit rounded-md border border-gray-200 bg-white px-4 py-2 text-xs text-gray-600 outline-none">
              <option>All Status</option>
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>
          </div>

          {/* APPLICATIONS */}
          <div className="space-y-4">
            {applications.map((application) => (
              <div
                key={application.id}
                className="rounded-lg border border-gray-200 bg-white p-5"
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                  {/* Job */}
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">
                      {application.title}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {application.company}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-400">
                      <span>
                        📍 {application.location}
                      </span>

                      <span>
                        Applied on {application.date}
                      </span>
                    </div>
                  </div>

                  {/* Status + Action */}
                  <div className="flex items-center gap-4">

                    <span
                      className={`rounded-full px-3 py-1 text-[10px] font-medium ${
                        statusStyles[application.status]
                      }`}
                    >
                      {application.status}
                    </span>

                    <button className="rounded-md border border-gray-200 px-4 py-2 text-xs text-gray-600 hover:border-[#309689] hover:text-[#309689]">
                      View Details
                    </button>

                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* EMPTY / INFO */}
          <div className="mt-8 rounded-lg bg-[#ebf5f4] p-6 text-center">
            <p className="text-sm font-semibold text-gray-900">
              Looking for more opportunities?
            </p>

            <p className="mt-2 text-xs text-gray-500">
              Explore new jobs and start building your career.
            </p>

            <button className="mt-4 rounded-md bg-[#309689] px-5 py-2.5 text-xs font-medium text-white">
              Find Jobs
            </button>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}

export default Applications;
