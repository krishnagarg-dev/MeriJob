import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import SearchBar from "../../components/SearchBar/SearchBar";
import jobs from "../../data/jobs";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import JobCard from "../../components/JobCard/JobCard";
import BlogCard from "../../components/BlogCard/BlogCard";
import Footer from "../../components/Footer/Footer";

function Homepage() {
    const navigate = useNavigate();
    const employerUrl = (import.meta.env.VITE_EMPLOYER_URL || "https://merijob-employer.vercel.app").replace(/\/$/, "");

    return (
        <main className="bg-black text-white">

            <Navbar />

            {/* HERO SECTION */}
            <section className="relative flex min-h-[720px] items-center justify-center px-6 pt-24">

                {/* Dark teal glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(48,150,137,0.10),_transparent_45%)]" />

                <div className="relative z-10 mx-auto w-full max-w-5xl text-center">

                    <h1 className="text-5xl font-bold tracking-tight md:text-6xl">
                        Find Your Dream Job Today!
                    </h1>

                    <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-400">
                        Connecting talented people with opportunities.
                        Your Gateway to Career Success.
                    </p>

                    <SearchBar />

                    {/* Stats */}
                    <div className="mt-12 flex justify-center gap-12">

                        <div>
                            <p className="text-xl font-bold">25,850</p>
                            <p className="mt-1 text-xs text-gray-400">
                                Jobs Available
                            </p>
                        </div>

                        <div>
                            <p className="text-xl font-bold">10,250</p>
                            <p className="mt-1 text-xs text-gray-400">
                                Companies
                            </p>
                        </div>

                        <div>
                            <p className="text-xl font-bold">13,400</p>
                            <p className="mt-1 text-xs text-gray-400">
                                Job Seekers
                            </p>
                        </div>

                    </div>
                </div>
            </section>

                        {/* SEEKER / HIRER OPTIONS */}
            <section className="bg-black px-6 pb-20">
                <div className="mx-auto max-w-5xl">

                    <div className="mb-10 text-center">
                        <p className="text-sm font-medium text-[#309689]">
                            What are you looking for?
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
                            Find Opportunities or Hire Talent
                        </h2>

                        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-400">
                            Whether you're looking for your next career opportunity
                            or searching for the right person for your team, MeriJob
                            connects you with what you need.
                        </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">

                        {/* JOB SEEKER */}
                        <button
                            type="button"
                            onClick={() => navigate("/jobs")}
                            className="group text-left rounded-2xl border border-gray-800 bg-[#0d0d0d] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#309689] hover:shadow-[0_15px_40px_rgba(48,150,137,0.12)]"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#309689]/10 text-2xl">
                                    👨‍💻
                                </div>

                                <span className="text-xl text-gray-600 transition group-hover:translate-x-1 group-hover:text-[#309689]">
                                    →
                                </span>
                            </div>

                            <h3 className="mt-6 text-xl font-bold text-white">
                                I Need a Job
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-gray-400">
                                Discover jobs that match your skills, experience,
                                and career goals. Search opportunities and apply
                                directly through MeriJob.
                            </p>

                            <span className="mt-6 inline-flex items-center text-sm font-semibold text-[#309689]">
                                Find Jobs
                                <span className="ml-2 transition group-hover:translate-x-1">
                                    →
                                </span>
                            </span>
                        </button>

                        {/* HIRER */}
                        <button
                            type="button"
                            onClick={() => { window.location.href = `${employerUrl}/`; }}
                            className="group text-left rounded-2xl border border-gray-800 bg-[#0d0d0d] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#309689] hover:shadow-[0_15px_40px_rgba(48,150,137,0.12)]"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#309689]/10 text-2xl">
                                    🏢
                                </div>

                                <span className="text-xl text-gray-600 transition group-hover:translate-x-1 group-hover:text-[#309689]">
                                    →
                                </span>
                            </div>

                            <h3 className="mt-6 text-xl font-bold text-white">
                                I Need to Hire
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-gray-400">
                                Find skilled candidates, post your hiring
                                opportunities, and build your team through
                                MeriJob.
                            </p>

                            <span className="mt-6 inline-flex items-center text-sm font-semibold text-[#309689]">
                                Hire Talent
                                <span className="ml-2 transition group-hover:translate-x-1">
                                    →
                                </span>
                            </span>
                        </button>

                    </div>
                </div>
            </section>

            {/* COMPANY LOGOS */}
            <section className="border-t border-gray-800 bg-black px-6 py-7">
                <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-12 md:justify-between">

                    <span className="text-lg font-bold">Spotify</span>
                    <span className="text-lg font-bold">slack</span>
                    <span className="text-lg font-bold">Adobe</span>
                    <span className="text-lg font-bold">asana</span>
                    <span className="text-lg font-bold">Linear</span>

                </div>
            </section>

            {/* RECENT JOBS */}
            <section className="bg-white px-6 py-20 text-gray-900">

                <div className="mx-auto max-w-6xl">

                    {/* Section Heading */}
                    <div className="mb-10 flex items-end justify-between">

                        <div>
                            <p className="mb-2 text-sm font-medium text-[#309689]">
                                Explore Opportunities
                            </p>

                            <h2 className="text-3xl font-bold md:text-4xl">
                                Recent Jobs Available
                            </h2>
                        </div>

                        <button className="hidden text-sm font-medium text-[#309689] md:block">
                            View All Jobs →
                        </button>

                    </div>

                    {/* Job Cards */}
                    <div className="grid gap-5 md:grid-cols-2">

                        {jobs.map((job) => (
                            <JobCard key={job.id} job={job} />
                        ))}

                    </div>

                    {/* Mobile View All */}
                    <div className="mt-8 text-center md:hidden">
                        <button className="text-sm font-medium text-[#309689]">
                            View All Jobs →
                        </button>
                    </div>

                </div>
            </section>

            {/* BROWSE BY CATEGORY */}
            <section className="bg-[#ebf5f4] px-6 py-20">
                <div className="mx-auto max-w-6xl">

                    {/* Heading */}
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                            Browse by Category
                        </h2>

                        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500">
                            Explore opportunities across different industries and find
                            the perfect job for your career.
                        </p>
                    </div>

                    {/* Categories */}
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

                        <CategoryCard
                            icon="🌱"
                            name="Agriculture"
                            jobs="1254"
                        />

                        <CategoryCard
                            icon="⚙️"
                            name="Metal Production"
                            jobs="1165"
                        />

                        <CategoryCard
                            icon="🛍️"
                            name="Commerce"
                            jobs="2082"
                        />

                        <CategoryCard
                            icon="🏗️"
                            name="Construction"
                            jobs="1620"
                        />

                        <CategoryCard
                            icon="🏨"
                            name="Hospitality & Tourism"
                            jobs="1022"
                        />

                        <CategoryCard
                            icon="🎓"
                            name="Education"
                            jobs="1466"
                        />

                        <CategoryCard
                            icon="💰"
                            name="Financial Services"
                            jobs="1529"
                        />

                        <CategoryCard
                            icon="🚚"
                            name="Transport"
                            jobs="1344"
                        />

                    </div>

                </div>
            </section>

            {/* GOOD LIFE BEGINS WITH A GOOD COMPANY */}
            <section className="bg-white px-6 py-20">
                <div className="mx-auto max-w-6xl">

                    <div className="grid items-center gap-12 md:grid-cols-2">

                        {/* Image Placeholder */}
                        <div className="h-[360px] overflow-hidden rounded-xl bg-gradient-to-br from-gray-300 via-gray-400 to-gray-600">
                            <div className="flex h-full items-center justify-center bg-black/10">
                                <span className="text-sm text-white/70">
                                    Company Image
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div>
                            <p className="mb-3 text-sm font-medium text-[#309689]">
                                Find Your Opportunity
                            </p>

                            <h2 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
                                Good Life Begins With
                                <br />
                                A Good Company
                            </h2>

                            <p className="mt-5 text-sm leading-7 text-gray-500">
                                Discover great companies and exciting opportunities that
                                help you build a successful career. Find a workplace where
                                your skills are valued and your career can grow.
                            </p>

                            <button className="mt-7 rounded-md bg-[#309689] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#267d73]">
                                Search Job
                            </button>

                            {/* Stats */}
                            <div className="mt-10 grid grid-cols-3 gap-5">

                                <div>
                                    <h3 className="text-2xl font-bold text-[#309689]">
                                        12K+
                                    </h3>
                                    <p className="mt-1 text-xs text-gray-500">
                                        Clients worldwide
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold text-[#309689]">
                                        20K+
                                    </h3>
                                    <p className="mt-1 text-xs text-gray-500">
                                        Active resumes
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold text-[#309689]">
                                        18K+
                                    </h3>
                                    <p className="mt-1 text-xs text-gray-500">
                                        Companies
                                    </p>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>
            </section>

            {/* CTA */}
            <section className="bg-white px-6 pb-20">
                <div className="mx-auto max-w-6xl">

                    <div className="relative overflow-hidden rounded-xl bg-black px-8 py-14 text-center md:px-16">

                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold text-white md:text-4xl">
                                Create A Better
                                <br />
                                Future For Yourself
                            </h2>

                            <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-gray-400">
                                Take the next step in your career and discover
                                opportunities that match your goals.
                            </p>

                            <button className="mt-7 rounded-md bg-[#309689] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#267d73]">
                                Search Job
                            </button>
                        </div>

                    </div>

                </div>
            </section>

            {/* NEWS AND BLOG */}
            <section className="bg-white px-6 py-20">
                <div className="mx-auto max-w-6xl">

                    <div className="mb-12 flex items-end justify-between">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                                News and Blog
                            </h2>

                            <p className="mt-3 text-sm text-gray-500">
                                Read the latest news, career advice and useful job search tips.
                            </p>
                        </div>

                        <button className="hidden text-sm font-medium text-[#309689] md:block">
                            View all →
                        </button>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">

                        <BlogCard
                            date="30 March 2024"
                            title="Revisiting Workplace Morale: Innovative Tactics For Boosting Employee Engagement"
                        />

                        <BlogCard
                            date="26 March 2024"
                            title="How To Avoid The Top Six Most Common Job Interview Mistakes"
                        />

                    </div>

                </div>
            </section>

            <Footer />


        </main>
    );
}

export default Homepage;




