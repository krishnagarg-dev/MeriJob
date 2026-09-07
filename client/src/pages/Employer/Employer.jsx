import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function Employer() {
    const navigate = useNavigate();

    return (
        <main className="min-h-screen bg-black text-white">
            <Navbar />

            {/* HERO */}
            <section className="relative overflow-hidden px-6 py-24 md:py-32">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(48,150,137,0.12),_transparent_50%)]" />

                <div className="relative mx-auto max-w-5xl text-center">

                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#309689]/10 text-3xl">
                        🏢
                    </div>

                    <p className="mt-6 text-sm font-medium text-[#309689]">
                        For Employers
                    </p>

                    <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">
                        Hire the Right Talent
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-400 md:text-base">
                        Post your jobs, discover talented candidates, and build
                        your team with MeriJob.
                    </p>

                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

                        <button
                            onClick={() => navigate("/register")}
                            className="rounded-md bg-[#309689] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#267d73]"
                        >
                            Start Hiring
                        </button>

                        <button
                            onClick={() => navigate("/login")}
                            className="rounded-md border border-gray-700 px-7 py-3 text-sm font-semibold text-white transition hover:border-[#309689]"
                        >
                            Employer Login
                        </button>

                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <section className="bg-white px-6 py-20 text-gray-900">
                <div className="mx-auto max-w-6xl">

                    <div className="mb-12 text-center">
                        <p className="text-sm font-medium text-[#309689]">
                            Everything You Need
                        </p>

                        <h2 className="mt-2 text-3xl font-bold md:text-4xl">
                            A Better Way to Hire
                        </h2>

                        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500">
                            Manage your hiring process from one simple platform.
                        </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-3">

                        <div className="rounded-2xl border border-gray-200 p-7">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#309689]/10 text-2xl">
                                📢
                            </div>

                            <h3 className="mt-5 text-lg font-bold">
                                Post Jobs
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-gray-500">
                                Create detailed job opportunities and reach
                                candidates actively looking for their next role.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-gray-200 p-7">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#309689]/10 text-2xl">
                                👥
                            </div>

                            <h3 className="mt-5 text-lg font-bold">
                                Find Candidates
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-gray-500">
                                Review applications and discover candidates
                                who match your hiring requirements.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-gray-200 p-7">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#309689]/10 text-2xl">
                                📊
                            </div>

                            <h3 className="mt-5 text-lg font-bold">
                                Manage Hiring
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-gray-500">
                                Keep your jobs and applications organized
                                throughout the hiring process.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="bg-[#ebf5f4] px-6 py-20 text-gray-900">
                <div className="mx-auto max-w-5xl">

                    <div className="mb-12 text-center">
                        <p className="text-sm font-medium text-[#309689]">
                            Simple Process
                        </p>

                        <h2 className="mt-2 text-3xl font-bold md:text-4xl">
                            Start Hiring in 3 Steps
                        </h2>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">

                        <div className="text-center">
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#309689] font-bold text-white">
                                1
                            </div>

                            <h3 className="mt-5 font-bold">
                                Create Your Company
                            </h3>

                            <p className="mt-2 text-sm text-gray-500">
                                Set up your company profile and tell candidates
                                about your organization.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#309689] font-bold text-white">
                                2
                            </div>

                            <h3 className="mt-5 font-bold">
                                Post a Job
                            </h3>

                            <p className="mt-2 text-sm text-gray-500">
                                Publish your hiring opportunity with all the
                                details candidates need.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#309689] font-bold text-white">
                                3
                            </div>

                            <h3 className="mt-5 font-bold">
                                Hire Talent
                            </h3>

                            <p className="mt-2 text-sm text-gray-500">
                                Review applications, shortlist candidates,
                                and find the right person for your team.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-white px-6 py-20">
                <div className="mx-auto max-w-5xl rounded-2xl bg-black px-8 py-14 text-center">

                    <h2 className="text-3xl font-bold text-white md:text-4xl">
                        Ready to Start Hiring?
                    </h2>

                    <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-400">
                        Create your employer account and start building
                        your team with MeriJob.
                    </p>

                    <button
                        onClick={() => navigate("/register")}
                        className="mt-7 rounded-md bg-[#309689] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#267d73]"
                    >
                        Create Employer Account
                    </button>

                </div>
            </section>

            <Footer />
        </main>
    );
}

export default Employer;