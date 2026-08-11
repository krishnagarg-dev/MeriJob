import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import StatCard from "../../components/StatCard/StatCard";
import ApplicationCard from "../../components/ApplicationCard/ApplicationCard";

function Dashboard() {
  return (
    <main className="bg-[#f8faf9]">

      <Navbar />

      {/* HEADER */}
      <section className="bg-black px-6 py-12 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm text-gray-400">
            Welcome back!
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Your Dashboard
          </h1>
        </div>
      </section>

      {/* CONTENT */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">

          {/* STATS */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <StatCard
              title="Total Applications"
              value="24"
              label="+4 this month"
            />

            <StatCard
              title="Applications Sent"
              value="16"
              label="Active applications"
            />

            <StatCard
              title="Interviews"
              value="5"
              label="Upcoming interviews"
            />

            <StatCard
              title="Offers"
              value="3"
              label="Offers received"
            />

          </div>

          {/* MAIN GRID */}
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_300px]">

            {/* APPLICATIONS */}
            <div>

              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Recent Applications
                  </h2>

                  <p className="mt-1 text-xs text-gray-500">
                    Track your latest job applications.
                  </p>
                </div>

                <button className="text-xs font-medium text-[#309689]">
                  View All →
                </button>
              </div>

              <div className="space-y-4">

                <ApplicationCard
                  title="Frontend Developer"
                  company="Adobe"
                  date="10 Aug 2026"
                  status="Interview"
                />

                <ApplicationCard
                  title="Software Engineer"
                  company="Google"
                  date="08 Aug 2026"
                  status="Applied"
                />

                <ApplicationCard
                  title="Product Manager"
                  company="Microsoft"
                  date="05 Aug 2026"
                  status="Offer"
                />

                <ApplicationCard
                  title="UX Designer"
                  company="Amazon"
                  date="02 Aug 2026"
                  status="Rejected"
                />

              </div>

            </div>

            {/* QUICK ACTIONS */}
            <aside>

              <div className="rounded-lg border border-gray-200 bg-white p-6">

                <h2 className="text-base font-bold text-gray-900">
                  Quick Actions
                </h2>

                <div className="mt-5 space-y-3">

                  <button className="w-full rounded-md bg-[#309689] px-4 py-3 text-xs font-medium text-white">
                    Find New Jobs
                  </button>

                  <button className="w-full rounded-md border border-gray-200 px-4 py-3 text-xs font-medium text-gray-700">
                    View Saved Jobs
                  </button>

                  <button className="w-full rounded-md border border-gray-200 px-4 py-3 text-xs font-medium text-gray-700">
                    Update Profile
                  </button>

                </div>

              </div>

              {/* TIP */}
              <div className="mt-5 rounded-lg bg-[#ebf5f4] p-6">

                <p className="text-xs font-medium text-[#309689]">
                  Career Tip
                </p>

                <p className="mt-2 text-sm font-semibold text-gray-900">
                  Keep your resume updated
                </p>

                <p className="mt-2 text-xs leading-5 text-gray-500">
                  An updated resume can help you stand out to
                  recruiters and increase your chances of getting
                  interviews.
                </p>

              </div>

            </aside>

          </div>

        </div>
      </section>

      <Footer />

    </main>
  );
}

export default Dashboard;
